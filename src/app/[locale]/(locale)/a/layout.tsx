import AuthKindeBrosertest from "@/components/testauth/AuthKindeBrosertest";
import { AuthTest } from "@/components/testauth/AuthTest";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <>
        Layoutttttt A:<AuthTest></AuthTest>
        Layoutttttt A:<AuthKindeBrosertest></AuthKindeBrosertest>
      </>
      {children}
    </>
  );
}
