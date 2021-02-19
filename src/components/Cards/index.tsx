import React from 'react';
import { Product } from '../../services/utils';

import './styles.css';

interface ICards {
  data: Array<Product>;
}

const Cards: React.FC<ICards> = ({ data }: ICards) => {
  return (
    <div className="cards">
      {data.map((item: any) => (
        <div key={item.id} className="card-item">
          <div className="card-item-placeholder" />
          <div className="card-item__content">
            <h3>{item.name}</h3>
            <h4>$ {item.price}</h4>
            <h5>LEFT: {item.available}</h5>
          </div>
          <div className="card-item__checkout">
            <button type="button">ADD TO CART</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
