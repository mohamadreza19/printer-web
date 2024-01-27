import { createSlice } from "@reduxjs/toolkit";

const editor = createSlice({
  name: "editor",
  initialState: {
    projectName: "",
    rails: [],
  },

  reducers: {
    fetch(state, action) {
      state.rails = action.payload;
    },
  },
});

export default editor.reducer;
