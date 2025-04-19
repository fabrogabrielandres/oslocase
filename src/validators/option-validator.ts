/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  COLORS_INTERFACE,
  MODELS_INTERFACE,
} from "../interfaces/Colors.Interface";

export const COLORS: Array<COLORS_INTERFACE> = [
  { label: "Black", value: "black", tw: "zinc-900" },
  {
    label: "Blue",
    value: "blue",
    tw: "blue-950",
  },
  { label: "Rose", value: "rose", tw: "rose-950" },
];

export const MODELS: Array<MODELS_INTERFACE> = [
  {
    label: "iPhone X",
    value: "iphonex",
  },
  {
    label: "iPhone 11",
    value: "iphone11",
  },
  {
    label: "iPhone 12",
    value: "iphone12",
  },
  {
    label: "iPhone 13",
    value: "iphone13",
  },
  {
    label: "iPhone 14",
    value: "iphone14",
  },
  {
    label: "iPhone 15",
    value: "iphone15",
  },
];

export const MATERIALS = [
  {
    label: "Silicone",
    value: "silicone",
    description: undefined,
    price: 0,
  },
  {
    label: "Soft Polycarbonate",
    value: "polycarbonate",
    description: "Scratch-resistant coating",
    price: 5.0,
  },
];

export const FINISHES = [
  {
    label: "Smooth Finish",
    value: "smooth",
    description: undefined,
    price: 0,
  },
  {
    label: "Textured Finish",
    value: "textured",
    description: "Soft grippy texture",
    price: 3.0,
  },
];
