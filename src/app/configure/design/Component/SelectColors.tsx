import { COLORS_INTERFACE } from "@/interfaces/Colors.Interface";
import { cn } from "@/lib/utils";
import { COLORSMAPED } from "../DesignConfiguration";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { useTranslations } from "next-intl";

interface Options {
  [key: string]: string;
}
interface Props {
  setOptions: React.Dispatch<
    React.SetStateAction<{
      color: string;
      model: string;
      material: string;
      finish: string;
    }>
  >;
  options: Options;
  colorsMasters: Array<COLORS_INTERFACE>;
  mapColors: { [key: string]: COLORSMAPED };
}

export const SelectColors = ({
  colorsMasters,
  setOptions,
  options,
  mapColors,
}: Props) => {
  const t = useTranslations("Configure.SelectColors");

  return (
    <RadioGroup
      value={options.color}
      onValueChange={(val) => {
        setOptions((prev) => ({
          ...prev,
          color: val,
        }));
      }}
    >
      <label>
        {t.rich("Color")}: {t.rich(options.color)}
      </label>
      <div className="mt-3 flex items-center space-x-3">
        {colorsMasters.map((color) => (
          <RadioGroupItem
            key={color.value}
            value={color.value}
            className={cn(
              `grid place-content-center rounded-full h-10 w-10 relative -m-1.5  cursor-pointer p-0.5 active:ring-0 focus:ring-0 active:outline-none focus:outline-none border-2 border-transparent border-${color.tw}`,
              `data-[state=checked]:border-[8px] `
            )}
          >
            <div
              className={cn(
                "h-8 w-8 rounded-full border border-black border-opacity-10",
                `${mapColors[color.value as keyof typeof mapColors].bg}`
              )}
            ></div>
          </RadioGroupItem>
        ))}
      </div>
    </RadioGroup>
  );
};
