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

  if (symbolList.data && symbolList.data.length > 0)
    return (
      <Container
        className={`symbolContainer

      `}
        language={language}
        showSymbol={showSymbol.isShow}
      >
        <main
          style={{
            display: " grid",
            overflowY: "scroll",
            overflowX: "hidden",
            width: " 100%",
            height: "100%",
            gridTemplateColumns: "auto auto auto",
            rowGap: "20px",
          }}
        >
          {symbolList.data.map((symbol) => (
            <Symbol
              key={symbol.id}
              id={symbol.id}
              setSymbolUsed={setSymbolUsed}
              symbolDetail={symbolDetail}
            />
          ))}
        </main>
      </Container>
    );
}

export default memo(SymbolPopUp);
