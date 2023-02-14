import { useSetRecoilState } from "recoil";
import languageAction from "../actions/languageAction";
import { language } from "../recoilStore";

export default function () {
  const setLanguage = useSetRecoilState(language);
  return (action = { type: "", payload: "" }) => {
    if (!action.type || !action.payload) throw new Error("is undefined");
    switch (action.type) {
      case languageAction.CHANGE_LANUAGE:
        setLanguage(action.payload);
        break;
    }
  };
}
