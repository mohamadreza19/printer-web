import { atom } from "recoil";

export const labelName_store = atom({
  key: "labelName_store",
  default: {
    persian: {
      value: "",
      isShow: true,
    },
    english: {
      value: "",
      isShow: false,
    },
    turkish: {
      value: "",
      isShow: false,
    },
    validateErr: "",
  },
});
export const width_store = atom({
  key: "labelWidth_store",
  default: {
    value: 0,
    validateErr: "",
  },
});
export const height_store = atom({
  key: "labelHeight_store",
  default: {
    value: 0,
    validateErr: "",
  },
});
export const picture_store = atom({
  key: "picture_store",
  default: {
    file: "",
    validateErr: "",
  },
});
