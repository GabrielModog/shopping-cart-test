import React, { ReactNode, useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';
import {
  CartReducer,
  defaultCartState,
  ICart,
  IVouchers,
  OnCart,
} from './shares';
import { Product, Voucher } from './utils';

export interface Services {
  cart: ICart;
  vouchers: IVouchers;
  onCart: OnCart;
  addProductToCart: (product: Product) => void;
  increaseProduct: (id: number) => void;
  decrementProduct: (id: number) => void;
  loadVoucher: (voucher: Voucher) => void;
}

const defaultServicesState: Services = {
  addProductToCart: () => {},
  increaseProduct: () => {},
  decrementProduct: () => {},
  loadVoucher: () => {},
  cart: {
    loading: false,
    error: true,
    products: [],
  },
  vouchers: {
    loading: false,
    error: true,
    list: [],
  },
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
    shippingCosts: 0,
    descount: 0,
    hasDescount: false,
  },
};

export const CartContext = React.createContext<Services>(defaultServicesState);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(CartReducer, defaultCartState);

  const addProductToCart = (product: Product) =>
    dispatch({
      type: 'add_to_cart',
      payload: product,
    });

  const increaseProduct = (id: number) =>
    dispatch({
      type: 'increase_product',
      payload: id,
    });

  const decrementProduct = (id: number) =>
    dispatch({
      type: 'decrement_product',
      payload: id,
    });

  const loadVoucher = (voucher: Voucher) => {
    dispatch({
      type: 'apply_voucher',
      payload: voucher,
    });

    dispatch({
      type: 'store_voucher',
      payload: voucher,
    });
  };

  useEffect(() => {
    fetch('https://shielded-wildwood-82973.herokuapp.com/products.json')
      .then(response => {
        dispatch({
          type: 'load_products',
        });

        return response.json();
      })
      .then(data =>
        dispatch({
          type: 'successful_load_products',
          payload: data.products,
        })
      )
      .catch(() => {
        toast.error('Failed to load products');
        return dispatch({
          type: 'failed_load_products',
        });
      });

    fetch('https://shielded-wildwood-82973.herokuapp.com/vouchers.json')
      .then(response => {
        dispatch({
          type: 'load_vouchers',
        });
        return response.json();
      })
      .then(data =>
        dispatch({
          type: 'successful_load_vouchers',
          payload: data.vouchers,
        })
      )
      .catch(() => {
        toast.error('Failed to load vouchers');
        return dispatch({
          type: 'failed_load_vouchers',
        });
      });
  }, []);

  const services = {
    cart: state.cart,
    vouchers: state.vouchers,
    onCart: state.onCart,
    addProductToCart,
    increaseProduct,
    decrementProduct,
    loadVoucher,
  };

  return (
    <CartContext.Provider value={services}>{children}</CartContext.Provider>
  );
};
