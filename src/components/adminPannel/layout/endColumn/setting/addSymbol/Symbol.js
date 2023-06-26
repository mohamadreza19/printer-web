import { useEffect } from "react";
import { Admin_User_Symbol } from "../../../../../../reactQuery/common/callGetService";
import { AdminDelete_Symbol_Mutation } from "../../../../../../reactQuery/admin/callDeleteService";
import Icons from "../../../../../../styles/__ready/Icons";

function Symbol({ id }) {
  const symbol = Admin_User_Symbol("admin");
  const delete_symbol = AdminDelete_Symbol_Mutation();

  useEffect(() => {
    symbol.mutate({ id });
  }, []);
  function deleteSymbol() {
    delete_symbol.mutate({ id });
  }
  return (
    symbol.isSuccess && (
      <div
        className="d-flex flex-column justify-content-center align-items-center mb-5"
        style={{
          width: "52px",
          height: "87px",
        }}
      >
        <article className="w-100 h-100 ">
          <img className="w-100 h-100" src={URL.createObjectURL(symbol.data)} />
        </article>
        <article onClick={deleteSymbol}>
          <Icons.Trash />
        </article>
      </div>
    )
  );
}

export default Symbol;
