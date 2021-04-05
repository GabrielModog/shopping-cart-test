import React from 'react';

import './styles.css';

interface IProducts {
  data: any;
  render: {
    header?: (item: any, index?: number) => React.ReactNode;
    content: (item: any, index?: number) => React.ReactNode;
  };
}

const Products: React.FC<IProducts> = ({ data, render }: IProducts) => {
  return (
    <div className="cards">
      {data.map((item: any, index: number) => (
        <div key={item.id} className="card-item">
          {render.header ? (
            render.header(item, index)
          ) : (
            <div className="card-item-placeholder" />
          )}

          <div className="card-item__content">
            {render.content(item, index)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
