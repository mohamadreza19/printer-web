import { useEffect } from "react";
import languageAction from "../recoil/actions/languageAction";
import useLanguageReducer from "../recoil/reducer/useLanguageReducer";
import useCachedLanguage from "./useCachedLanguage";

export default function () {
  const set = useLanguageReducer();
  const cachedLanguage = useCachedLanguage();

  useEffect(() => {
    const action = {
      type: languageAction.CHANGE_LANUAGE,
      payload: cachedLanguage.value || "fa",
    };
    set(action);
  }, [cachedLanguage.value]);
}
