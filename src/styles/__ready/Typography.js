import { Typography } from "@mui/material";
import { useLanguage } from "../../recoil/readStore";

export default class {
  constructor() {}

  static H2({ children, className, language = "fa" }) {
    const value = language === "fa" ? " " : "font-English";
    return (
      <Typography className={`${className} ${value}`} variant="h2">
        {children}
      </Typography>
    );
  }
  static H3({ children, className, language = "fa" }) {
    const value = language === "fa" ? " " : "font-English";
    return (
      <Typography className={" " + className + " " + value} variant="h3">
        {children}
      </Typography>
    );
  }
  static H3_v2({ children, className }) {
    return (
      <Typography className={" font-size-1_6rem  " + className} variant="h4">
        {children}
      </Typography>
    );
  }
  static H4({ children, className }) {
    return (
      <Typography className={" " + className} variant="h4">
        {children}
      </Typography>
    );
  }
  static H5({ className, children, language = "fa" }) {
    const value = language === "fa" ? " " : "font-English";
    return (
      <Typography className={className + " " + value} variant="h5">
        {children}
      </Typography>
    );
  }
  static H6({ children, className, language = "fa" }) {
    const value = language === "fa" ? " " : "font-English";
    return (
      <Typography className={className + " " + value} variant="h6">
        {children}
      </Typography>
    );
  }
  static H7({ children, className, onClick, language = "fa" }) {
    const matched = language == "en" ? "font-English" : " ";
    return (
      <Typography
        onClick={onClick}
        className={className + " font-size-1_15rem " + matched}
        variant="h6"
      >
        {children}
      </Typography>
    );
  }
  static H8({ children, className, onClick, language = "fa" }) {
    const matched = language == "en" ? "font-English" : " ";
    return (
      <Typography
        onClick={onClick}
        className={className + " font-size-h8 " + matched}
        variant="body1"
      >
        {children}
      </Typography>
    );
  }
  static H9({ children, className, onClick, language = "fa" }) {
    const matched = language == "en" ? "font-English" : " ";
    return (
      <Typography
        onClick={onClick}
        className={`${className} font-size-h9 ${matched} `}
        variant="h6"
      >
        {children}
      </Typography>
    );
  }
  static H9_5({ children, className, onClick, language = "fa" }) {
    const value = language === "fa" ? " " : "font-English";
    return (
      <Typography
        onClick={onClick}
        className={className + " font-size-h9_5 " + value}
        variant="h6"
      >
        {children}
      </Typography>
    );
  }
  static H10({ children, className, onClick, language = "fa" }) {
    const value = language === "fa" ? " " : "font-English";
    return (
      <Typography
        onClick={onClick}
        className={className + " font-size-h10 " + value}
        variant="h6"
      >
        {children}
      </Typography>
    );
  }
  static Button({ children = "", className = "", onClick = () => {} }) {
    return (
      <Typography
        onClick={onClick}
        className={"text-lowercase " + className}
        variant="button"
      >
        {children}
      </Typography>
    );
  }
  static Button_v2({
    isFa = true,
    children = "",
    className = "",
    onClick = () => {},
  }) {
    return (
      <p
        onClick={onClick}
        className={`text-lowercase font-vazir "  ${className} ${
          !isFa && "font-English"
        } `}
      >
        {children}
      </p>
    );
  }
  static Caption(props) {
    return (
      <Typography className="" variant="caption">
        {props.children}
      </Typography>
    );
  }
  static Body2({ children, className, isFa = true }) {
    return (
      <Typography
        className={` ${!isFa && "font-English"} ${className}`}
        variant="body2"
      >
        {children}
      </Typography>
    );
  }
  static EnglishNumber_body2({ children, className }) {
    return (
      <span
        lang="en"
        // dir="ltr"
        style={{
          fontFamily: "Ubuntu important",
        }}
        className={" " + className}
        variant="body2"
      >
        {children}
      </span>
    );
  }
}
