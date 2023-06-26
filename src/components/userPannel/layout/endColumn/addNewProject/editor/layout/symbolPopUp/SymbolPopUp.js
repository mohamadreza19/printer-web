import { useRecoilState, useRecoilValue } from "recoil";
import {
  isShowSymbol_store,
  symbolUsed_store,
} from "../../../../../../../../recoil/userEditorStore/showSymbol_store";
import "./style/SymbolPopUp.css";
import { Container } from "./style/container.style";
import { useLanguage } from "../../../../../../../../recoil/readStore";
import {
  Admin_UserSymbols,
  Admin_User_Symbol,
} from "../../../../../../../../reactQuery/common/callGetService";
import Symbol from "./Symbol";
import { memo, useCallback } from "react";
function SymbolPopUp() {
  const showSymbol = useRecoilValue(isShowSymbol_store);
  const symbolList = Admin_UserSymbols("user");
  const symbolDetail = Admin_User_Symbol("user");
  const [symbolUsed, setSymbolUsed] = useRecoilState(symbolUsed_store);

  const language = useLanguage();
  console.log(symbolList.data);
  return symbolList.data ? (
    <Container
      className={`symbolContainer

      `}
      language={language}
      showSymbol={showSymbol.isShow}
    >
      {symbolList.data.map((symbol) => (
        <Symbol
          key={symbol.id}
          id={symbol.id}
          setSymbolUsed={setSymbolUsed}
          symbolDetail={symbolDetail}
        />
      ))}
    </Container>
  ) : null;
}

export default memo(SymbolPopUp);
