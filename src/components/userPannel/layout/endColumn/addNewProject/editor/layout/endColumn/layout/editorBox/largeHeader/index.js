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
  const Divider = () => {
    return <div className="editor-cell-divider mx-0_8rem"></div>;
  };
  return (
    <div className=" bg-white border-r-top-20 dir-rtl">
      <div
        style={{
          //   width: "850px",
          height: "110px",
          //   padding: "0 1rem",
        }}
        className="w-100 bg_gray2  border-r-20 d-flex align-items-center justify-content-center  "
      >
        <ColumnOne />
        <Divider />
        <ColumnTwo />
        <ColumnThree />
        <ColumnFour />
        <Divider />
        <ColumnFive />
      </div>
    </div>
  );
}
