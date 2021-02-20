export interface Product {
  id: number;
  name: string;
  price: number;
  available: number;
}

export interface Vourcher {
  id: number;
  code: string;
  type: string;
  amount: number;
  minValue?: number;
}
