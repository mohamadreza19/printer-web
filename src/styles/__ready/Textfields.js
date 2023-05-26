import { Input, TextField } from "@mui/material";
import ContentEditable from "react-contenteditable";
import { useDynamicCssClass, useLanguage } from "../../recoil/readStore";
import Icons from "./Icons";
import Typography from "./Typography";
import { useRecoilState, useRecoilValue } from "recoil";
//
import { isView } from "../../recoil/userEditorStore/selectionButtonsStore/actionButton";
import { useEffect, useRef, useState } from "react";
import shortid from "shortid";
import Barcode from "react-barcode";
import { QRCodeSVG } from "qrcode.react";
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
    onClickAndGetValeFn = () => {},
  }) {
    return (
      <div
        className={
          "w-100 bg-white border py-2 px-3 d-flex align-items-center justify-content-between border-r-20 " +
          className
        }
        style={{
          height: "52px",
        }}
      >
        <input
          style={{
            position: "relative",
            top: "-0.1rem",
          }}
          id="serach-input"
          placeholder={placeholder}
          // placeholder="جست و جو بر اساس نام پروژه"
          className={
            "w-100 text-filed-input-v2 placeholder-v1 " +
            Input_marginStart_based_Language
          }
        />
        <span
          className={"cur-pointer " + iconMarginStart}
          onClick={() => {
            const serach_input = document.getElementById("serach-input");
            const value = serach_input.value;

            onClickAndGetValeFn(value);
          }}
        >
          <Icons.Search />
        </span>
      </div>
    );
  }
  // static v2_userName({
  //   children = "",
  //   className = "",
  //   Input_marginStart_based_Language = "ms-3",
  //   value = "",
  //   onChange = () => {},
  // }) {
  //   return (
  //     <div className={"login-input-box px-3 " + className}>
  //       <Icons.UserName />
  //       <input
  //         value={value}
  //         onChange={onChange}
  //         className={"text-filed-input-v2 " + Input_marginStart_based_Language}
  //       />
  //     </div>
  //   );
  // }
  static v2_password({
    children = "",
    className = "",
    Input_marginStart_based_Language = "ms-3",
  }) {
    return (
      <div className={"login-input-box px-3 " + className}>
        <img src="/svg/icon/password.svg" className="" />
        <input
          className={"text-filed-input-v2 " + Input_marginStart_based_Language}
        />
      </div>
    );
  }
}
export const UserNameTextField = ({
  content = "content",
  children = "",
  className = "",
  Input_marginStart_based_Language = "ms-3",
  value = "",

  onChange = () => {},
}) => {
  return (
    <div className="d-flex flex-column mb-3">
      <Typography.H6>{content}</Typography.H6>
      <section className={"login-input-box px-3 " + className}>
        <Icons.UserName />
        <input
          type="text"
          value={value}
          onChange={onChange}
          className={"text-filed-input-v2 " + Input_marginStart_based_Language}
        />
      </section>
    </div>
  );
};
export const LoginPasswordTextField = ({
  content = "content",
  children = "",
  className = "",
  Input_marginStart_based_Language = "ms-3",
  value = "",
  onChange = () => {},
}) => {
  return (
    <div className="d-flex flex-column mt-4">
      <Typography.H6>{content}</Typography.H6>
      <section className={"login-input-box px-3 " + className}>
        <img src="/svg/icon/password.svg" className="" />
        <input
          type="password"
          value={value}
          onChange={onChange}
          className={"text-filed-input-v2 " + Input_marginStart_based_Language}
        />
      </section>
    </div>
  );
};
export const EditorSearchBox = ({
  children = "",
  className = "",
  Input_marginStart_based_Language = "ms-3",
  placeholder = "",
  iconMarginStart = " ",
}) => {
  const cssClass = useDynamicCssClass();
  return (
    <div
      style={{
        width: "320px",
        height: "64px",
      }}
      className={` bg-white border py-2  d-flex align-items-center justify-content-between border-r-20
      ${cssClass.ps_2} ${cssClass.pe_1} ${className} `}
    >
      <input
        style={{
          position: "relative",
          top: "-0.1rem",
        }}
        placeholder={"نام محصول"}
        // placeholder="جست و جو بر اساس نام پروژه"
        className={
          " editor-searchbox-input placeholder-v1 " +
          Input_marginStart_based_Language
        }
      />
      <section
        className={
          "cur-pointer bg_primary d-flex justify-content-center align-items-center   " +
          iconMarginStart
        }
        style={{ width: "60px", height: "52px" }}
      >
        <Icons.Search className="fill_white " cls={"editor-search-icon"} />
      </section>
    </div>
  );
};
export const TextFieldFUN_v3 = ({
  value = " ",
  onChange = " ",
  placeholder = " ",
  className = " ",
  type = "text",
}) => {
  const cssClass = useDynamicCssClass();
  const lan = useLanguage();
  return (
    <div
      className={` h-100   d-flex align-items-center border-r-20 ${className}`}
    >
      <input
        className={`text-filed-input-v2 
          ${cssClass.ms_2}`}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
        style={{
          textAlign: lan === "fa" ? "right" : "left",
        }}
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
  onChange = () => {},
  placeholder = " ",
  className = " ",
  type = "text",
}) => {
  const cssClass = useDynamicCssClass();
  const language = useLanguage();

  return (
    <div
      className={` bg-white border  d-flex align-items-center border-r-20  ${className}`}
    >
      <span className={cssClass.ms_2}>mm</span>
      <input
        type={type}
        className={`text-filed-input-v2 text-filed-large
          ${cssClass.ms_2}`}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        style={{
          textAlign: language === "fa" ? "right" : "left",
        }}
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
    <article className="text-filed-medium-v1">
      <div
        className={` bg-white border   d-flex align-items-center border-r-20 ${className}`}
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
    </article>
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
export const Editor_Cell_Input = ({
  value = " ",
  onChange = () => {},
  id = "",
  placeholder = " ",
  isSelected = false,
  onBackspaceDown = () => {},
  onClick = () => {},
  style = {
    fontFamily: "",
    fontStyle: "",
    angle: 0,
    fontSize: "",
  },
  wantBarcode = false,
  wantQr = false,
}) => {
  const isViewMode = useRecoilValue(isView);

  const barCodeRef = useRef(null);
  const qrcodeRef = useRef(null);
  useEffect(() => {
    if (wantBarcode) {
      barCodeRef.current.renderElementRef.current.style.rotate = `${style.angle}deg`;
      barCodeRef.current.renderElementRef.current.style.padding = `${style.padding}px`;
    }
  }, [style.angle, style.padding]);
  const BarcodeAndQrCodeController = () => {
    if (wantBarcode) {
      return (
        <Barcode
          value={value}
          fontSize={style.fontSize}
          displayValue={false}
          margin={style.margin}
          ref={barCodeRef}
        />
      );
    }
    if (wantQr) {
      return (
        <QRCodeSVG
          value={value}
          width="100%"
          height="100%"
          rotate={`${style.angle}deg`}
          style={{
            rotate: `${style.angle}deg`,
            margin: `${style.margin}px 0`,
            padding: `${style.padding}px`,
          }}
        />
      );
    }
  };
  return (
    <>
      {wantBarcode || wantQr ? (
        <BarcodeAndQrCodeController />
      ) : (
        <input
          className="editor-cell-input"
          value={value || " "}
          style={{
            fontFamily: style.fontFamily,
            fontWeight: style.fontStyle == "bold" ? 600 : 400,
            fontSize: style.fontSize,
            fontStyle: style.fontStyle == "italic" ? "italic" : "normal",
            textDecoration:
              style.fontStyle == "underline" ? "underline" : "none",
            textAlign: style.textAlign,
            rotate: `${style.angle}deg`,
            margin: `${style.margin}px 0`,
            padding: `${style.padding}px`,
          }}
          disabled={isViewMode || isSelected}
          onClick={() => {
            onClick();
          }}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          id="text"
        />
      )}
    </>
  );
};
