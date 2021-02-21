import React, { useContext } from 'react';

import Layout from './components/Layout';
import { CartContext } from './services';

import ProductCards from './components/ProductCards';
import Cart from './components/Cart';

const App: React.FC<any> = () => {
  const { cart, onCart } = useContext(CartContext);

  return (
    <Layout>
      <ProductCards cart={cart} />
      <Cart data={onCart} />
    </Layout>
  );
};

export default App;
