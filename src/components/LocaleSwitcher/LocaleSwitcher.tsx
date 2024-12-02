import { useLocale, useTranslations } from "next-intl";
import { LocaleSwitcherSelect } from "../LocaleSwitcherSelect/LocaleSwitcherSelect";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();


  return (
    <>
    <span></span>
      <LocaleSwitcherSelect routing={["en", "es", "no"]} defaultValue={locale} label={t("label")}>
    
      </LocaleSwitcherSelect>
    </>
  );
}
