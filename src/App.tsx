import React, { useContext } from 'react';

import Layout from './components/Layout';
import { CartContext } from './services';

import Cards from './components/Cards';
import Cart from './components/Cart';

const App: React.FC<any> = () => {
  const { cart } = useContext(CartContext);

  return (
    <Layout>
      <Cards data={cart} />
      <Cart />
    </Layout>
  );
};

export default App;
