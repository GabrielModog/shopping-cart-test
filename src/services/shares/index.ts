import { Product, Voucher } from '../utils';

export interface ICart {
  total: number;
  subtotal: number;
  shippingCosts: number;
  withDescounts: number;
  cart: Product[];
  vouchers: Voucher[];
}

export const defaultCartState = {
  total: 0,
  subtotal: 0,
  shippingCosts: 0,
  withDescounts: 0,
  cart: [],
  vouchers: [],
};

type ACTIONS_TYPES_CART =
  | { type: 'load_products'; payload: Product[] }
  | { type: 'load_vouchers'; payload: Voucher[] }
  | { type: 'add_product'; payload: Product }
  | { type: 'increase_product'; payload: number }
  | { type: 'decrement_product'; payload: number }
  | { type: 'remove_product'; payload: number }
  | { type: 'remove_all' }
  | { type: 'get_total' }
  | { type: 'get_subtotal'; payload: number }
  | { type: 'apply_voucher'; payload: Voucher }
  | { type: 'get_shipping'; payload: number };

export function CartReducer(state: ICart, action: ACTIONS_TYPES_CART): ICart {
  switch (action.type) {
    case 'load_products':
      return {
        ...state,
        cart: [...action.payload],
      };
    case 'load_vouchers':
      return {
        ...state,
        vouchers: [...action.payload],
      };
    default:
      return state;
  }
}
