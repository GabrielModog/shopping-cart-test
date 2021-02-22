import React from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import Layout from './components/Layout';
import ProductCards from './components/ProductCards';
import Cart from './components/Cart';

const App: React.FC<any> = () => {
  return (
    <Layout>
      <ProductCards />
      <Cart />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Layout>
  );
};

export default App;
