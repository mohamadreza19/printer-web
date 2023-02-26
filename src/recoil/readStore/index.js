import { useRecoilValue } from "recoil";
import { userReadAction } from "../actions/userAction";
import {
  isUserLogin,
  language,
  userData,
  content_Based_Language,
  class_Based_Language,
  isAdminLogin,
} from "../recoilStore";

export const useReadUser = (howToRead = "") => {
  if (!howToRead) throw new Error("howToRead is empty");
  const user = useRecoilValue(userData);
  switch (howToRead) {
    case userReadAction.ALL:
      return user;
      break;
    case userReadAction.NAME:
      return user.name;
      break;

    case userReadAction.AGE:
      return user.age;
      break;

    case userReadAction.LICENCE:
      return user.licence;
      break;
  }
};

export const useLanguage = () => {
  return useRecoilValue(language);
};
export const useIsAdminLogin = () => {
  return useRecoilValue(isAdminLogin);
};
export const useIsUserLogin = () => {
  return useRecoilValue(isUserLogin);
};
export const useContent_Based_Language = () => {
  return useRecoilValue(content_Based_Language);
};
export const useDynamicCssClass = () => {
  return useRecoilValue(class_Based_Language);
};
