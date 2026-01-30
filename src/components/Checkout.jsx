import { useContext } from 'react';
import Modal from './UI/Modal';
import CartContext from '../store/cartContext';
import { currencyFormatter } from '../utils/formatting';
import Input from './UI/Input';
import Button from './UI/Button';
import UserProgressContext from '../store/UserProgressContext';

export default function Checkout() {
  const { items } = useContext(CartContext);
  const { hideCheckout, progress } = useContext(UserProgressContext);

  const totalPrice = items.reduce(
    (totalItem, item) => totalItem + item.quantity * item.price,
    0,
  );

  function handleCloseCheckout() {
    hideCheckout();
  }

  return (
    <Modal
      open={progress === 'checkout'}
      className="checkout"
      onClose={handleCloseCheckout}
    >
      <form action="">
        <h2>Checkout</h2>
        <p>Total amount: {currencyFormatter.format(totalPrice)}</p>

        <Input label="Full Name" type="text" id="name" />
        <Input label="Email Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        <p className="modal-actions">
          <Button onClick={handleCloseCheckout} type="button" textOnly>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}
