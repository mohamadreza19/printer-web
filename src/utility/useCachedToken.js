import useLocalStorage from "react-use-localstorage";

export default function () {
  const [cachedLanguage, setCachedLanguage] = useLocalStorage("t", "");

  return {
    value: cachedLanguage,
    set: setCachedLanguage,
  };
}
