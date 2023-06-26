import { useEffect } from "react";
import { AdminSymbols } from "../../../../../../reactQuery/admin/callGetService";

import { useState } from "react";
import Symbol from "./Symbol";
import {
  Admin_UserSymbols,
  Admin_User_Symbol,
} from "../../../../../../reactQuery/common/callGetService";

function SymbolList() {
  const symbolList = Admin_UserSymbols("admin");

  return (
    <div
      className="w-100 px-4  mt-4 d-flex justify-content-start flex-wrap"
      style={{
        columnGap: "52px",
      }}
    >
      {symbolList.data && symbolList.data.length > 0
        ? symbolList.data.map((data) => <Symbol id={data.id} />)
        : null}
    </div>
  );
}

export default SymbolList;
