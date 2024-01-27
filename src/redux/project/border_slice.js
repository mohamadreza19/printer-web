import { createSlice } from "@reduxjs/toolkit";

const border_slice = createSlice({
  name: "borderToPrint",
  initialState: {
    type: "none", // use | none
    value: "NONE", //NONE, ALL, HORIZONTAL, VERTICAL
  },
  reducers: {
    addBorderEvent(state, action) {
      return action.payload;
    },
    changeType(state, action) {
      console.log({ action });
      state.type = action.payload;
    },
  },
});

export const { addBorderEvent, changeType } = border_slice.actions;

//
export const getBorderToPrint = (state) => state.customLabelsBorder;

export default border_slice.reducer;
