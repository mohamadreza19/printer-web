import { useEffect } from "react";
import { useLanguage } from "../recoil/readStore";
import useCachedLanguage from "./useCachedLanguage";

function useHandleDirection_Based_Langiage() {
  const language = useLanguage();

  useEffect(() => {
    if (language == "fa") {
      document.dir = "rtl";
    } else {
      document.dir = "ltr";
    }
  }, [language]);
}

export default useHandleDirection_Based_Langiage;
