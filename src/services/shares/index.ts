import {
  getSubtotal,
  Product,
  shippingCostRules,
  Voucher,
  vourchersStrategy,
} from '../utils';

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

export const defaultCartState = {
  onCart: {
    products: [],
    currentVoucher: {
      id: 0,
      code: '',
      minValue: 0,
      amount: 0,
      type: '',
    },
    quantity: 0,
    total: 0,
    subtotal: 0,
    shippingCosts: 30,
    descount: 0,
    hasDescount: false,
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
  | { type: 'store_voucher'; payload: Voucher }
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
      const productToCart: any = state.cart.products.find(
        (product: any) => product.id === action.payload.id
      );

      const onCartArray = state.onCart.products.some(
        (item: Product) => item.id === productToCart.id
      )
        ? state.onCart.products
        : [
            ...state.onCart.products,
            {
              ...productToCart,
              quantity: productToCart.quantity ? productToCart.quantity + 1 : 1,
            },
          ];

      const changeAvailable = state.cart.products.map((product: Product) => {
        if (product.id === action.payload.id)
          return {
            ...product,
            available: product.available - 1,
          };
        return product;
      });

      return {
        ...state,
        cart: {
          ...state.cart,
          products: changeAvailable,
        },
        onCart: {
          ...state.onCart,
          quantity: state.onCart.quantity + 1,
          products: onCartArray,
        },
      };
    }
    case 'increase_product': {
      if (state.onCart.hasDescount)
        return {
          ...state,
          onCart: {
            ...state.onCart,
            subtotal:
              state.onCart.currentVoucher.type === 'percent'
                ? vourchersStrategy.percentual(
                    state.onCart.subtotal,
                    state.onCart.currentVoucher.amount
                  )
                : getSubtotal(state.onCart.products),
            total:
              state.onCart.currentVoucher.type === 'fixed'
                ? vourchersStrategy.fixed(
                    state.onCart.subtotal,
                    state.onCart.currentVoucher.amount
                  )
                : state.onCart.subtotal + state.onCart.shippingCosts,
            quantity: state.onCart.quantity + 1,
            shippingCosts:
              state.onCart.currentVoucher.type === 'shipping'
                ? state.onCart.currentVoucher.amount
                : state.onCart.shippingCosts,
            products: state.onCart.products.map((product: Product) => {
              if (product.id === action.payload)
                return {
                  ...product,
                  quantity: product.quantity ? product.quantity + 1 : 1,
                };
              return product;
            }),
          },
        };

      return {
        ...state,
        cart: {
          ...state.cart,
          products: state.cart.products.map((product: Product) => {
            if (product.id === action.payload)
              return {
                ...product,
                available: product.available > 0 ? product.available - 1 : 0,
              };
            return product;
          }),
        },
        onCart: {
          ...state.onCart,
          subtotal: getSubtotal(state.onCart.products),
          shippingCosts: shippingCostRules(
            state.onCart.shippingCosts,
            state.onCart.subtotal,
            state.onCart.quantity + 1
          ),
          quantity: state.onCart.quantity + 1,
          total: state.onCart.subtotal + state.onCart.shippingCosts,
          products: state.onCart.products.map((product: Product) => {
            if (product.id === action.payload)
              return {
                ...product,
                quantity: product.quantity ? product.quantity + 1 : 1,
              };
            return product;
          }),
        },
      };
    }
    case 'decrement_product': {
      const isRemovable = state.onCart.products.some(
        (item: Product) => item.quantity <= 1
      );

      const toRemove = state.onCart.products.filter(
        (item: Product) => item.id !== action.payload
      );

      const changeQuantity = state.onCart.products.map((product: Product) => {
        if (product.id === action.payload)
          return {
            ...product,
            quantity: product.quantity > 0 ? product.quantity - 1 : 0,
          };
        return product;
      });

      const changeAvailable = state.cart.products.map((product: Product) => {
        if (product.id === action.payload)
          return {
            ...product,
            available: product.available + 1,
          };
        return product;
      });

      return {
        ...state,

        cart: {
          ...state.cart,
          products: changeAvailable,
        },
        onCart: {
          ...state.onCart,
          products: isRemovable ? toRemove : changeQuantity,
        },
      };
    }
    case 'apply_voucher':
      return {
        ...state,
        onCart: {
          ...state.onCart,
          hasDescount: true,
          total:
            action.payload.type === 'fixed'
              ? vourchersStrategy.fixed(
                  state.onCart.total,
                  action.payload.amount
                )
              : state.onCart.total,
          subtotal:
            action.payload.type === 'percentual'
              ? vourchersStrategy.percentual(
                  state.onCart.subtotal,
                  action.payload.amount
                )
              : state.onCart.subtotal,
          shippingCosts:
            action.payload.type === 'shipping'
              ? vourchersStrategy.shipping(
                  state.onCart.subtotal,
                  action.payload.minValue ?? 0,
                  state.onCart.shippingCosts
                )
              : state.onCart.shippingCosts,
        },
      };
    case 'store_voucher': {
      if (action.payload.type === 'fixed')
        return {
          ...state,
          onCart: {
            ...state.onCart,
            currentVoucher: action.payload,
            descount: action.payload.amount,
          },
        };

      if (action.payload.type === 'percentual')
        return {
          ...state,
          onCart: {
            ...state.onCart,
            currentVoucher: action.payload,
            descount: action.payload.amount,
          },
        };
      if (action.payload.type === 'shipping')
        return {
          ...state,
          onCart: {
            ...state.onCart,
            currentVoucher: action.payload,
            descount: `Free shipping for purchases above: ${action.payload.minValue}`,
          },
        };
      return state;
    }
    default:
      return state;
  }
}
