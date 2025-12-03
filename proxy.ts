import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
    const session = await getToken({req, secret: process.env.NEXTAUTH_SECRET});
    
    const protectedRoute = "/dashboard";
    const getstarted = "/getstarted";

    if (req.nextUrl.pathname === getstarted && session) 
        return NextResponse.redirect(new URL(protectedRoute, req.url));

    if (req.nextUrl.pathname.startsWith(protectedRoute) && !session)
        return NextResponse.redirect(new URL(getstarted, req.url));

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard", "/getstarted", "/"],
}