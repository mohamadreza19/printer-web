import { atom, useRecoilState } from "recoil";

export const isShowSymbol_store = atom({
  key: "isShowSymbol",
  default: {
    isShow: false,
  },
});
export const symbolUsed_store = atom({
  key: "symbolUsed",
  default: {
    payload: "",
    isUsed: false,
  },
});
export const symbolList_store = atom({
  key: "symbolList",
  default: [],
});
export function useShowSymbolPopUp_reducer(action = "") {
  const [showSymbol, setShowSymbol] = useRecoilState(isShowSymbol_store);
  // if (action == "SHOW") {
  //   setShowInfoPopUp(true);
  // }
  // if (action == "UNSHOW") {
  //   setShowInfoPopUp(false);
  // }
  return {
    TOGGLE: () =>
      setShowSymbol((draft) => ({ ...draft, isShow: !draft.isShow })),
    SHOW: () => setShowSymbol((draft) => ({ ...draft, isShow: true })),
    UNSHOW: () => setShowSymbol((draft) => ({ ...draft, isShow: false })),
  };
}
