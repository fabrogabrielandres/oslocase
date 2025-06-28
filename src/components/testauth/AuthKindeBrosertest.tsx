"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function AuthKindeBrosertest() {
  const { user, isLoading } = useKindeBrowserClient();

  // Resto de tu código...
  if (isLoading) return <div>Loading...</div>;
  return <div>{user ? JSON.stringify(user) : "No user logged in"}</div>;
}
