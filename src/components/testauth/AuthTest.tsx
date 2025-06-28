"use client";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";

export function AuthTest() {
  const { user, isLoading } = useKindeAuth();

  if (isLoading) return <div>Loading...</div>;

  return <div>User: {JSON.stringify(user)}</div>;
}
