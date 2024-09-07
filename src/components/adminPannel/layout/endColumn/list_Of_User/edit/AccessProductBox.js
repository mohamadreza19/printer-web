import use_addUser_controller from "../../../../../../helper/admin_add_user/controlInputs";

import Typography from "../../../../../../styles/__ready/Typography";

export default function ({ title, value, onChange, margin }) {
  const changedJustify = value
    ? "justify-content-start"
    : "justify-content-end";
  const changedBackGround = title ? "#F36523" : "rgb(238 170 139)";
  const handleClick = () => {
    let event = {
      target: {
        value: !value,
      },
    };
    onChange(event);
  };
  return (
    <article className="d-flex align-items-center w-100">
      <div
        onClick={handleClick}
        style={{
          width: "62px",
          height: "36px",
          backgroundColor: "#FBD1BD",
          borderRadius: "18px",
          opacity: value ? 1 : "0.6",
        }}
        className={
          "mt-1 d-flex align-item-center cur-pointer  dir-rtl " + changedJustify
        }
      >
        <span
          style={{
            width: "29.95px",
            height: "29.95px",
            backgroundColor: changedBackGround,
            borderRadius: "18px",
          }}
          className="transition-all-v1  "
        ></span>
      </div>
      <Typography.H8 className={"font-400  " + margin}>{title}</Typography.H8>
    </article>
  );
}
