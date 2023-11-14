import { useEffect } from "react";
import { Admin_User_Symbol } from "../../../../../../../../reactQuery/common/callGetService";
import { memo } from "react";

function Symbol({ id, setSymbolUsed }) {
  const symbolDetail = Admin_User_Symbol("user");
  useEffect(() => {
    symbolDetail.mutate({ id });
  }, []);

  function onclick() {
    setSymbolUsed((draft) => ({ isUsed: true, payload: id }));
  }
  useEffect(() => {
    if (symbolDetail.isSuccess)
      document.getElementById(`svgHolder-${id}`).innerHTML = symbolDetail.data;

    const svgContainer = document.querySelector(`#svgHolder-${id} svg`);

    if (svgContainer) {
      svgContainer.setAttribute("width", "48px");
      svgContainer.setAttribute("height", "48px");
    }
  }, [symbolDetail.data]);

  if (symbolDetail.isSuccess)
    return (
      <div
        className="mx-1 "
        id={`svgHolder-${id}`}
        onClick={onclick}
        style={{
          width: "48px",
          height: "48px",
          border: "1px solid rgb(203 203 203 / 51%)",
          borderRadius: "10px",
        }}
      >
        {/* <img
          // src={URL.createObjectURL(symbolDetail.data)}
          className="w-100 h-100"
        /> */}
      </div>
    );
}

export default Symbol;
