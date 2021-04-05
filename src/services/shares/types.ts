import { Product, Voucher } from '../utils';

export interface ICart {
  products: Product[];
  loading: boolean;
  error: boolean;
}

export interface IVouchers {
  list: Voucher[];
  loading: boolean;
  error: boolean;
}

export interface OnCart {
  total: number;
  subtotal: number;
  quantity: number;
  shippingCosts: number;
  descount: number | string;
  hasDescount: boolean;
  currentVoucher: Voucher;
  products: Product[];
}

export interface ICartState {
  cart: ICart;
  vouchers: IVouchers;
  onCart: OnCart;
}

export type ACTIONS_TYPES_CART =
  | { type: 'successful_load_products'; payload: Product[] }
  | { type: 'successful_load_vouchers'; payload: Voucher[] }
  | { type: 'load_products' }
  | { type: 'load_vouchers' }
  | { type: 'failed_load_products' }
  | { type: 'failed_load_vouchers' }
  | { type: 'add_to_cart'; payload: Product }
  | { type: 'increase_product'; payload: number }
  | { type: 'decrement_product'; payload: number }
  | { type: 'remove_product'; payload: number }
  | { type: 'remove_all' }
  | { type: 'get_total' }
  | { type: 'get_subtotal'; payload: number }
  | { type: 'apply_voucher'; payload: Voucher }
  | { type: 'store_voucher'; payload: Voucher }
  | { type: 'get_shipping'; payload: number };
