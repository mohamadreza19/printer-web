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

    const svg = document.querySelector(`#svgHolder-${id} svg`);
    const path = document.querySelector(`#svgHolder-${id} svg path`);

    if (svg && path) {
      svg.attributes.width.value = "48px";
      svg.attributes.height.value = "48px";
      svg.attributes.fill.value = "black";
      path.attributes.fill.value = "black";
    }
  }, [symbolDetail.data]);

  if (symbolDetail.isSuccess)
    return (
      <div
        id={`svgHolder-${id}`}
        onClick={onclick}
        style={{
          width: "48px",
          height: "48px",
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
