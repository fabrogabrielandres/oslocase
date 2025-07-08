import { Suspense } from "react";
import ThankYou from "./ThankYou";
import { AuthTest } from "@/components/testauth/AuthTest";
import AuthKindeBrosertest from "@/components/testauth/AuthKindeBrosertest";

const Page = ({ searchParams }: { searchParams: { session_id: string } }) => {
  console.log(searchParams);
  
  return (
    <Suspense>
      <AuthTest></AuthTest>
      <AuthKindeBrosertest></AuthKindeBrosertest>
      <div>{JSON.stringify(searchParams)}</div>
      <ThankYou />
    </Suspense>
  );
};

export default Page;
