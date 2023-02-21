import { useTheme } from "@mui/material";
import { useEffect } from "react";
import { useLanguage } from "../recoil/readStore";
import useCachedLanguage from "./useCachedLanguage";

function useHandleDirection_Based_Langiage() {
  const language = useLanguage();
  const theme = useTheme();
  useEffect(() => {
    if (language == "fa") {
      document.dir = "rtl";
    } else {
      document.dir = "ltr";
      // theme.typography.fontFamily = "Roboto !important";
      console.log(theme);
    }
  }, [language]);
}

export default useHandleDirection_Based_Langiage;
