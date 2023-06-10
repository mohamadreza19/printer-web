import { atom } from "recoil";

export const ColumnOne_splitRow = atom({
  key: "splitRow",
  default: false,
});
export const ColumnOne_joinRow = atom({
  key: "joinRow",
  default: false,
});
export const ColumnOne_splitColumn = atom({
  key: "splitColumn",
  default: false,
});
export const ColumnOne_joinColumn = atom({
  key: "joinColumn",
  default: false,
});

export const ColumnTwo_font = atom({
  key: "font",
  default: {
    isShow: false,
    font: "arial",
    isOnClick: false,
  },
});
export const ColumnTwo_TextAlign = atom({
  key: "textRight",
  default: {
    chosenAlign: "center",
    isUsed: false,
  },
});

export const ColumnThree_FontStyle = atom({
  key: "fontStyle",
  default: {
    chosenStyle: "regular",
    isUsed: false,
  },
});
export const ColumnThree_fontSize = atom({
  // action can be incremnt & decrement &
  key: "fontSize",
  default: {
    chosenAction: "none",
    isUsed: false,
  },
});
export const ColumnThree_angle = atom({
  key: "angle",
  default: {
    chosenAction: "none",
    isUsed: false,
  },
});
export const ColumnThree_margin = atom({
  key: "margin",
  default: {
    chosenAction: "none",
    isUsed: false,
  },
});
export const ColumnThree_padding = atom({
  key: "padding",
  default: {
    chosenAction: "none",
    isUsed: false,
  },
});

export const ColumnFour_redo = atom({
  key: "redo",
  default: false,
});
export const ColumnFour_undo = atom({
  key: "undo",
  default: false,
});
export const ColumnFour_justify_start = atom({
  key: "justify_start",
  default: "left",
});
// export const ColumnFour_justify_end = atom({
//   key: "justify_end",
//   default: false,
// });
export const ColumnFive_delete = atom({
  key: "delete",
  default: false,
});
export const ColumnFive_duplicate = atom({
  key: "duplicate",
  default: false,
});
export const ColumnFive_barcode = atom({
  key: "barcode",
  default: false,
});
export const ColumnFive_qr = atom({
  key: "qrcode ",
  default: false,
});
