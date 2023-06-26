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
  if (symbolDetail.isSuccess)
    return (
      <div
        onClick={onclick}
        style={{
          width: "48px",
          height: "48px",
        }}
      >
        <img
          src={URL.createObjectURL(symbolDetail.data)}
          className="w-100 h-100"
        />
      </div>
    );
}

export default Symbol;
