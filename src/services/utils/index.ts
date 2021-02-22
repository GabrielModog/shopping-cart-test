export interface Product {
  id: number;
  name: string;
  price: number;
  available: number;
  quantity: number;
}

export interface Voucher {
  id: number;
  code: string;
  type: string;
  amount: number;
  minValue?: number;
}
