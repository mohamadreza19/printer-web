import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cellIds: [],
  mostRailIdRepeat: "",
};
const muiti_selectCell_slice = createSlice({
  name: "muiti_selectCell",
  initialState,
  reducers: {
    addMultiCell(state, action) {
      return action.payload;
    },
    reInital(state, action) {
      console.log("hi");
      return initialState;
    },
    joinCustomLabels(state, action) {
      return state;
    },
  },
});

export const { addMultiCell, joinCustomLabels } =
  muiti_selectCell_slice.actions;

export const getMutliSelectCellsLength = (state) =>
  state.muitiSelectCell.cellIds.length;
export const getMutliSelectCells = (state) => state.muitiSelectCell;

export default muiti_selectCell_slice.reducer;

export const muiti_selectCell_caseReducers =
  muiti_selectCell_slice.caseReducers;
