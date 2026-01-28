import { createContext, useReducer } from 'react';

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
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
      updateItems = updateItems.filter((item) => item.id !== action.item.id);
    }

    return { ...state, items: updateItems };
  }

  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCartAction({ type: 'ADD_ITEM', item });
  }

  function removeItem(id) {
    dispatchCartAction({ type: 'REMOVE_ITEM', item });
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
  };

  return <CartContext value={cartContext}>{children}</CartContext>;
}

export default CartContext;
