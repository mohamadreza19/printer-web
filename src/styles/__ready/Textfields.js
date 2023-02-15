import { Input, TextField } from "@mui/material";
import Icons from "./Icons";

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
  static v2_SearchBox({
    children = "",
    className = "",
    Input_marginStart_based_Language = "ms-3",
    placeholder = "",
  }) {
    return (
      <div
        className={
          "w-100 bg-white border py-2 px-3 d-flex align-items-center border-r-20 " +
          className
        }
      >
        <input
          style={{
            position: "relative",
            top: "-0.1rem",
          }}
          placeholder={placeholder}
          // placeholder="جست و جو بر اساس نام پروژه"
          className={
            "text-filed-input-v2 placeholder-v1 " +
            Input_marginStart_based_Language
          }
        />
        <span className="cur-pointer">
          <Icons.Search />
        </span>
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
