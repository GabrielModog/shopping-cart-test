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

export const getSubtotal = (list: Array<any>) => {
  return list.reduce((accum, curr) => accum + curr.quantity * curr.price, 0);
};
