import Typography from "../../../../../../styles/__ready/Typography";
import SymbolList from "./SymbolList";
import UploadSymbolArea from "./UploadSymbolArea";

function AddSymbol() {
  return (
    <div
      className="w-100 d-flex flex-column justify-content-between pb-6"
      style={{
        height: "81vh",
        borderBottomLeftRadius: "25px",
        borderBottomRightRadius: "25px",
      }}
    >
      <header className="w-100 px-5 mt-3 mb-5">
        <Typography.H5 className="font-500">لیست سیمبل ها</Typography.H5>
        <SymbolList />
      </header>
      <main className=" d-flex  flex-column justify-content-center align-items-center">
        <UploadSymbolArea />
      </main>
    </div>
  );
}

export default AddSymbol;
