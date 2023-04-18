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
export const ColumnTwo_textRight = atom({
  key: "textRight",
  default: false,
});
export const ColumnTwo_textCenter = atom({
  key: "textCenter",
  default: false,
});
export const ColumnTwo_textLeft = atom({
  key: "textLeft",
  default: false,
});
export const ColumnTwo_textUnderline = atom({
  key: "textUnderline",
  default: false,
});
export const ColumnTwo_textItalic = atom({
  key: "textItalic",
  default: false,
});
export const ColumnTwo_textBold = atom({
  key: "textBold",
  default: false,
});
export const ColumnThree_textSize = atom({
  key: "textSize",
  default: 14,
});
export const ColumnThree_angle = atom({
  key: "angle",
  default: 14,
});
export const ColumnThree_cubeSpace = atom({
  key: "cubeSpace",
  default: 14,
});
export const ColumnThree_text = atom({
  key: "text",
  default: 14,
});
export const ColumnFour_redo = atom({
  key: "redo",
  default: false,
});
export const ColumnFour_undo = atom({
  key: "undo",
  default: false,
});
export const ColumnFour_RightToLeft = atom({
  key: "RightToLeft",
  default: false,
});
export const ColumnFour_LeftToRight = atom({
  key: "LeftToRight",
  default: false,
});
export const ColumnFive_delete = atom({
  key: "delete",
  default: false,
});
export const ColumnFive_duplicate = atom({
  key: "duplicate",
  default: false,
});
export const ColumnFive_OneTwo = atom({
  key: "OneTwo",
  default: false,
});
export const ColumnFive_barcode = atom({
  key: "barcode ",
  default: false,
});
