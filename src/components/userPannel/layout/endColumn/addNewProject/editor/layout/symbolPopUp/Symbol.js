import { useEffect } from "react";
import { Admin_User_Symbol } from "../../../../../../../../reactQuery/common/callGetService";
import { memo } from "react";

function Symbol({ id, onClick }) {
  const symbolDetail = Admin_User_Symbol("user");
  useEffect(() => {
    symbolDetail.mutate({ id });
  }, []);

  useEffect(() => {
    if (symbolDetail.isSuccess)
      document.getElementById(`svgHolder-${id}`).innerHTML = symbolDetail.data;

    const svgContainer = document.querySelector(`#svgHolder-${id} svg`);

    if (svgContainer) {
      svgContainer.setAttribute("width", "48px");
      svgContainer.setAttribute("height", "48px");
    }
  }, [symbolDetail.data]);
  if (symbolDetail.isSuccess) {
  }
  if (symbolDetail.isSuccess)
    return (
      <div
        className="mx-1 "
        id={`svgHolder-${id}`}
        onClick={onClick}
        style={{
          width: "48px",
          height: "48px",
          border: "1px solid rgb(203 203 203 / 51%)",
          borderRadius: "10px",
        }}
      ></div>
    );
}

export default Symbol;
