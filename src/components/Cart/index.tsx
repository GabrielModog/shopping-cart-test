import React, { useContext } from 'react';
import { CartContext } from '../../services';
import { Product } from '../../services/utils';

import './styles.css';

const Cart: React.FC<any> = () => {
  const { onCart, increaseProduct, decrementProduct } = useContext(CartContext);

  return (
    <div className="shopping-cart">
      {onCart.products.map((product: Product) => (
        <div key={product.id} className="shopping-cart-item">
          <div className="shopping-cart-item-placeholder" />
          <div className="shopping-cart-item__content">
            <h3>{product.name}</h3>
            <div>
              <h5>
                Quantity: {product.quantity} - ${product.price}
              </h5>
            </div>
          </div>
          <div className="shopping-cart-item__actions">
            <button type="button" onClick={() => increaseProduct(product.id)}>
              +
            </button>
            <button type="button" onClick={() => decrementProduct(product.id)}>
              -
            </button>
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
          <h5>$ {onCart.subtotal}</h5>
        </div>
        <div className="shopping-cart-info__content">
          <h5>Shipping</h5>
          <h5>$ {onCart.shippingCosts}</h5>
        </div>
        <div className="shopping-cart-info__content">
          <h5>Descount</h5>
          <h5>$ {onCart.withDescounts}</h5>
        </div>
        <div className="shopping-cart-info__content">
          <h5>Total</h5>
          <h5>$ {onCart.total}</h5>
        </div>
      </div>
      <div className="shopping-cart-checkout">
        <button type="submit">CHECKOUT</button>
      </div>
    </div>
  );
};

export default Cart;
