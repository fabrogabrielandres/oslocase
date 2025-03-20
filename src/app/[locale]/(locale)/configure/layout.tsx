import { MaxWidthWrapper } from "@/components/MaxWidthWrapper/MaxWidthWrapper";
import Steps from "@/components/Steps/Steps";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <MaxWidthWrapper className="flex-1 flex flex-col">
      <Steps/>
      {children}
    </MaxWidthWrapper>
  );
};

export default Layout;
