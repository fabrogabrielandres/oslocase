export interface ConfigurationInterface {
  id: string;
  width: number;
  height: number;
  croppedImageUrl: string | null;
  imageUrl: string | null;
  modelsPhoneId: string;
  materialsPhoneId: string;
  finishesPhoneId: string;
  colorsPhoneId: string;
  finish: Finish;
  material: Finish;
  ColorsPhone: ColorsPhone;
  model: ModelPhone;
}

export interface ModelPhone {
  label: string;
  id: string;
  value: string;
}

export interface ColorsPhone {
  label: string;
  id: string;
  value: string;
}

export interface Finish {
  label: string;
  id: string;
  value: string;
  description: string;
  price: number;
}
