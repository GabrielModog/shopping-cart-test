import React, { ReactNode, useEffect, useReducer } from 'react';
import { CartReducer, defaultCartState } from './shares';
import { Product, Voucher } from './utils';

export interface Services {
  cart: Product[];
  vouchers: Voucher[];
}

const defaultServicesState: Services = {
  cart: [],
  vouchers: [],
};

export const CartContext = React.createContext<Services>(defaultServicesState);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(CartReducer, defaultCartState);

  useEffect(() => {
    // fetch products
    fetch('https://shielded-wildwood-82973.herokuapp.com/products.json')
      .then(response => response.json())
      .then(data =>
        dispatch({
          type: 'load_products',
          payload: data.products,
        })
      );

    // fetch vouchers
    fetch('https://shielded-wildwood-82973.herokuapp.com/vouchers.json')
      .then(response => response.json())
      .then(data =>
        dispatch({
          type: 'load_vouchers',
          payload: data.vouchers,
        })
      );
  }, []);

  const services = {
    cart: state.cart,
    vouchers: state.vouchers,
  };

  return (
    <CartContext.Provider value={services}>{children}</CartContext.Provider>
  );
};
