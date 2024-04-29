import { createSlice } from '@reduxjs/toolkit';

const selectedCell = createSlice({
  name: 'selectedCell',
  initialState: {
    frontId: '',
    split: '',
  },
  reducers: {
    addSelectedCell(state, action) {
      return action.payload;
    },
  },
});

export const { addSelectedCell } = selectedCell.actions;

export const getSelectedCell = (state) => state.selectedCell;

export default selectedCell.reducer;
