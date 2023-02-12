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
  static H6(props) {
    return (
      <Typography className="" variant="h6">
        {props.children}
      </Typography>
    );
  }
  static Button(props) {
    return (
      <Typography className="text-lowercase " variant="button">
        {props.children}
      </Typography>
    );
  }
  static Caption(props) {
    return (
      <Typography className="" variant="caption">
        {props.children}
      </Typography>
    );
  }
}
