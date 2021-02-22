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

export const shippingCostRules = (
  shipping: number,
  subtotal: number,
  quantity: number
) => {
  if (quantity <= 15) return 30;
  if (subtotal >= 400) return 0;

  return quantity % 5 ? shipping + 7 : shipping;
};
