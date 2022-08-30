import { createSlice } from "@reduxjs/toolkit";
// const localstorage=localStorage

const initialAuthState = {
  apiKey: "AIzaSyDJzFGMehDL_Sv8YBjxCcs1Ox2VjgMBPG4",
  isAuthenticated: false,
  idToken: '',
  email: '',
  isEmailVerified: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.idToken = action.payload;

    },

    logout(state) {
      state.isAuthenticated = false;
    },

    setEmail(state, action) {
      state.email = action.payload;
    },

    setIsEmailVerified(state, action) {
      state.isEmailVerified = action.payload;
    }
    
  }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;