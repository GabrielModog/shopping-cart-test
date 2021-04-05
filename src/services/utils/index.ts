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

export function getProduct(list: Array<Product>, id: number) {
  return list.find(product => product.id === id);
}

export function addProduct(list: Array<Product>, product: Product) {
  return [...list, product];
}

export function removeProduct(list: Array<Product>, id: number) {
  return list.filter(product => product.id !== id);
}

export function decreaseAvailableProduct(list: Array<Product>, id: number) {
  return list.map(product =>
    product.id === id
      ? {
          ...product,
          available: product.available > 0 ? product.available - 1 : 0,
        }
      : product
  );
}

export function onCartIncreaseQuantity(list: Array<any>, id: number) {
  return list.map((product: Product) =>
    product.id === id
      ? {
          ...product,
          quantity: product.quantity ? product.quantity + 1 : 1,
        }
      : product
  );
}

export function getSubtotal(list: Array<any>) {
  return list.reduce((accum, curr) => accum + curr.quantity * curr.price, 0);
}

export function getTotal(subtotal: number, shippingCosts: number) {
  return subtotal + shippingCosts;
}

export function shippingCostRules(
  shipping: number,
  subtotal: number,
  quantity: number
) {
  if (quantity <= 15) return 30;
  if (subtotal >= 400) return 0;

  return quantity % 5 ? shipping + 7 : shipping;
}

interface IVouchersStrategy {
  percentual: (subtotal: number, amount: number) => number;
  fixed: (subtotal: number, amount: number) => number;
  shipping: (
    subtotal: number,
    minValue: number,
    shippingCost: number
  ) => number;
}

export const vourchersStrategy: IVouchersStrategy = {
  percentual: (subtotal: number, amount: number) => (subtotal / amount) * 100,
  fixed: (subtotal: number, amount: number) => subtotal - amount,
  shipping: (subtotal: number, minValue: number, shippingCost: number) =>
    subtotal >= minValue ? 0 : shippingCost,
};
