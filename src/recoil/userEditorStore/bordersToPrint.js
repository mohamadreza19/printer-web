import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";

export const bordersToPrint_state = atom({
  key: "bordersToPrint",
  default: "NONE", //NONE, ALL, HORIZONTAL, VERTICAL
});

export const useBorderToProntValue = () => {
  const bordersToPrint = useRecoilValue(bordersToPrint_state);

  return bordersToPrint;
};
export const useSetBorderToProntState = () => {
  const setBordersToPrint = useSetRecoilState(bordersToPrint_state);

  return setBordersToPrint;
};
