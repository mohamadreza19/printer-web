import { Input, TextField } from "@mui/material";

export default class {
  static v1({ children = "", className = "" }) {
    return <TextField className={className} />;
  }
  static v2({
    children = "",
    className = "",
    Input_marginStart_based_Language = "ms-3",
  }) {
    return (
      <div
        className={
          "w-100 bg-white border py-3 px-3 d-flex align-items-center border-r-20 " +
          className
        }
      >
        <img src="/svg/icon/username.svg" className="" />
        <input
          className={"text-filed-input-v2 " + Input_marginStart_based_Language}
        />
      </div>
    );
  }
  static v2_password({
    children = "",
    className = "",
    Input_marginStart_based_Language = "ms-3",
  }) {
    return (
      <div
        className={
          "w-100 bg-white border py-3 px-3 d-flex align-items-center border-r-20 " +
          className
        }
      >
        <img src="/svg/icon/password.svg" className="" />
        <input
          className={"text-filed-input-v2 " + Input_marginStart_based_Language}
        />
      </div>
    );
  }
}
