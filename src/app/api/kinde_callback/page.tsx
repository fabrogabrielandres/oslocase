"use client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getAuthStatus } from "./actions";
import { Loader2 } from "lucide-react";
import { locales } from "@/i18n/config";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/navigation";

const Page = () => {
  const [configId, setConfigId] = useState<string | null>(null);
  const [locale, setLocale] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const language = localStorage.getItem("locale") as (typeof locales)[number];
    const isvalidLanguage = locales.includes(language);
    setLocale(isvalidLanguage ? language : locales[0]);

    const configurationId = localStorage.getItem("configurationId");
    if (configurationId) setConfigId(configurationId);
  }, []);

  const { data } = useQuery({
    queryKey: ["auth-callback"],
    queryFn: async () => await getAuthStatus(),
    retry: true,
    retryDelay: 500,
  });

  useEffect(() => {
    if (data?.success) {

      if (configId) {
        localStorage.removeItem("configurationId");
        router.push(`/configure/preview?id=${configId}`);
      } else {
        router.push(`/`);
      }
    }
  }, [data, configId, locale, router]);

  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
        <h3 className="font-semibold text-xl">Logging you in...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
};

export default Page;
