"use client";
import { UserKindeAuth } from "@/app/[locale]/(locale)/configure/interfaceUser";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect, useState } from "react";

export function AuthTest() {
  const { user: initialUser, isLoading } = useKindeAuth();
  const [user, setUser] = useState<UserKindeAuth | null>(null);

  useEffect(() => {
    // Esto asegura que solo se ejecute en el cliente
    setUser(initialUser);
  }, [initialUser]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>{user ? `AuthTest : ${JSON.stringify(user)}` : "No user logged in AuthTest"}</div>
  );
}
