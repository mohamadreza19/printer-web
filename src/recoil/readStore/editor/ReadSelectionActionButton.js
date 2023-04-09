import { useRecoilValue } from "recoil";
import {
  isSelect,
  isUseShape,
  isUseText,
  isView,
} from "../../userEditorStore/selectionButtonsStore/actionButton";

export const useSelection = () => {
  return useRecoilValue(isSelect);
};
export const useView = () => {
  return useRecoilValue(isView);
};
export const useUseText = () => {
  return useRecoilValue(isUseText);
};
export const useUseShape = () => {
  return useRecoilValue(isUseShape);
};
