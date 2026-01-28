import { useContext } from 'react';
import Modal from './UI/Modal';
import CartContext from '../store/cartContext';
import { currencyFormatter } from '../utils/formatting';
import Button from './UI/Button';
import UserProgressContext from '../store/UserProgressContext';

export default function Cart() {
  const { items } = useContext(CartContext);
  const { progress } = useContext(UserProgressContext);

  const cartTotal = items.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0,
  );

  return (
    <Modal className="cart" open={progress === 'cart'}>
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity}
          </li>
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly>Close</Button>
        <Button>Go to Checkout</Button>
      </p>
    </Modal>
  );
}
