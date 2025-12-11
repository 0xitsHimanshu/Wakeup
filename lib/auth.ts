import axios from "axios";
import { SessionStrategy } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const debugLog = (message: string, data?: any) => {
  if (process.env.NODE_ENV === "development") {
    console.log(`[NextAuth][Debug] ${message}`, data || "");
  }
}

export const authOptions = {
  debug: true,
  logger: {
    error: (code, metadata)=>{
      console.error(`[NextAuth][Error] ${code}`, metadata);
    }
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      httpOptions: { timeout: 40000 },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "secret",
  session: { strategy: "jwt" as SessionStrategy },

  callbacks: {
    async jwt({ token, account, user }: any) {
      debugLog("JWT Callback triggered", { 
        hasAccount: !!account, 
        hasUser: !!user,
        hasToken: !!token 
      });

      if (account?.access_token) {
        debugLog("Account access token found", { 
          provider: account.provider,
          tokenLength: account.access_token.length 
        });
        
        token.accessToken = account.access_token;

        try {
          const backendUrl = process.env.BACKEND_URL;
          debugLog("Attempting backend authentication", { 
            backendUrl,
            endpoint: `${backendUrl}/auth/google` 
          });

          const response = await axios.get(
            `${backendUrl}/auth/google`,
            {
              headers: {
                Authorization: `Bearer ${account.access_token}`,
              },
            }
          );

          debugLog("Backend response received", { 
            status: response.status,
            hasToken: !!response.data?.token,
            dataKeys: Object.keys(response.data || {})
          });

          token.signedToken = response.data.token;
          debugLog("Signed token stored successfully");
        } catch (error: any) {
          console.error("[NextAuth][Error] Backend authentication failed:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            backendUrl: process.env.BACKEND_URL
          });
        }
      } else {
        debugLog("No access token in account - likely a session refresh");
      }
      
      debugLog("Returning token", { 
        hasAccessToken: !!token.accessToken,
        hasSignedToken: !!token.signedToken 
      });
      return token;
    },
    async session({ session, token }: any) {
      debugLog("Session Callback triggered", { 
        hasSession: !!session,
        hasToken: !!token 
      });

      if (token?.signedToken) {
        session.signedToken = token.signedToken;
        debugLog("Signed token added to session");
      }
      
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
        debugLog("Access token added to session");
      }

      debugLog("Session finalized", { 
        hasSignedToken: !!session.signedToken,
        hasAccessToken: !!session.accessToken,
        userEmail: session.user?.email 
      });
      
      return session;
    },
  },
};
