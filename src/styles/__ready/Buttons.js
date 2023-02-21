import { Button } from "@mui/material";

export default class {
  static Contained({ children, onClick = () => {}, className }) {
    return (
      <Button
        onClick={onClick}
        variant="contained"
        className={"bg_primary px-3 py-1_4rem " + className}
      >
        {children}
      </Button>
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
        className={"bordr " + className}
      >
        {children}
      </Button>
    );
  }
  static Outlined({ children, onClick = () => {}, className }) {
    return (
      <Button
        onClick={onClick}
        variant="outlined"
        className={"color-primary  px-3 border-r-20 py-0_8rm " + className}
      >
        {children}
      </Button>
    );
  }
}
