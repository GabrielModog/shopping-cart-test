import React from 'react';
import { ICart } from '../../services/shares';

import './styles.css';

interface IProductCards {
  cart: ICart;
}

const ProductCards: React.FC<IProductCards> = ({ cart }: IProductCards) => {
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
              <button type="button">ADD TO CART</button>
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
