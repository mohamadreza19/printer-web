import { createSlice } from "@reduxjs/toolkit";

const railsSlice = createSlice({
  name: "rails",
  initialState: {
    projectName: "",
    rails: [],
  },

  reducers: {
    addRails(state, action) {
      state.rails = action.payload;
    },
  },
});

export const { addRails } = railsSlice.actions;

export default railsSlice.reducer;
