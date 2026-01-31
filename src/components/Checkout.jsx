import { useContext } from 'react';
import Modal from './UI/Modal';
import CartContext from '../store/cartContext';
import { currencyFormatter } from '../utils/formatting';
import Input from './UI/Input';
import Button from './UI/Button';
import UserProgressContext from '../store/UserProgressContext';
import useHttp from '../hooks/useHttp';
import Error from './Error';
import { useActionState } from 'react';

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

export default function Checkout() {
  const { items, clearCart } = useContext(CartContext);
  const { hideCheckout, progress } = useContext(UserProgressContext);
  const { data, error, sendRequest, clearData } = useHttp(
    'http://localhost:3000/orders',
    requestConfig,
  );

  const totalPrice = items.reduce(
    (totalItem, item) => totalItem + item.quantity * item.price,
    0,
  );

  function handleCloseCheckout() {
    hideCheckout();
  }

  function handleFinish() {
    hideCheckout();
    clearCart();
    clearData();
  }

  async function checkoutAction(prevState, fd) {
    const customerData = Object.fromEntries(fd.entries());

    await sendRequest(
      JSON.stringify({
        order: {
          items,
          customer: customerData,
        },
      }),
    );
  }

  const [formState, formAction, isSending] = useActionState(
    checkoutAction,
    null,
  );

  let action = (
    <>
      <Button onClick={handleCloseCheckout} type="button" textOnly>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    action = <span>Sending data...</span>;
  }

  if (data && !error) {
    return (
      <Modal open={progress === 'checkout'} onClose={handleFinish}>
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      open={progress === 'checkout'}
      className="checkout"
      onClose={handleCloseCheckout}
    >
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total amount: {currencyFormatter.format(totalPrice)}</p>

        <Input label="Full Name" type="text" id="name" />
        <Input label="Email Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        {error && <Error title={'Failed to submit order'} message={error} />}

        <p className="modal-actions">{action}</p>
      </form>
    </Modal>
  );
}
