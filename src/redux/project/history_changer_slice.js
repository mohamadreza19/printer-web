import { createSlice, current } from "@reduxjs/toolkit";
import shortid from "shortid";
import { addEditEvent } from "./edit_event_slice";
import {
  PayloadCenter,
  Rails,
  SelectParntAndChilds,
} from "../../utility/editor-tools";
import {
  addMultiCell,
  joinCustomLabels,
  muiti_selectCell_caseReducers,
} from "./multi_selectCell_slice";

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
    removeRail(state, action) {
      const frontId = action.payload.frontId;

      const filterdRail = state.present.filter(
        (rail) => rail.frontId !== frontId
      );
      state.present = filterdRail;
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
  extraReducers: (builder) => {
    builder.addCase(addEditEvent.type, (state, action) => {
      const presentRails = current(state.present);
      console.log(action.payload.itemId);
      console.log(action.payload.type);

      const event = {
        type: action.payload.type,
        itemId: action.payload.itemId,
        value: action.payload.value,
        symbolId: action.payload.symbolId,
      };

      PayloadCenter.setEvent(event);

      const mutateRails = new Rails(presentRails).railsArr;

      state.present = mutateRails;
      if (event.type !== "SELECT") {
        state.past = [...state.past, state.present];
      }
    });
    builder.addCase(addMultiCell.type, (state, action) => {
      const { cellIds, mostRailIdRepeat } = action.payload;
      const currentState = current(state);
      state.present = currentState.present.map((rail) => {
        if (rail.frontId === mostRailIdRepeat) {
          return {
            ...rail,
            customLabels: customLabelsHandeler(rail.customLabels, cellIds),
          };
        }
        return rail;
      });

      function customLabelsHandeler(customLabels = [], cellIds = []) {
        const newCustomLabels = customLabels.map((customLabel, index) => {
          for (let t = 0; t < cellIds.length; t++) {
            if (customLabel.frontId === cellIds[t]) {
              return {
                ...customLabel,
                structure: new SelectParntAndChilds(
                  customLabel.structure
                ).getNewStructure(),
              };
            }
          }

          return customLabel;
        });

        return newCustomLabels;
      }
    });
    builder.addCase(joinCustomLabels.type, (state, action) => {
      const { cellIds, mostRailIdRepeat } = action.payload;

      state.present = current(state).present.map((rail) => {
        if (rail.frontId === mostRailIdRepeat) {
          return {
            ...rail,
            customLabels: customLabelsHandeler(rail.customLabels, cellIds),
          };
        }
        return rail;
      });
      muiti_selectCell_caseReducers.reInital();
      function customLabelsHandeler(customLabels = [], cellIds = []) {
        let heights = 0;
        let bigestWigth = 0;
        let firstCellIndex;
        let isZeroIndexIncludes = false;
        let newCustomLabel;
        const clearedCustomLabels = customLabels
          .map((customLabel, index) => {
            for (let t = 0; t < cellIds.length; t++) {
              if (customLabel.frontId === cellIds[t]) {
                if (!firstCellIndex) {
                  if (index === 0) {
                    isZeroIndexIncludes = true;
                  }
                  firstCellIndex = index;
                }
                heights += customLabel.height;
                if (!bigestWigth) {
                  bigestWigth = customLabel.width;
                } else {
                  bigestWigth =
                    customLabel.width > bigestWigth
                      ? customLabel.width
                      : bigestWigth;
                }
                return undefined;
              }
            }

            return customLabel;
          })
          .filter((item) => item !== undefined);

        newCustomLabel = createCustomLabel(heights, bigestWigth);

        const newCustomLabels = [...clearedCustomLabels];
        console.log({ firstCellIndex });
        if (isZeroIndexIncludes) {
          firstCellIndex = firstCellIndex - 1;
        }
        newCustomLabels.splice(firstCellIndex, 0, newCustomLabel);

        // return newCustomLabels;
        return newCustomLabels;
      }
      function createCustomLabel(heights, bigestWigth) {
        const frontId = shortid.generate();

        return {
          frontId: frontId,
          structure: {
            split: "none",
            rootId: frontId,
            content: {
              text: "",
              style: {
                fontFamily: "Arial",
                fontStyle: "regular",
                fontSize: 14,
                angle: 0,
                textAlign: "none",
                textDirecton: "right",
                padding: 0,
                margin: 0,
              },
            },
            frontId: frontId,
            isQrcode: false,
            isBarcode: false,
            isSelected: false,
          },
          width: bigestWigth,
          height: heights,
        };
      }
    });
  },
});

export const {
  addPresent,
  addEmptyRail,
  removeRail,
  redo,
  undo,
  reverseCustomLabels,
} = history_changer_slice.actions;
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
