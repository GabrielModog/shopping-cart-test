export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface Vourche {
  id: number;
  code: string;
  type: string;
  amount: number;
  minValue?: number;
}
