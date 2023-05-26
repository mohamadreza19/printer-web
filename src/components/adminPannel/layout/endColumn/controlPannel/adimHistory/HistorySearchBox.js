import { Grid } from "@mui/material";
import Buttons from "../../../../../../styles/__ready/Buttons";
import Typography from "../../../../../../styles/__ready/Typography";
import TextFields from "../../../../../../styles/__ready/Textfields";
import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../../../../recoil/readStore";

export default function ({
  justProduct = "",
  justLabel = "",
  setJustProduct = () => {},
  setJustLabel = () => {},
}) {
  const content = useContent_Based_Language();
  const cssClass = useDynamicCssClass();
  const AllPrints = () => {
    function onClick() {
      setJustLabel(false);
      setJustProduct(false);
    }
    const background =
      justProduct === false && justLabel == false
        ? "bg_primary"
        : "button_contained_v2";
    return (
      <Buttons.Contained_Custom
        className={"button_medium  box_shadow_disabled " + background}
        onClick={onClick}
      >
        <Typography.H8 className="font-400 ">
          {content.AdminPannel.end_col.controlPannel.history.allPrints}
        </Typography.H8>
      </Buttons.Contained_Custom>
    );
  };
  const OnlyProducts = () => {
    const background = justProduct ? "bg_primary" : "button_contained_v2";
    function onClick() {
      setJustLabel(false);
      setJustProduct(true);
    }
    return (
      <Buttons.Contained_Custom
        className={"button_medium  box_shadow_disabled mx-2 " + background}
        onClick={onClick}
      >
        <Typography.H8 className="font-400 ">
          {content.AdminPannel.end_col.controlPannel.history.onlyProducts}
        </Typography.H8>
      </Buttons.Contained_Custom>
    );
  };
  const OnlyLabels = () => {
    const background = justLabel ? "bg_primary" : "button_contained_v2";
    function onClick() {
      setJustLabel(true);
      setJustProduct(false);
    }
    return (
      <Buttons.Contained_Custom
        onClick={onClick}
        className={"button_medium  box_shadow_disabled " + background}
      >
        <Typography.H8 className="font-400 ">
          {content.AdminPannel.end_col.controlPannel.history.onlyLabels}
        </Typography.H8>
      </Buttons.Contained_Custom>
    );
  };
  return (
    <Grid container className="px-4">
      <Grid item lg={6}>
        <AllPrints />
        <OnlyProducts />
        <OnlyLabels />
      </Grid>
      <Grid item lg={6} className={cssClass.ps_2}>
        <TextFields.v2_SearchBox
          Input_marginStart_based_Language={cssClass.ms_1}
          placeholder={
            content.AdminPannel.end_col.controlPannel.history
              .searchBoxPlaceHolder
          }
        />
      </Grid>
    </Grid>
  );
}
