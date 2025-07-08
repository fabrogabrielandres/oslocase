import { Suspense } from "react";
import ThankYou from "./ThankYou";
import { AuthTest } from "@/components/testauth/AuthTest";
import AuthKindeBrosertest from "@/components/testauth/AuthKindeBrosertest";

const Page = () => {
  
  return (
    <Suspense>
      <AuthTest></AuthTest>
      <AuthKindeBrosertest></AuthKindeBrosertest>
      <ThankYou />
    </Suspense>
  );
};

export default Page;
