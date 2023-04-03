import { Input, TextField } from "@mui/material";
import { useDynamicCssClass, useLanguage } from "../../recoil/readStore";
import Icons from "./Icons";
import Typography from "./Typography";

export default class {
  static v1({ children = "", className = "" }) {
    return <TextField className={className} />;
  }
  static v2({
    children = "",
    className = "",
    Input_marginStart_based_Language = "ms-3",
    value = " ",
    onChange = () => {},
  }) {
    return (
      <div
        className={
          "w-100 bg-white border py-3 px-3 d-flex align-items-center border-r-20 " +
          className
        }
      >
        <input
          className={"text-filed-input-v2 " + Input_marginStart_based_Language}
          // value={value}
          onChange={(e) => onChange(e)}
        />
      </div>
    );
  }
  static v3({
    children = "",
    className = "",
    Input_marginStart_based_Language = "ms-3",
    value = " ",
    onChange = () => {},
  }) {
    return (
      <div
        className={
          " bg-white border  d-flex align-items-center border-r-20 " + className
        }
      >
        <input
          className={
            "text-filed-input-v2 text-filed-medium " +
            Input_marginStart_based_Language
          }
          // value={value}
          onChange={(e) => onChange(e)}
        />
      </div>
    );
  }
  static v4({
    children = "",
    className = "",
    Input_marginStart_based_Language = "ms-3",
    value = " ",
    onChange = () => {},
  }) {
    return (
      <div
        className={
          " bg-white border  d-flex align-items-center border-r-20 " + className
        }
      >
        <input
          className={
            "text-filed-input-v2  text-filed-large " +
            Input_marginStart_based_Language
          }
          // value={value}
          onChange={(e) => onChange(e)}
        />
      </div>
    );
  }
  static v2_SearchBox({
    children = "",
    className = "",
    Input_marginStart_based_Language = "ms-3",
    placeholder = "",
    iconMarginStart = " ",
  }) {
    return (
      <div
        className={
          "w-100 bg-white border py-2 px-3 d-flex align-items-center justify-content-between border-r-20 " +
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
            "w-100 text-filed-input-v2 placeholder-v1 " +
            Input_marginStart_based_Language
          }
        />
        <span className={"cur-pointer " + iconMarginStart}>
          <Icons.Search />
        </span>
      </div>
    );
  }
  static v2_userName({
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
        <Icons.UserName />
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

export const TextFieldFUN_v3 = ({
  value = " ",
  onChange = " ",
  placeholder = " ",
  className = " ",
}) => {
  const cssClass = useDynamicCssClass();

  return (
    <div
      className={` bg-white border  d-flex align-items-center border-r-20 ${className}`}
    >
      <input
        className={`text-filed-input-v2 text-filed-medium 
          ${cssClass.ms_2}`}
        // value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};
export const TextFieldFUN_v4 = ({
  value = " ",
  onChange = " ",
  placeholder = " ",
  className = " ",
}) => {
  const cssClass = useDynamicCssClass();

  return (
    <div
      className={` bg-white border  d-flex align-items-center border-r-20 ${className}`}
    >
      <input
        className={`text-filed-input-v2 text-filed-large
          ${cssClass.ms_2}`}
        // value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};
export const TextField_small_Custom = ({
  value = " ",
  onChange = " ",
  placeholder = " ",
  className = " ",
}) => {
  const cssClass = useDynamicCssClass();

  return (
    <div
      className={` bg-white border  d-flex align-items-center border-r-20 text-filed-medium-v1 ${className}`}
    >
      <span className={cssClass.ms_2}>mm</span>
      <input
        className={`text-filed-input-v2 text-filed-large
          ${cssClass.ms_2}`}
        // value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};
export const TextFieldFUN_v5 = ({
  value = "",
  onChange = () => {},
  placeholder = " ",
  className = " ",
  ImputclassName = "",
}) => {
  const cssClass = useDynamicCssClass();
  const language = useLanguage();
  const changedClass = language == "fa" ? " " : "font-English";

  return (
    <>
      <div
        className={` bg-white border  d-flex align-items-center border-r-20 ${className}`}
      >
        <input
          className={`${ImputclassName} text-filed-input-v2 text-filed-large
          ${cssClass.ms_2}`}
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            onChange(e);
          }}
        />
      </div>
      <footer className={"w-100 d-flex justify-content-end px-2 mt-1"}>
        <Typography.Button_v2
          className={"font-400 disabled_gray2 " + changedClass}
        >
          {value.length}/120
        </Typography.Button_v2>
      </footer>
    </>
  );
};
export const TextFieldFUN_v5_Big = ({
  value = "",
  onChange = () => {},
  placeholder = " ",
  className = " ",
  InputclassName = "",
}) => {
  const cssClass = useDynamicCssClass();
  const language = useLanguage();
  const changedClass = language == "fa" ? " " : "font-English";

  return (
    <>
      <div
        className={` bg-white border  d-flex align-items-start border-r-20 ${className}  p-2`}
      >
        <textarea
          className={`${InputclassName} 
          text-filed-input-v2 
          test-area-big
          ${cssClass.ms_2}`}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e)}
        />
      </div>
      <footer className={"w-100 d-flex justify-content-end px-2 mt-1"}>
        <Typography.Button_v2
          className={"font-400 disabled_gray2 " + changedClass}
        >
          {value.length}/120
        </Typography.Button_v2>
      </footer>
    </>
  );
};
export const TextFieldFUN_ClipBoardBadge = ({
  value = " ",
  onChange = () => {},
  placeholder = " ",
  className = " ",
  footerNumber = "0",
}) => {
  const cssClass = useDynamicCssClass();
  const language = useLanguage();
  const changedClass = language == "fa" ? " " : "font-English";

  return (
    <>
      <div
        className={` bg-white border language-card-select px-1   d-flex align-items-center border-r-20 ${className}`}
      >
        <span className="d-flex justify-content-center align-items-center bg_primary border-r-16 badge_1">
          <Icons.ClipBoard size="medium-sm" />
        </span>
        <input
          className={` text-filed-input-v2 text-filed-large
          ${cssClass.ms_2}`}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </>
  );
};
