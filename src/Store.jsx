import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import cartSlice from "./features/cart/cartSlice";
const Store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
  },
});

export default Store;
