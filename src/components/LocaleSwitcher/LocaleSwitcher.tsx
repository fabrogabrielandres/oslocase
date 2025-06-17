import { useLocale, } from "next-intl";
import { LocaleSwitcherSelect } from "../LocaleSwitcherSelect/LocaleSwitcherSelect";

export default function LocaleSwitcher() {
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect
      routing={["en", "es", "no"]}
      defaultValue={locale}
    ></LocaleSwitcherSelect>
  );
}
