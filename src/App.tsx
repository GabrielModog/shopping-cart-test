import React from 'react';
import Cards from './components/Cards';
import Cart from './components/Cart';

import Layout from './components/Layout';
import { Product } from './services/utils';

const data: Array<Product> = [
  {
    id: 1,
    name: 'product1',
    price: 123.5,
    available: 4,
  },
  {
    id: 2,
    name: 'product2',
    price: 123.5,
    available: 4,
  },
  {
    id: 3,
    name: 'product3',
    price: 123.5,
    available: 4,
  },
  {
    id: 4,
    name: 'product4',
    price: 123.5,
    available: 4,
  },
];

const App: React.FC<any> = () => (
  <Layout>
    <Cards data={data} />
    <Cart />
  </Layout>
);

export default App;
