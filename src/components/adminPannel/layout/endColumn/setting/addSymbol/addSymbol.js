import { t } from "i18next";
import Typography from "../../../../../../styles/__ready/Typography";
import MonstPrintedSymbol from "./MostPrintedSymbol";
import SymbolList from "./SymbolList";
import UploadSymbolArea from "./UploadSymbolArea";

function AddSymbol() {
  return (
    <div
      className="w-100 d-flex flex-column justify-content-between pb-6"
      style={{
        // height: "81vh",
        maxHeight: "728.71px",
        overflowY: "auto",
        borderBottomLeftRadius: "25px",
        borderBottomRightRadius: "25px",
      }}
    >
      <header className="w-100 px-5 mt-3 mb-5">
        <MonstPrintedSymbol />
        <Typography.H5 className="font-500">
          {t("symbols.symbolList")}
        </Typography.H5>
        <SymbolList />
      </header>
      <main className=" d-flex  flex-column justify-content-center align-items-center">
        <UploadSymbolArea />
      </main>
    </div>
  );
}

export default AddSymbol;
