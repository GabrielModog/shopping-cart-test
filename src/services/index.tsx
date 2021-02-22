import React, { ReactNode, useEffect, useReducer } from 'react';
import {
  CartReducer,
  defaultCartState,
  ICart,
  IVouchers,
  OnCart,
} from './shares';
import { Product } from './utils';

export interface Services {
  cart: ICart;
  vouchers: IVouchers;
  onCart: OnCart;
  addProductToCart: (product: Product) => void;
}

const defaultServicesState: Services = {
  addProductToCart: () => {},
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
    total: 0,
    subtotal: 0,
    shippingCosts: 0,
    withDescounts: 0,
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

  useEffect(() => {
    // fetch products
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
      .catch(() =>
        dispatch({
          type: 'failed_load_products',
        })
      );

    // fetch vouchers
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
      .catch(() =>
        dispatch({
          type: 'failed_load_vouchers',
        })
      );
  }, []);

  const services = {
    cart: state.cart,
    vouchers: state.vouchers,
    onCart: state.onCart,
    addProductToCart,
  };

  return (
    <CartContext.Provider value={services}>{children}</CartContext.Provider>
  );
};
