export interface COLORS_INTERFACE {
  label: string;
  value: string;
  tw: string;
  id?: string;
}

export interface COLORMAMP_INTERFACE {
  label: string;
  value: string;
  tw: string;
}

export interface MODELS_INTERFACE {
  label: string;
  value: string;
  id?: string;
}

export interface MATERIAL_INTERFACE {
  label: string;
  value: string;
  id?: string;
  description?: string | null;
  price: number;
}

export interface FINISHES_INTERFACE {
  label: string;
  value: string;
  id?: string;
  description?: string | null;
  price: number;
}
