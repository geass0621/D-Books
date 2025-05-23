import { createSlice } from "@reduxjs/toolkit";
import { User } from "../models/UserModel";
import { RootState } from "./store";


const initialState: User = {
  email: null,
  id: null,
  role: null,
  status: 'offline'
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserLogin(state, action) {
      const user = action.payload as User;
      state.email = user.email;
      state.id = user.id;
      state.role = user.role;
      state.status = 'online';
    },
    setUserLogout(state) {
      state.email = null,
        state.id = null,
        state.role = null,
        state.status = 'offline'
    }
  }
});

export const userActions = userSlice.actions;
export const selectUser = ((state: RootState) => state.user);

export default userSlice.reducer;