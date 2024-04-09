import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = newItem
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // payload = pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      // payload = pizzaId
      const incItem = state.cart.find(
        (pizza) => pizza.pizzaId === action.payload,
      );
      incItem.quantity++;
      incItem.totalPrice = incItem.unitPrice * incItem.quantity;
    },
    decreaseItemQuantity(state, action) {
      // payload = pizzaId
      const incItem = state.cart.find(
        (pizza) => pizza.pizzaId === action.payload,
      );
      incItem.quantity--;
      incItem.totalPrice = incItem.unitPrice * incItem.quantity;

      // when the quantity is 0
      if (incItem.quantity === 0) {
        cartSlice.caseReducers.deleteItem(state, action);
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

/////////////////////////////////////[Selector Function]

export const getCart = (store) => store.cart.cart;

export const getTotalCartPrice = (store) =>
  store.cart.cart
    .map((pizza) => pizza.totalPrice)
    .reduce((curval, accum) => {
      return curval + accum;
    }, 0);

export const getTotalCartQuantity = (store) =>
  store.cart.cart
    .map((pizza) => pizza.quantity)
    .reduce((curval, accum) => curval + accum, 0);

export const getCurrentQuantityById = (id) => (store) =>
  store.cart.cart.find((pizza) => pizza.pizzaId === id)?.quantity ?? 0;
