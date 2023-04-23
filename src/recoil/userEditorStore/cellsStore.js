import { atom, selector } from "recoil";
import shortid from "shortid";
export const cells = atom({
  key: "cells",
  default: [
    {
      id: shortid.generate(),
      split: "none",
      content: {
        values: "",
        style: {
          fontFamily: "Arial",
          fontSize: "14",
          angle: "0",
          textAlign: "none",
          fontStyle: "regular",
          margin: 0,
          padding: 0,
        },
      },
      isSelected: false,
    },
  ],
});
const initialState = [
  {
    id: shortid.generate(),
    split: "none",
    content: {
      values: "",
      style: {
        fontFamily: "Arial",
        fontSize: "14",
        angle: "0",
        textAlign: "none",
        fontStyle: "regular",
        margin: 0,
        padding: 0,
      },
    },
    isSelected: false,
  },
  {
    id: shortid.generate(),
    split: "none",
    content: {
      values: "zc",
      style: {
        fontFamily: "Arial",
        fontSize: "14",
        angle: "0",
        textAlign: "none",
        fontStyle: "regular",
        margin: 0,
        padding: 0,
      },
    },
    isSelected: false,
  },
];
export const cells_history = atom({
  key: "cells_history",
  default: {
    past: [],
    present: initialState,
    future: [],
  },
});
export const selectedCellForReadStyle = atom({
  key: "selectedRootCell",
  default: {
    fontFamily: "",
    textAlign: "none",
    margin: 0,
  },
});
