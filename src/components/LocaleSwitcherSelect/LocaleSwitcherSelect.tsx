"use client";

import clsx from "clsx";
import {
  ChangeEvent,
  //  ReactNode,
  useTransition,
} from "react";
import { useTranslations } from "next-intl";
import { setUserLocale } from "@/services/locale";
import { Locale } from "@/i18n/config";

type U = ["en", "es", "no"];

type Props = {
  defaultValue: string;
  routing: U;
};

export const LocaleSwitcherSelect = ({ defaultValue, routing }: Props) => {
  const t = useTranslations("LocaleSwitcher");
  const [isPending, startTransition] = useTransition();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
      setUserLocale(nextLocale);
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

// ("use client");

// import { CheckIcon, LanguageIcon } from "@heroicons/react/24/solid";
// import * as Select from "@radix-ui/react-select";
// import clsx from "clsx";
// import { useTransition } from "react";
// import { Locale } from "@/i18n/config";
// import { setUserLocale } from "@/services/locale";

// type Props = {
//   defaultValue: string;
//   items: Array<{ value: string; label: string }>;
//   label: string;
// };

// export default function LocaleSwitcherSelect({
//   defaultValue,
//   items,
//   label,
// }: Props) {
//   const [isPending, startTransition] = useTransition();

//   function onChange(value: string) {
//     const locale = value as Locale;
//     startTransition(() => {
//       setUserLocale(locale);
//     });
//   }

//   return (
//     <div className="relative">
//       <Select.Root defaultValue={defaultValue} onValueChange={onChange}>
//         <Select.Trigger
//           aria-label={label}
//           className={clsx(
//             "rounded-sm p-2 transition-colors hover:bg-slate-200",
//             isPending && "pointer-events-none opacity-60"
//           )}
//         >
//           <Select.Icon>
//             <LanguageIcon className="h-6 w-6 text-slate-600 transition-colors group-hover:text-slate-900" />
//           </Select.Icon>
//         </Select.Trigger>
//         <Select.Portal>
//           <Select.Content
//             align="end"
//             className="min-w-[8rem] overflow-hidden rounded-sm bg-white py-1 shadow-md"
//             position="popper"
//           >
//             <Select.Viewport>
//               {items.map((item) => (
//                 <Select.Item
//                   key={item.value}
//                   className="flex cursor-default items-center px-3 py-2 text-base data-[highlighted]:bg-slate-100"
//                   value={item.value}
//                 >
//                   <div className="mr-2 w-[1rem]">
//                     {item.value === defaultValue && (
//                       <CheckIcon className="h-5 w-5 text-slate-600" />
//                     )}
//                   </div>
//                   <span className="text-slate-900">{item.label}</span>
//                 </Select.Item>
//               ))}
//             </Select.Viewport>
//             <Select.Arrow className="fill-white text-white" />
//           </Select.Content>
//         </Select.Portal>
//       </Select.Root>
//     </div>
//   );
// }
