import React from 'react';
import { OnCart } from '../../services/shares';
import { Product } from '../../services/utils';

import './styles.css';

interface OnCartInfo {
  data: OnCart;
}

const Cart: React.FC<OnCartInfo> = ({ data }: OnCartInfo) => {
  return (
    <div className="shopping-cart">
      {data.products.map((product: Product) => (
        <div key={product.id} className="shopping-cart-item">
          <div className="shopping-cart-item-placeholder" />
          <div className="shopping-cart-item__content">
            <h3>{product.name}</h3>
            <div>
              <h5>
                Quantity: {product.available} - ${product.price}
              </h5>
            </div>
          </div>
          <div className="shopping-cart-item__actions">
            <button type="button">+</button>
            <button type="button">-</button>
          </div>
        </div>
      ))}
      <div className="shopping-cart-vourchers">
        <input type="text" placeholder="Descount" />
        <button type="button">Apply</button>
      </div>
      <div className="shopping-cart-info">
        <div className="shopping-cart-info__content">
          <h5>Subtotal</h5>
          <h5>{data.subtotal}</h5>
        </div>
        <div className="shopping-cart-info__content">
          <h5>Shipping</h5>
          <h5>$ 123,23</h5>
        </div>
        <div className="shopping-cart-info__content">
          <h5>Descount</h5>
          <h5>$ 123,23</h5>
        </div>
        <div className="shopping-cart-info__content">
          <h5>Total</h5>
          <h5>$ 123,23</h5>
        </div>
      </div>
      <div className="shopping-cart-checkout">
        <button type="submit">CHECKOUT</button>
      </div>
    </div>
  );
};

export default Cart;
