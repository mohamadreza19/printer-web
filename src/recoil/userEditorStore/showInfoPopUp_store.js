import { atom, useRecoilState } from "recoil";

export const showInfoPopUp_store = atom({
  key: "showInfoPopUp",
  default: false,
});

export function useShowInfoPopUp_reducer(action = "") {
  const [showInfoPopUp, setShowInfoPopUp] = useRecoilState(showInfoPopUp_store);
  // if (action == "SHOW") {
  //   setShowInfoPopUp(true);
  // }
  // if (action == "UNSHOW") {
  //   setShowInfoPopUp(false);
  // }
  return {
    SHOW: () => setShowInfoPopUp(true),
    UNSHOW: () => setShowInfoPopUp(false),
  };
}
