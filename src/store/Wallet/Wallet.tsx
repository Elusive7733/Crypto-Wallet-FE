import { createSlice } from "@reduxjs/toolkit";

interface prices {
  title: string;
  label: string;
  value: number;
}

interface IWallet {
  address: string | null;
  balance: number | null;
  coins: any;
  prices: Array<prices>;
}

const initialState = {
  address: null,
  balance: null,
  coins: [],
  prices: [],
} as unknown as IWallet;

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    initializeWallet(state, action) {
      state.address = action.payload.address;
      state.coins = action.payload.coins;
    },
    setCoins(state, action) {
      state.coins = action.payload;
    },
    setBalance(state, action) {
      state.balance = action.payload;
    },
    appendBalance(state, action) {
      state.balance += action.payload;
    },
    resetWallet(state) {
      state.address = null;
      state.balance = null;
      state.coins = [];
      state.prices = [];
    },
    setCoinPrices(state, action) {
      state.prices = action.payload;
    },
    appendCoinPrices(state, action) {
      state.prices.push(action.payload);
    },
  },
});

export const walletActions = walletSlice.actions;
export default walletSlice.reducer;
