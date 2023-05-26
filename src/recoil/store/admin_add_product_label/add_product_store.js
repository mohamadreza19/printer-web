import { atom } from "recoil";

export const productName_store = atom({
  key: "add-product/productName",
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
export const additionalInfo_store = atom({
  key: "add-product/additionalInfo",
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
  },
});
export const productLink_store = atom({
  key: "add-product/productLink",
  default: {
    value: "",
    validateErr: "",
  },
});
export const width_store = atom({
  key: "add-product/width",
  default: {
    value: "",
    validateErr: "",
  },
});
export const widthOfPrintingArea_store = atom({
  key: "add-product/widthOfPrintingArea",
  default: {
    value: "",
    validateErr: "",
  },
});
export const picture_store = atom({
  key: "add-product/image",
  default: {
    file: "",
    previewUrl: "",
    validateErr: "",
  },
});
