import React, { useContext } from 'react';

import Layout from './components/Layout';
import { CartContext } from './services';

import ProductCards from './components/ProductCards';
import Cart from './components/Cart';

const App: React.FC<any> = () => {
  const { cart } = useContext(CartContext);

  return (
    <Layout>
      <ProductCards cart={cart} />
      <Cart />
    </Layout>
  );
};

export default App;
