import { TroubleshootTwoTone } from "@mui/icons-material";
import { atom } from "recoil";

export const isSelect = atom({
  key: "inSelect",
  default: TroubleshootTwoTone,
});
export const isView = atom({
  key: "inView",
  default: false,
});
export const isUseText = atom({
  key: "inUseText",
  default: false,
});
export const isUseShape = atom({
  key: "inUseShape",
  default: false,
});
