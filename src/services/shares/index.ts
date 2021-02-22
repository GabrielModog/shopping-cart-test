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
  shippingCosts: number;
  withDescounts: number;
  products: Product[];
}

export interface ICartState {
  cart: ICart;
  vouchers: IVouchers;
  onCart: OnCart;
}

export const defaultCartState = {
  onCart: {
    products: [],
    total: 0,
    subtotal: 0,
    shippingCosts: 0,
    withDescounts: 0,
  },
  cart: {
    loading: true,
    error: false,
    products: [],
  },
  vouchers: {
    loading: true,
    error: false,
    list: [],
  },
};

type ACTIONS_TYPES_CART =
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
  | { type: 'get_shipping'; payload: number };

export function CartReducer(
  state: ICartState,
  action: ACTIONS_TYPES_CART
): ICartState {
  switch (action.type) {
    case 'load_products':
      return {
        ...state,
        cart: {
          ...state.cart,
          loading: true,
          error: false,
        },
      };
    case 'load_vouchers':
      return {
        ...state,
        vouchers: {
          ...state.vouchers,
          loading: true,
          error: false,
        },
      };
    case 'successful_load_products':
      return {
        ...state,
        cart: {
          ...state.cart,
          loading: false,
          error: false,
          products: [...action.payload],
        },
      };
    case 'failed_load_products':
      return {
        ...state,
        cart: {
          ...state.cart,
          loading: false,
          error: true,
        },
      };
    case 'successful_load_vouchers':
      return {
        ...state,
        vouchers: {
          ...state.vouchers,
          error: false,
          loading: false,
          list: [...action.payload],
        },
      };
    case 'failed_load_vouchers':
      return {
        ...state,
        vouchers: {
          ...state.vouchers,
          loading: false,
          error: true,
        },
      };
    case 'add_to_cart': {
      const avaliableChanged = state.cart.products.map((product: Product) => {
        if (product.id === action.payload.id)
          return {
            ...product,
            available: product.available > 0 ? product.available - 1 : 0,
            quantity: product.quantity ? product.quantity + 1 : 1,
          };

        return product;
      });

      const removeFromCart = state.onCart.products.filter(
        (product: Product) => product.id !== action.payload.id
      );
      const onCartChanged: any = state.cart.products.find(
        (product: Product) => product.id === action.payload.id
      );

      const onCartArray = removeFromCart.concat(onCartChanged);

      return {
        ...state,
        cart: {
          ...state.cart,
          products: avaliableChanged,
        },
        onCart: {
          ...state.onCart,
          products: onCartArray.sort(),
        },
      };
    }
    default:
      return state;
  }
}
