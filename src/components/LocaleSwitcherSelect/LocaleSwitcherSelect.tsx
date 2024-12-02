"use client";

import clsx from "clsx";
import { useParams } from "next/navigation";
import {
  ChangeEvent,
  //  ReactNode,
  useTransition,
} from "react";
import { Locale, usePathname, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";

type U = ["en", "es", "no"];

type Props = {
  // children: ReactNode;
  defaultValue: string;
  label: string;
  routing: U;
};

export const LocaleSwitcherSelect = ({
  // children,
  defaultValue,
  label,
  routing,
}: Props) => {
  const t = useTranslations("LocaleSwitcher");
  const a = t("locale", { locale: "en" });
  const b = t("locale", { locale: "es" });
  const c = t("locale", { locale: "no" });
  console.log("en:===>", b);
  console.log("es:===>", a);
  console.log("no:===>", c);

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }

  return (
    <label
      className={clsx(
        "relative text-gray-400",
        isPending && "transition-opacity [&:disabled]:opacity-30"
      )}
    >
      <p className="sr-only">{label}</p>

      <select
        className="inline-flex appearance-none bg-transparent py-3 pl-2 pr-6"
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {routing.map((language) => (
          <>
            <option key={language} value={language}>
              <>{t("locale", { locale: language })}</>
            </option>
          </>
        ))}
      </select>
      <span className="pointer-events-none absolute right-2 top-[8px]">⌄</span>
    </label>
  );
};
