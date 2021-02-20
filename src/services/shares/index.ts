import { Product, Vourcher } from '../utils';

interface ICart {
  total: number;
  subtotal: number;
  shippingCosts: number;
  withDescounts: number;
  cart: Product[];
  vourches: Vourcher[];
}

type ACTIONS_TYPES_CART =
  | { type: 'load_products'; payload: Product[] }
  | { type: 'load_vouchers'; payload: Vourcher[] }
  | { type: 'add_product'; payload: Product }
  | { type: 'increase_product'; payload: number }
  | { type: 'decrement_product'; payload: number }
  | { type: 'remove_product'; payload: number }
  | { type: 'remove_all' }
  | { type: 'get_total' }
  | { type: 'get_subtotal'; payload: number }
  | { type: 'apply_voucher'; payload: Vourcher }
  | { type: 'get_shipping'; payload: number };
