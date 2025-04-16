/* eslint-disable @typescript-eslint/no-unused-vars */

import { COLORS_INTERFACE } from "@/interfaces/Colors.Interface";

export const COLORS: Array<COLORS_INTERFACE> = [
  { label: "Black", value: "black", tw: "zinc-900" },
  {
    label: "Blue",
    value: "blue",
    tw: "blue-950",
  },
  { label: "Rose", value: "rose", tw: "rose-950" },
];

export const MODELS = [
  {
    label: "iPhone X",
    value: "iphonex",
    id: "",
  },
  {
    label: "iPhone 11",
    value: "iphone11",
    id: "",
  },
  {
    label: "iPhone 12",
    value: "iphone12",
    id: "",
  },
  {
    label: "iPhone 13",
    value: "iphone13",
    id: "",
  },
  {
    label: "iPhone 14",
    value: "iphone14",
    id: "",
  },
  {
    label: "iPhone 15",
    value: "iphone15",
    id: "",
  },
];

const PRODUCT_PRICES = {
  material: {
    silicone: 0,
    polycarbonate: 5_00,
  },
  finish: {
    smooth: 0,
    textured: 3_00,
  },
};

const BASE_PRICE = 14_00;

export const MATERIALS = [
  {
    label: "Silicone",
    value: "silicone",
    id: "",
    description: undefined,
    price: PRODUCT_PRICES.material.silicone,
  },
  {
    label: "Soft Polycarbonate",
    value: "polycarbonate",
    id: "",
    description: "Scratch-resistant coating",
    price: PRODUCT_PRICES.material.polycarbonate,
  },
];

export const FINISHES = [
  {
    label: "Smooth Finish",
    value: "smooth",
    id: "",
    description: undefined,
    price: PRODUCT_PRICES.finish.smooth,
  },
  {
    label: "Textured Finish",
    value: "textured",
    id: "",
    description: "Soft grippy texture",
    price: PRODUCT_PRICES.finish.textured,
  },
];
