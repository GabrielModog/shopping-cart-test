import React from 'react';

import Layout from './components/Layout';
import ProductCards from './components/ProductCards';
import Cart from './components/Cart';

const App: React.FC<any> = () => {
  return (
    <Layout>
      <ProductCards />
      <Cart />
    </Layout>
  );
};

export default App;
