import { Language } from "@mui/icons-material";
import { atom, selector, useRecoilValue } from "recoil";
import { ltrClass, rtlClass } from "../styles/cssClass";
import { userReadAction } from "./actions/userAction";

export const userData = atom({
  key: "userData",
  default: {
    name: "init",
    age: 0,
    licence: false,
  },
});
export const isUserLogin = atom({
  key: "user-authentication",
  default: {
    isLoggin: false,
  },
});
export const ageIn2 = selector({
  key: "age select",
  get: ({ get }) => get(userData).age / 2,
});
export const language = atom({
  key: "language",
  default: "en",
});
export const class_Based_Language = selector({
  key: "class_Based_Language",
  get: ({ get }) => {
    const selectedLanguage = get(language);

    switch (selectedLanguage) {
      case "en":
        return ltrClass;
        break;
      case "fa":
        return rtlClass;
        break;

      default:
        return {
          ms_auto: "magin-left-auto",
          ms_1: "magin-left1",
          ms_2: "magin-left2",
          ms_3: "magin-left3",
          ms_4: "magin-left4",
          ms_5: "magin-left5",
          //
          me_auto: "magin-right-auto",
          me_1: "magin-right1",
          me_2: "magin-right2",
          me_3: "magin-right3",
          me_4: "magin-right4",
          me_5: "magin-right5",
          //padding
          ps_1: "padding-left1",
          ps_2: "padding-left2",
          ps_3: "padding-left3",
          ps_4: "padding-left4",
          ps_5: "padding-left5",
          //
          pe_1: "padding-right1",
          pe_2: "padding-right2",
          pe_3: "padding-right3",
          pe_4: "padding-right4",
          pe_5: "padding-right5",
        };
        break;
    }
  },
});
export const content_Based_Language = selector({
  key: "Content_Based_Language",
  get: ({ get }) => {
    const selectedLanguage = get(language);
    switch (selectedLanguage) {
      case "en":
        return {
          selectedLanguage: {
            text: "It seems that your location is not the same as the language, would you like to change it?",
            startButtonText: "Change to English",
            endButtonText: "ادامه با زبان فارسی",
          },
        };
        break;
      case "fa":
        return {
          selectedLanguage: {
            text: "به نظر می رسد مکان شما با زبان یکی نیست، آیا می خواهید آن را تغییر دهید؟",
            startButtonText: "ادامه با فارسی",
            endButtonText: "Change to English",
          },
        };
        break;

      default:
        return {
          selectedLanguage: {
            text: "It seems that your location is not the same as the language, would you like to change it?",
            startButtonText: "Change to English",
            endButtonText: "ادامه با فارسی",
          },
        };
        break;
    }
  },
});
export const refresh = atom({
  key: "refresh",
  default: false,
});
