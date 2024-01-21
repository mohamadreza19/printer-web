import { Button } from "@mui/material";

export default class {
  static Contained({
    children,
    onClick = () => {},
    className,
    form,
    disabled = false,
  }) {
    return (
      <button
        disabled={disabled}
        form={form}
        onClick={onClick}
        variant="contained"
        className={
          "bg_primary color-white px-3 py-1_4rem d-flex justify-content-center align-items-center " +
          className
        }
      >
        {children}
      </button>
    );
  }
  static Contained_Custom({
    children = " ",
    onClick = () => {},
    className = " ",
  }) {
    return (
      <Button
        onClick={onClick}
        variant="contained"
        className={"bordr border-r-20  " + className}
      >
        {children}
      </Button>
    );
  }
  static Outlined({
    children,
    onClick = () => {},
    className,
    disabled = false,
  }) {
    return (
      <Button
        disabled={disabled}
        onClick={onClick}
        variant="outlined"
        className={"color-primary  px-3 border-r-20  py-0_8rm " + className}
      >
        {children}
      </Button>
    );
  }
  static Outlined_Custom({ children, onClick = () => {}, className }) {
    return (
      <Button
        onClick={onClick}
        variant="outlined"
        className={"color-primary   border-r-20   " + className}
      >
        {children}
      </Button>
    );
  }
}
