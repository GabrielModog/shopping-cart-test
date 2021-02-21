import React, { ReactNode, useEffect, useReducer } from 'react';
import {
  CartReducer,
  defaultCartState,
  ICart,
  IVouchers,
  OnCart,
} from './shares';

export interface Services {
  cart: ICart;
  vouchers: IVouchers;
  onCart: OnCart;
}

const defaultServicesState: Services = {
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
  };

  return (
    <CartContext.Provider value={services}>{children}</CartContext.Provider>
  );
};
