import { useEffect } from "react";
import languageAction from "../recoil/actions/languageAction";
import useLanguageReducer from "../recoil/reducer/useLanguageReducer";
import useCachedLanguage from "./useCachedLanguage";
import { useTranslation } from "react-i18next";

export default function () {
  const set = useLanguageReducer();
  const cachedLanguage = useCachedLanguage();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const action = {
      type: languageAction.CHANGE_LANUAGE,
      payload: cachedLanguage.value || "fa",
    };
    i18n.changeLanguage(cachedLanguage.value);

    set(action);
  }, [cachedLanguage.value]);
}
