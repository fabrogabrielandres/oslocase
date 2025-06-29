import { MaxWidthWrapper } from "@/components/MaxWidthWrapper/MaxWidthWrapper";
import Steps from "@/components/Steps/Steps";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import { KindeUser } from "@kinde-oss/kinde-auth-nextjs";
// import { AuthProvider } from "@/components";
import AuthKindeBrosertest from "@/components/testauth/AuthKindeBrosertest";
import { AuthTest } from "@/components/testauth/AuthTest";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  // const { getUser } = getKindeServerSession();
  // const user: KindeUser<Record<string, unknown>> | null = await getUser();
  return (
    <MaxWidthWrapper className="flex-1 flex flex-col">
      <Steps />
            LyConfigure:<AuthTest></AuthTest>
            LyConfigure:<AuthKindeBrosertest></AuthKindeBrosertest>
      {children}
    </MaxWidthWrapper>
  );
};

export default Layout;

// export default async function Layout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { getUser } = getKindeServerSession();
  
//   const user: KindeUser<Record<string, unknown>> | null = await getUser();
//   return (
//     <AuthProvider>
//       <MaxWidthWrapper className="flex-1 flex flex-col">
//         <div>
//           layout-- {user ? JSON.stringify(user) : "No user logged in layout"}
//         </div>
//         ;
//         ****
//         <AuthKindeBrosertest />
//         ***
//         <AuthTest/>
//         <Steps />
//         {children}
//       </MaxWidthWrapper>
//     </AuthProvider>
//   );
// }
