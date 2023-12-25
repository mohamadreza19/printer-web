import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const project = createSlice({
  name: "project",
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

export const { fetch } = project.actions;

export default project.reducer;
