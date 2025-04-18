"use client";
import HandleComponent from "@/components/HandleComponent/HandleComponent";
import { Button } from "@/components/ui/button";
import {
  COLORS_INTERFACE,
  FINISHES_INTERFACE,
  MATERIAL_INTERFACE,
  MODELS_INTERFACE,
} from "@/interfaces/Colors.Interface";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Check, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Rnd } from "react-rnd";

interface Props {
  id: string;
  imgUrl: string;
  imageDimenisons: ImageDimenisons;
  colors: Array<COLORS_INTERFACE>;
  models: Array<MODELS_INTERFACE>;
  materials: Array<MATERIAL_INTERFACE>;
  finishes: Array<FINISHES_INTERFACE>;
}

interface ImageDimenisons {
  width: number;
  height: number;
}

export const DesignConfiguration = ({
  imageDimenisons,
  imgUrl,
  colors,
  models,
  finishes,
  materials,
}: Props) => {
  const { height, width } = imageDimenisons;

  interface COLORSMAPED {
    label: string;
    value: string;
    border: string;
    bg: string;
  }
  const mapColors: { [key: string]: COLORSMAPED } = {};

  colors.forEach((color: COLORS_INTERFACE) => {
    mapColors[color.value as keyof typeof mapColors] = {
      bg: `bg-${color.tw}`,
      border: `border-${color.tw}`,
      label: color.label,
      value: color.value,
    };
  });
  // const mapColors = {
  //   black: {
  //     bg: "bg-zinc-900",
  //     border: "border-zinc-900",
  //     label: "Black",
  //     value: "black",
  //   },
  //   blue: {
  //     bg: "bg-blue-950",
  //     border: "border-blue-950",
  //     label: "Blue",
  //     value: "blue",
  //   },
  //   rose: {
  //     bg: "bg-rose-950",
  //     border: "border-rose-950",
  //     label: "Rose",
  //     value: "rose",
  //   },
  // };

  const [options, setOptions] = useState<{
    color: string;
    model: string;
    material: string;
    finish: string;
  }>({
    color: colors[0].value,
    model: models[0].value,
    material: materials[0].value,
    finish: finishes[0].value,
  });

  useEffect(() => {
    console.log("colors", colors);
    console.log("options", options);
    console.log("mapColors", mapColors);
    console.log("models", models);
    console.log("materials", materials);
    console.log("finishes", finishes);
  }, [options]);

  return (
    <div className="relative mt-20 grid grid-cols-1 lg:grid-cols-3 mb-20 pb-20 ">
      <div className="relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ">
        <div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]">
          <AspectRatio
            ratio={896 / 1831}
            className="pointer-events-none relative z-50 aspect-[896/1831] w-full "
          >
            <Image
              fill
              alt="phone image"
              src="/phone-template.png"
              className="pointer-events-none z-50 select-none"
            />
          </AspectRatio>
          <section
            className={cn(
              `absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] w-full h-full`,
              `${mapColors[options.color as keyof typeof mapColors].bg}`
            )}
          />
          {/* this div generated from border to outside a shadow , is like a background from the border to exterior  */}
          <div className="absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)] " />
        </div>
        <Rnd
          default={{
            x: 150,
            y: 205,
            height: height / 4,
            width: width / 4,
          }}
          className="absolute z-20 border-[3px] border-primary"
          lockAspectRatio
          resizeHandleComponent={{
            bottomRight: <HandleComponent />,
            bottomLeft: <HandleComponent />,
            topRight: <HandleComponent />,
            topLeft: <HandleComponent />,
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src={imgUrl}
              fill
              alt="your image"
              className="pointer-events-none"
            />
          </div>
        </Rnd>
      </div>
      <div className="h-[37.5rem] w-full col-span-full lg:col-span-1 flex flex-col bg-white">
        <ScrollArea className="relative flex-1 overflow-auto">
          {/* <div
            aria-hidden="true"
            className="absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none "
          /> */}
          <div className="px-8 pb-12 pt-8">
            <h2 className="tracking-tight font-bold text-3xl">
              Customize your case
            </h2>

            <div className="w-full h-px bg-zinc-200 my-6" />
            <div className="relative mt-4 h-full flex flex-col justify-between">
              <div className="flex flex-col gap-6">
                <RadioGroup
                  value={options.color}
                  onValueChange={(val) => {
                    setOptions((prev) => ({
                      ...prev,
                      color: val,
                    }));
                  }}
                >
                  <label>Color: {options.color}</label>
                  <div className="mt-3 flex items-center space-x-3">
                    {colors.map((color) => (
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
                            `${
                              mapColors[color.value as keyof typeof mapColors]
                                .bg
                            }`
                          )}
                        ></div>
                      </RadioGroupItem>
                    ))}
                  </div>
                </RadioGroup>
              </div>
              <div className="relative flex flex-col gap-3 w-full">
                <label className="mt-3">Model</label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between"
                    >
                      {options.model}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="z-10 border border-input bg-white">
                    {models.map(({ value }) => (
                      <DropdownMenuItem
                        key={value}
                        className={cn(
                          "flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100 focus:outline-none",
                          {
                            "bg-zinc-100": value === options.model,
                          }
                        )}
                        onClick={() => {
                          setOptions((prev) => ({
                            ...prev,
                            model: value,
                          }));
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === options.model
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {value}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {[
                { name: "material", selectableOptions: materials },
                { name: "finish", selectableOptions: finishes },
              ].map(({ name, selectableOptions }) => (
                <RadioGroup
                  key={name}
                  value={options[name as keyof typeof options]}
                  className="mt-4"
                  onValueChange={(val) => {
                    console.log("daleee", val);

                    setOptions((prev) => ({
                      ...prev,
                      [name]: val,
                    }));
                  }}
                >
                  <label>
                    {name.slice(0, 1).toUpperCase() + name.slice(1)}
                  </label>
                  <div className="mt-3 space-y-4">
                    {selectableOptions.map(({ value, description, label }) => (
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
                              {label}
                            </label>

                            {description ? (
                              <div
                                // as="span"
                                className="text-gray-500"
                              >
                                <span className="block sm:inline">
                                  {description}
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
                            {/* {formatPrice(price / 100)} */}
                          </span>
                        </div>
                      </RadioGroupItem>
                    ))}
                  </div>
                </RadioGroup>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
