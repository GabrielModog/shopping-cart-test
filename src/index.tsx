import React from 'react';
import ReactDOM from 'react-dom';

import './global.css';
import App from './App';

import { CartProvider } from './services';

ReactDOM.render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
