"use server";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";

async function getUser() {
  const session = await getServerSession(authOptions);
  if (session) return session;
  return null;
}

export { getUser };
