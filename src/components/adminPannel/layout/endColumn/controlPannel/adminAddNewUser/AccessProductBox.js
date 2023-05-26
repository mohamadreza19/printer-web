import use_addUser_controller from "../../../../../../helper/admin_add_user/controlInputs";

import Typography from "../../../../../../styles/__ready/Typography";

export default function ({
  AccessToProducts,
  accessProduct,
  margin,
  handleToggleAccessProduct = () => {},
}) {
  const meta = use_addUser_controller();
  const changedJustify = meta.state.productAccess
    ? "justify-content-start"
    : "justify-content-end";
  const changedBackGround = accessProduct ? "#F36523" : "rgb(238 170 139)";
  return (
    <article className="d-flex align-items-center w-100">
      <div
        style={{
          width: "62px",
          height: "36px",
          backgroundColor: "#FBD1BD",
          borderRadius: "18px",
        }}
        className={"mt-1 d-flex align-item-center  dir-rtl " + changedJustify}
      >
        <span
          onClick={meta.handeler.setProductAccessHandeler}
          style={{
            width: "29.95px",
            height: "29.95px",
            backgroundColor: changedBackGround,
            borderRadius: "18px",
          }}
          className="transition-all-v1  "
        ></span>
      </div>
      <Typography.H8 className={"font-400  " + margin}>
        {AccessToProducts}
      </Typography.H8>
    </article>
  );
}
