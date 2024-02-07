import { createSlice } from "@reduxjs/toolkit";

const toastMessage = createSlice({
  name: "rails",
  initialState: {
    type: "",
    message: "",
  },

  reducers: {
    addMessage(state, action) {
      const { type, message } = action.payload;
      state.type = type;
      state.message = message;
    },
  },
});

export const { addMessage } = toastMessage.actions;

export default toastMessage.reducer;
