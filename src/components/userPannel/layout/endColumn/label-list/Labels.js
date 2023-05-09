import { Grid } from "@mui/material";
import Label from "./Label";

export default function ({ labels }) {
  return (
    <div className="w-100 d-flex flex-wrap  justify-content-center px-4 mt-4 scrollable-label-list">
      {labels.map((label, index) => (
        <Label label={label} key={index} />
      ))}
    </div>
  );
}
