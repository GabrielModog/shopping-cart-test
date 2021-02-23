import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';

import { CartContext } from '../../services';
import { Product, Voucher } from '../../services/utils';

import './styles.css';

const Cart: React.FC<any> = () => {
  const [textDescount, setTextDescount] = useState('');
  const {
    vouchers,
    onCart,
    increaseProduct,
    decrementProduct,
    loadVoucher,
  } = useContext(CartContext);

  const textDescountOnChanges = () => (evt: { target: HTMLInputElement }) => {
    setTextDescount(evt.target.value);
  };

  const handlerVoucherCall = () => {
    if (textDescount === '' || onCart.products.length <= 0)
      return toast.error(
        'Descount field is empty. Or dont have any products in the Cart.'
      );

    if (!vouchers.list.some((item: Voucher) => item.code === textDescount)) {
      toast.error('This voucher is not available anymore...', {
        position: 'top-right',
      });

      return setTextDescount('');
    }

    const voucher: any = vouchers.list.find(
      (item: Voucher) => item.code === textDescount
    );

    toast.info('Applying voucher...', {
      position: 'top-right',
    });

    loadVoucher(voucher);
  };

  const checkoutSubmit = () =>
    onCart.total > 0
      ? toast.success('Ready to shipping....')
      : toast.error('The cart is empty');

  return (
    <div className="shopping-cart">
      {onCart.products.map((product: Product) => (
        <div
          id={`onCart${product.name}`}
          key={product.id}
          className="shopping-cart-item"
        >
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
            <button
              id={`increment${product.name}`}
              name={`increment${product.name}`}
              type="button"
              onClick={() => increaseProduct(product.id)}
            >
              +
            </button>
            <button
              id={`decrement${product.name}`}
              name={`decrement${product.name}`}
              type="button"
              onClick={() => decrementProduct(product.id)}
            >
              -
            </button>
          </div>
        </div>
      ))}
      <div className="shopping-cart-vourchers">
        {vouchers.error ? (
          <h5 className="shipping-cart-vouchers__empty">
            don&#39;t have any descounts coupon disponible.
          </h5>
        ) : (
          <>
            <input
              type="text"
              placeholder={
                vouchers.loading ? 'Loading vouchers...' : 'Descounts...'
              }
              id="descountField"
              name="descountField"
              value={textDescount}
              onChange={textDescountOnChanges()}
            />
            <button
              id="applyVoucher"
              name="applyVoucher"
              type="button"
              onClick={handlerVoucherCall}
            >
              {vouchers.loading ? 'Loading...' : 'Apply'}
            </button>
          </>
        )}
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
          <h5>$ {onCart.descount}</h5>
        </div>
        <div className="shopping-cart-info__content">
          <h5>
            <b>Total</b>
          </h5>
          <h5>
            <b>$ {onCart.total}</b>
          </h5>
        </div>
      </div>
      <div className="shopping-cart-checkout">
        <button
          id="checkout"
          name="checkout"
          type="submit"
          onClick={checkoutSubmit}
        >
          CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default Cart;
