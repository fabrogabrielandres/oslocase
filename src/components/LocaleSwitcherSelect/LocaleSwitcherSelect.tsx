"use client";

import clsx from "clsx";
import { useParams, useSearchParams } from "next/navigation";
import {
  ChangeEvent,
  //  ReactNode,
  useTransition,
} from "react";
import { Locale, usePathname, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";

type U = ["en", "es", "no"];

type Props = {
  defaultValue: string;
  routing: U;
};

export const LocaleSwitcherSelect = ({ defaultValue, routing }: Props) => {
  const t = useTranslations("LocaleSwitcher");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  const searchParams = useSearchParams();
  const todos: { [anyProp: string]: string } = {};

  searchParams.forEach((value, key) => {
    todos[key] = value;
  });


  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params, query: { ...todos } },
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
      <select
        className="text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 rounded-md px-3"
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {routing.map((language) => (
          <option key={language} value={language}>
            {/* <>{t("locale", { locale: language })}</> */}
            <>{t.rich("locale", { locale: language })}</>
          </option>
        ))}
      </select>
    </label>
  );
};
