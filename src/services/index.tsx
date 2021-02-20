import React, { ReactNode, useReducer } from 'react';
import { CartReducer, defaultCartState } from './shares';
import { Product, Voucher } from './utils';

export interface Services {
  products: Product[];
  vouchers: Voucher[];
}

const defaultServicesState: Services = {
  products: [],
  vouchers: [],
};

export const CartContext = React.createContext<Services | null>(
  defaultServicesState
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(CartReducer, defaultCartState);

  return <CartContext.Provider value={null}>{children}</CartContext.Provider>;
};
