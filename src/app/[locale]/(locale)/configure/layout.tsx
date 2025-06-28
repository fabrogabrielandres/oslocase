import { MaxWidthWrapper } from "@/components/MaxWidthWrapper/MaxWidthWrapper";
import Steps from "@/components/Steps/Steps";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs";

// const Layout = ({ children }: { children: ReactNode }) => {
//   const { getUser } = getKindeServerSession();
//   const user: KindeUser<Record<string, unknown>> | null = await getUser();
//   return (
//     <MaxWidthWrapper className="flex-1 flex flex-col">
//       <Steps />
//       {children}
//     </MaxWidthWrapper>
//   );
// };

// export default Layout;

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getUser } = getKindeServerSession();
  const user: KindeUser<Record<string, unknown>> | null = await getUser();
  return (
    <MaxWidthWrapper className="flex-1 flex flex-col">
      <div>layout-- {user ? JSON.stringify(user) : "No user logged in layout"}</div>;

      <Steps />
      {children}
    </MaxWidthWrapper>
  );
}
