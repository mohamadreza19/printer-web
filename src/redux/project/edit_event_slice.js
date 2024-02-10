import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  type: "",
  value: "",
  id: "",
};

const edit_event_slice = createSlice({
  name: "edite_event",
  initialState,
  reducers: {
    addEditEvent(state, action) {
      return initialState;
    },
  },
});

export const { addEditEvent } = edit_event_slice.actions;
//
export const edit_event_sliceCaseReducers = edit_event_slice.caseReducers;
export default edit_event_slice.reducer;
