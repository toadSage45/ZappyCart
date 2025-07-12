import { createSlice } from '@reduxjs/toolkit';

// Load cart items from local storage (outside the slice)
let savedCart = [];
if (typeof window !== "undefined") {
  const cartFromStorage = localStorage.getItem("cart");
  if (cartFromStorage) {
    savedCart = JSON.parse(cartFromStorage);
  }
}

const initialState = {
  cart: savedCart,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    }
  }
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
