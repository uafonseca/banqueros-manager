import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

export const userSlice = createSlice({
  name: "userStore",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
    },

    setToken: (state, action) => {
      state.token = action.payload.token;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setToken } = userSlice.actions;

export default userSlice.reducer;
