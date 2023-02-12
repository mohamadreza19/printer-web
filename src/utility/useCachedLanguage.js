import useLocalStorage from "react-use-localstorage";

export default function () {
  const [cachedLanguage, setCachedLanguage] = useLocalStorage("language", "");

  return {
    value: cachedLanguage,
    set: setCachedLanguage,
  };
}
