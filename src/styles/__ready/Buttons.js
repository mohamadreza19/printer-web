import { Button } from "@mui/material";

export default class {
  static Contained({ children, onClick = () => {} }) {
    return (
      <Button
        onClick={onClick}
        variant="contained"
        className="bg_primary px-3 py-0_9rm"
      >
        {children}
      </Button>
    );
  }
  static Outlined({ children, onClick = () => {} }) {
    return (
      <Button
        onClick={onClick}
        variant="outlined"
        className="color-primary  px-3 py-0_9rm  "
      >
        {children}
      </Button>
    );
  }
}
