import { useSetRecoilState } from "recoil";
import { symbolList_store } from "../recoil/userEditorStore/showSymbol_store";

export default function () {
  const setSymbolList = useSetRecoilState(symbolList_store);
  return;
}
