import { useEffect } from "react";
import { useLanguage } from "../recoil/readStore";
import useCachedLanguage from "./useCachedLanguage";

function useHandleDirection_Based_Langiage() {
  const language = useLanguage();

  useEffect(() => {
    if (language == "fa") {
      console.log("rtl");
      document.dir = "rtl";
    } else {
      console.log("ltr");
      document.dir = "ltr";
    }
  }, [language]);
}

export default useHandleDirection_Based_Langiage;
