// @TODO: split reducers actions responsibilities
// a single thing doing to much stuff

import {
  getSubtotal,
  getTotal,
  shippingCostRules,
  vourchersStrategy,
  Product,
  getProduct,
  onCartIncreaseQuantity,
  decreaseAvailableProduct,
} from '../utils';

import { ICartState, ACTIONS_TYPES_CART } from './types';

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
      const productToCart: any = getProduct(
        state.cart.products,
        action.payload.id
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
            products: onCartIncreaseQuantity(
              state.onCart.products,
              action.payload
            ),
          },
        };

      return {
        ...state,
        cart: {
          ...state.cart,
          products: decreaseAvailableProduct(
            state.cart.products,
            action.payload
          ),
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
          total: getTotal(state.onCart.subtotal, state.onCart.shippingCosts),
          products: onCartIncreaseQuantity(
            state.onCart.products,
            action.payload
          ),
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
