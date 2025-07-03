import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function LogoutPage() {
  // Elimina las cookies de sesión
  (await cookies()).delete("kinde_session");
  (await cookies()).delete("access_token");
  (await cookies()).delete("id_token");

  // Redirige a la página principal
  redirect("/api/auth/logout");
}
