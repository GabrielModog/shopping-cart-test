import React, { useContext } from 'react';

import { CartContext } from '../../services';

import './styles.css';

const ProductCards: React.FC<any> = () => {
  const { cart, addProductToCart } = useContext(CartContext);

  return (
    <div className="cards">
      {cart.loading && <h3>Loading...</h3>}
      {!cart.error ? (
        cart.products.map((item: any) => (
          <div key={item.id} className="card-item">
            <div className="card-item-placeholder" />
            <div className="card-item__content">
              <h3>{item.name}</h3>
              <h4>$ {item.price}</h4>
              <h5>LEFT: {item.available}</h5>
            </div>
            <div className="card-item__add">
              <button
                id="addProductToCartBtn"
                name="addProductToCartBtn"
                type="button"
                onClick={() => addProductToCart(item)}
              >
                ADD TO CART
              </button>
            </div>
          </div>
        ))
      ) : (
        // eslint-disable-next-line react/no-unescaped-entities
        <h3>Don't have any products available.</h3>
      )}
    </div>
  );
};

export default ProductCards;
