import { atom } from "recoil";

export const isSelect = atom({
  key: "inSelect",
  default: false,
});
export const isView = atom({
  key: "inView",
  default: true,
});
export const isUseText = atom({
  key: "inUseText",
  default: false,
});
export const isUseShape = atom({
  key: "inUseShape",
  default: false,
});
