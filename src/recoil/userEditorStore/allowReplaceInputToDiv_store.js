import { atom } from "recoil";

const allowReplaceInputToDiv = atom({
  key: "allowRemoveCustomLabelsBorderToScreen",
  default: false,
});

export default allowReplaceInputToDiv;
