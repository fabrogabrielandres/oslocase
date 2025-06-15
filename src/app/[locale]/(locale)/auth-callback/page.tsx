"use client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getAuthStatus } from "./actions";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { locales } from "@/i18n/routing";

const Page = () => {
  const [configId, setConfigId] = useState<string | null>(null);
  const [locale, setLocale] = useState<string | null>(null);

  useEffect(() => {
    const language = localStorage.getItem("locale") as (typeof locales)[number];
    const isvalidLanguage = locales.includes(language);

    if (isvalidLanguage == false) {
      setLocale(locales[0]); // Default to the first locale if the stored one is invalid
    } else {
      setLocale(language);
      console.log("estoy en el else",language);
    }
  }, []);

  useEffect(() => {
    const configurationId = localStorage.getItem("configurationId");
    if (configurationId) setConfigId(configurationId);
  }, []);
  

  const { data } = useQuery({
    queryKey: ["auth-callback"],
    queryFn: async () => await getAuthStatus(),
    retry: true,
    retryDelay: 500,
  });

  if (typeof window !== "undefined" && data?.success) {
    if (configId) {
      localStorage.removeItem("configurationId");
      return redirect(`/${locale}/configure/preview?id=${configId}`);
    }
    return redirect(`/${locale}`);
  }

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
