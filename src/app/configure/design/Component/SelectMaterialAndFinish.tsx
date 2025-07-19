import {
  FINISHES_INTERFACE,
  MATERIAL_INTERFACE,
} from "@/interfaces/Colors.Interface";
import { cn, formatPrice } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { useTranslations } from "next-intl";

interface Options {
  [key: string]: string;
}

interface Props {
  materialsMasters: Array<MATERIAL_INTERFACE>;
  finishesMasters: Array<FINISHES_INTERFACE>;
  setOptions: React.Dispatch<
    React.SetStateAction<{
      color: string;
      model: string;
      material: string;
      finish: string;
    }>
  >;
  options: Options;
}

export const SelectMaterialAndFinish = ({
  finishesMasters,
  materialsMasters,
  options,
  setOptions,
}: Props) => {
  const t = useTranslations("Configure.SelectMaterial");

  return (
    <>
      {[
        { name: "material", selectableOptions: materialsMasters },
        { name: "finish", selectableOptions: finishesMasters },
      ].map(({ name, selectableOptions }) => (
        <RadioGroup
          key={name}
          value={options[name as keyof typeof options]}
          className="mt-4"
          onValueChange={(val) => {
            setOptions((prev) => ({
              ...prev,
              [name]: val,
            }));
          }}
        >
          <label>
            {(t.rich(name) as string).slice(0, 1).toUpperCase() +
              (t.rich(name) as string).slice(1)}
          </label>
          <div className="mt-3 space-y-4">
            {selectableOptions.map(({ value, description, label, price }) => (
              <RadioGroupItem
                key={value}
                id={value}
                value={value}
                className={cn(
                  "w-full relative block cursor-pointer rounded-lg bg-white px-6 py-4 shadow-sm border-2 border-zinc-200 focus:outline-none ring-0 focus:ring-0 outline-none sm:flex sm:justify-between",
                  `data-[state=checked]:border-primary`
                )}
              >
                <div className="flex items-center">
                  <span className="flex flex-col text-sm">
                    <label
                      className="font-medium text-gray-900"
                      // as="span"
                      htmlFor={value}
                    >
                      {t.rich(label)}
                    </label>

                    {description ? (
                      <div
                        // as="span"
                        className="text-gray-500"
                      >
                        <span className="block sm:inline">
                          {t.rich(description)}
                        </span>
                      </div>
                    ) : null}
                  </span>
                </div>

                <div
                  // as="span"
                  className="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right"
                >
                  <span className="font-medium text-gray-900">
                    {formatPrice(price)}
                  </span>
                </div>
              </RadioGroupItem>
            ))}
          </div>
        </RadioGroup>
      ))}
    </>
  );
};
