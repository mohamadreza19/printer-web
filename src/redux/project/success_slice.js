import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle", // idle | success
  type: "none", // edit | add
  body: {},
  onBack: () => {},
};

const success_slice = createSlice({
  name: "success_slice",
  initialState,

  reducers: {
    addSuccess(state, action) {
      const { body, onBack, status, type } = action.payload;
      console.log(action.payload);
      state.body = body;
      state.onBack = onBack;
      state.status = status;
      state.type = type;
    },
    clearSuccess() {
      return initialState;
    },
  },
});

export const getEditSussess = (state) => state.projectSuccess;
export const getEditSussessStatus = (state) => state.projectSuccess.status;

export const { addSuccess, clearSuccess } = success_slice.actions;

export default success_slice.reducer;
