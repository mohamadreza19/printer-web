import { useEffect } from "react";
import { Admin_User_Symbol } from "../../../../../../reactQuery/common/callGetService";
import { AdminDelete_Symbol_Mutation } from "../../../../../../reactQuery/admin/callDeleteService";
import Icons from "../../../../../../styles/__ready/Icons";
import Typography from "../../../../../../styles/__ready/Typography";
import { t } from "i18next";

function Symbol({ id, DeleteBtn = true, count = 0 }) {
  const symbol = Admin_User_Symbol("admin");
  const delete_symbol = AdminDelete_Symbol_Mutation();

  useEffect(() => {
    symbol.mutate({ id });
  }, []);
  function deleteSymbol() {
    delete_symbol.mutate({ id });
  }
  if (symbol.isSuccess) {
    // parseSringSvgToDomSvg(id, symbol.data);
    function downloadBinaryFile(binaryString, fileName, mimeType) {
      const binaryData = new Uint8Array(binaryString.length);

      for (let i = 0; i < binaryString.length; i++) {
        binaryData[i] = binaryString.charCodeAt(i);
      }

      const blob = new Blob([binaryData], { type: mimeType });

      // Create a download link
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName || "downloaded_file";
      link.click();
      // Trigger a click on the link to start the download
    }
    if (symbol.isSuccess === true) {
      // const mimeType = "image/svg";
      // downloadBinaryFile(symbol.data, "svg", mimeType);
    }
    return (
      <div className="d-flex flex-column justify-content-center align-items-center mb-5">
        <article
          style={{
            border: "1px solid rgb(203 203 203 / 51%)",
            borderRadius: "10px",
          }}
          className="w-100 h-100 p-2 mb-2"
        >
          <img
            style={{
              width: "52px",
              height: "52px",
              minHeight: "52px",
              minWidth: "52px",
              maxWidth: "52px",
              maxHeight: "52px",
            }}
            className="w-100 h-100"
            src={`data:image/svg+xml;base64,${btoa(symbol.data)}`}
          />
          {/* {symbol.data.replace('"', "")} */}
        </article>
        <Typography.H9_5 className={"my-2"}>
          {t("symbols.printCount")} : {count}
        </Typography.H9_5>
        <article
          style={{
            display: DeleteBtn ? "block" : "none",
          }}
          onClick={deleteSymbol}
        >
          <Icons.Trash />
        </article>
      </div>
    );
  }
}

export default Symbol;
