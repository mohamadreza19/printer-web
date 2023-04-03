import { Grid } from "@mui/material";
import { useDynamicCssClass } from "../../../../../../../../../../../recoil/readStore/index";
import {
  Angle,
  Barcode,
  CubeSpace,
  Delete,
  Down,
  DropDown,
  Duplicate,
  JoinColumn,
  JoinRow,
  LeftToRight,
  OneTwo,
  Redo,
  RightToLeft,
  SpliteColumn,
  SpliteRow,
  Text,
  TextBold,
  TextCenter,
  TextItalic,
  TextLeft,
  TextRight,
  TextSize,
  TextUnderLine,
  Undo,
  Up,
} from "../../../../../../../../../../../styles/__ready/EditorIcons";
import Typography from "../../../../../../../../../../../styles/__ready/Typography";
import ColumnFive from "./ColumnFive";
import ColumnFour from "./ColumnFour";
import ColumnOne from "./ColumnOne";
import ColumnThree from "./ColumnThree";
import ColumnTwo from "./ColumnTwo";

export default function () {
  const cssClass = useDynamicCssClass();

  return (
    <div className="bg-white border-r-top-20 dir-rtl">
      <div
        style={{
          width: "100%",
          height: "15.17vh",
          padding: "0 2rem",
        }}
        className=" bg_gray2  border-r-20 d-flex align-items-center py-4"
      >
        <ColumnOne />
        <ColumnTwo />
        <ColumnThree />
        <ColumnFour />
        <ColumnFive />
      </div>
    </div>
  );
}
