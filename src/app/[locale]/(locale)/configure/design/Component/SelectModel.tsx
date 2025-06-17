import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MODELS_INTERFACE } from "@/interfaces/Colors.Interface";
import { cn } from "@/lib/utils";

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
  modelsMasters: Array<MODELS_INTERFACE>;
}

export const SelectModel = ({ options, setOptions ,modelsMasters}: Props) => {
  return (
    <>
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
          {modelsMasters.map(({ value }) => (
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
                  value === options.model ? "opacity-100" : "opacity-0"
                )}
              />
              {value}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
