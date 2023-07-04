import { createSlice } from "@reduxjs/toolkit";

interface ICoin {
  coinHistory: any;
  exchangeRate: number;
}

const initialState = {
  coinHistory: [],
  exchangeRate: 187.41,
} as unknown as ICoin;

const coinSlice = createSlice({
  name: "coin",
  initialState,
  reducers: {
    setCoinHistory(state, action) {
      state.coinHistory = action.payload;
    },
    setExchangeRate(state, action) {
      state.exchangeRate = action.payload;
    },
  },
});

export const coinActions = coinSlice.actions;
export default coinSlice.reducer;
