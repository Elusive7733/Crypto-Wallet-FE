import { createSlice } from "@reduxjs/toolkit";

interface IUser {
  name: string | null;
  phoneNumber: string | null;
  email: string | null;
  password: string | null;
  role: any;
  transactions: any;
}

const initialState = {
  name: null,
  phoneNumber: null,
  email: null,
  password: null,
  role: null,
  transactions: [],
} as IUser;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initializeUser(state, action) {
      state.name = action.payload.name;
      state.phoneNumber = action.payload.phoneNumber;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.role = action.payload.role.name;
    },
    setTransactions(state, action) {
      state.transactions = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
