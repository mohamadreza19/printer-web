import { createSlice } from "@reduxjs/toolkit";
import { edit_event_sliceCaseReducers } from "./edit_event_slice";

const edit_mode_slice = createSlice({
  name: "edit_mode",
  initialState: "VIEW_MODE",

  reducers: {
    selectMode() {
      return "SELECT_MODE";
    },
    viewMode() {
      edit_event_sliceCaseReducers.addEditEvent({
        type: "UN_SELECT",
      });
      return "VIEW_MODE";
    },
  },
});

export const { selectMode, viewMode } = edit_mode_slice.actions;

export const getEditMode = (state) => state.editMode;

export default edit_mode_slice.reducer;
