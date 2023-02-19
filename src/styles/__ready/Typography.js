import { Typography } from "@mui/material";

export default class {
  constructor() {}

  static H4(props) {
    return (
      <Typography className="" variant="h4">
        {props.children}
      </Typography>
    );
  }
  static H5(props) {
    return (
      <Typography className="" variant="h5">
        {props.children}
      </Typography>
    );
  }
  static H6({ children, className }) {
    return (
      <Typography className={className} variant="h6">
        {children}
      </Typography>
    );
  }
  static H7({ children, className, onClick }) {
    return (
      <Typography
        onClick={onClick}
        className={className + " font-size-1_15rem"}
        variant="h6"
      >
        {children}
      </Typography>
    );
  }
  static H8({ children, className, onClick }) {
    return (
      <Typography
        onClick={onClick}
        className={className + " font-size-h8"}
        variant="h6"
      >
        {children}
      </Typography>
    );
  }
  static H9({ children, className, onClick }) {
    return (
      <Typography
        onClick={onClick}
        className={className + " font-size-h9"}
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
  static Button_v2({ children = "", className = "", onClick = () => {} }) {
    return (
      <p
        onClick={onClick}
        className={"text-lowercase font-vazir " + className + " "}
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
  static Body2({ children, className }) {
    return (
      <Typography className={" " + className} variant="body2">
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
