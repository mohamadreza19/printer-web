import { createSlice, current } from "@reduxjs/toolkit";
import shortid from "shortid";
import { addEditEvent } from "./edit_event_slice";
import { PayloadCenter, Rails } from "../../utility/editor-tools";

const history_changer_slice = createSlice({
  name: "rails",
  initialState: {
    future: [],
    present: [],
    past: [],
  },

  reducers: {
    addPresent(state, action) {
      state.present = action.payload;
    },
    addEmptyRail(state, action) {
      const number = action.payload || 1;

      for (let i = 0; i < number; i++) {
        const rail = {
          frontId: shortid.generate(),
          customLabels: [],
        };
        state.present.push(rail);
      }
    },
    redo(state) {
      console.log("redoo");
      const { past, future, present } = state;
      return {
        future: future.slice(1),
        present: future[0],
        past: [...past, present],
      };
    },
    undo(state) {
      const { past, future, present } = state;
      return {
        past: past.slice(0, past.length - 1),
        present: past[past.length - 1],
        future: [present, ...future],
      };
    },
    reverseCustomLabels(state) {
      const rails = state.present;
      const mapedRails = rails.map((rail) => {
        if (rail.customLabels.length > 0) {
          const reversedCustomLabels = rail.customLabels.reverse();

          rail.customLabels = reversedCustomLabels;
        }
        return rail;
      });
      console.log({ mapedRails });
      state.present = mapedRails;
    },
  },
  extraReducers: (bulder) => {
    bulder.addCase(addEditEvent.type, (state, action) => {
      const presentRails = current(state.present);
      const event = {
        type: action.payload.type,
        itemId: action.payload.itemId,
        value: action.payload.value,
      };
      PayloadCenter.setEvent(event);
      const mutateRails = new Rails(presentRails).railsArr;

      state.present = mutateRails;
      if (event.type !== "SELECT") {
        state.past = [...state.past, state.present];
      }
    });
  },
});

export const { addPresent, addEmptyRail, redo, undo, reverseCustomLabels } =
  history_changer_slice.actions;
//

export const getRails = (state) => state.historyChanger.history.present;
export const getRailsLength = (state) =>
  state.historyChanger.history.present.length;

export const getPossibleUndo = (state) => {
  const { past } = state.historyChanger.history;
  return past && past.length > 0;
};

export const getPossibleRedo = (state) => {
  const { future } = state.historyChanger.history;
  return future && future.length > 0;
};

export default history_changer_slice.reducer;
