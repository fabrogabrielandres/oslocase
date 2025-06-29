"use client";
import { useEffect, useState } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { UserKindeAuth } from "@/app/[locale]/(locale)/configure/interfaceUser";

export default function AuthKindeBrosertest() {
  const { user: initialUser, isLoading } = useKindeBrowserClient();
  const [user, setUser] = useState<UserKindeAuth | null>(null);

  useEffect(() => {
    // Esto asegura que solo se ejecute en el cliente
    setUser(initialUser);
  }, [initialUser]);

  if (isLoading) return <div>Loading...</div>;
  return <div>{user ? `AuthKindeBrosertest : ${JSON.stringify(user)}` : "No user logged in AuthKindeBrosertest"}</div>;
}
