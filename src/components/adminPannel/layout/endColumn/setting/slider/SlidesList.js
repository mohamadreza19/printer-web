import { useEffect } from "react";
import { AdminSymbols } from "../../../../../../reactQuery/admin/callGetService";

import { Admin_UserSlider } from "../../../../../../reactQuery/common/callGetService";
import Slide from "./Slide";

function SlidesList() {
  const symbolList = Admin_UserSlider("admin");

  return (
    <div
      className="w-100 px-4  mt-4 d-flex justify-content-start flex-wrap"
      style={{
        columnGap: "52px",
      }}
    >
      {symbolList.data && symbolList.data.length > 0
        ? symbolList.data.map((data) => <Slide id={data.id} />)
        : null}
    </div>
  );
}

export default SlidesList;
