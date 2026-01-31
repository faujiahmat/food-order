import { createContext, useReducer } from 'react';

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

function cartReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id,
    );

    const updateItems = [...state.items];

    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];

      const updateItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };

      updateItems[existingCartItemIndex] = updateItem;
    } else {
      updateItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updateItems };
  }

  if (action.type === 'REMOVE_ITEM') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id,
    );

    let updateItems = [...state.items];

    const existingItem = state.items[existingCartItemIndex];
    if (existingItem.quantity > 1) {
      const updateItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };

      updateItems[existingCartItemIndex] = updateItem;
    } else {
      updateItems = updateItems.filter((item) => item.id !== action.id);
    }

    return { ...state, items: updateItems };
  }

  if (action.type === 'CLEAR_CART') {
    return { ...state, items: [] };
  }

  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCartAction({ type: 'ADD_ITEM', item });
  }

  function removeItem(id) {
    dispatchCartAction({ type: 'REMOVE_ITEM', id });
  }

  function clearCart() {
    dispatchCartAction({ type: 'CLEAR_CART' });
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };

  return <CartContext value={cartContext}>{children}</CartContext>;
}

export default CartContext;
