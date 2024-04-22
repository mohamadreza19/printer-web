import { Grid } from "@mui/material";
import Buttons from "../../../../../../styles/__ready/Buttons";
import Typography from "../../../../../../styles/__ready/Typography";
import TextFields from "../../../../../../styles/__ready/Textfields";
import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../../../../recoil/readStore";
import PopUp from "./popUp";
import { useContext_ } from "./adminHistory.context";

export default function ({
  justProduct = "",
  justLabel = "",
  setJustProduct = () => {},
  setJustLabel = () => {},
}) {
  const content = useContent_Based_Language();
  const cssClass = useDynamicCssClass();
  const { state, dispatch } = useContext_();
  const AllPrints = () => {
    function onClick() {
      dispatch({
        type: "ALL",
      });
    }
    const background =
      state.just_product === false &&
      state.just_label == false &&
      !state.user.id
        ? "bg_primary"
        : "button_contained_v2";
    return (
      <Buttons.Contained_Custom
        className={"button_medium my-2 box_shadow_disabled " + background}
        onClick={onClick}
      >
        <Typography.H8 className="font-400 ">
          {content.AdminPannel.end_col.controlPannel.history.allPrints}
        </Typography.H8>
      </Buttons.Contained_Custom>
    );
  };
  const OnlyProducts = () => {
    const background = state.just_product
      ? "bg_primary"
      : "button_contained_v2";
    function onClick() {
      dispatch({
        type: "PRODUCT/CHANGE",
      });
    }
    return (
      <Buttons.Contained_Custom
        className={"button_medium my-2 box_shadow_disabled mx-2 " + background}
        onClick={onClick}
      >
        <Typography.H8 className="font-400 ">
          {content.AdminPannel.end_col.controlPannel.history.onlyProducts}
        </Typography.H8>
      </Buttons.Contained_Custom>
    );
  };
  const OnlyLabels = () => {
    const background = state.just_label ? "bg_primary" : "button_contained_v2";
    function onClick() {
      dispatch({
        type: "LABEL/CHANGE",
      });
    }
    return (
      <Buttons.Contained_Custom
        onClick={onClick}
        className={"button_medium me-2 my-2  box_shadow_disabled " + background}
      >
        <Typography.H8 className="font-400 ">
          {content.AdminPannel.end_col.controlPannel.history.onlyLabels}
        </Typography.H8>
      </Buttons.Contained_Custom>
    );
  };
  const OnlyUsers = () => {
    const background = justLabel ? "bg_primary" : "button_contained_v2";
    function onClick() {
      dispatch({
        type: "POPUP/CHANGE",
      });
    }
    return (
      <button
        className="button_medium border-r-20"
        style={{}}
        onClick={onClick}
      >
        <Typography.H8 className="font-400 ">
          {state.user.value ? state.user.value : "انتخاب یوزر"}
        </Typography.H8>
      </button>
    );
  };
  return (
    <Grid container className="px-4">
      <Grid item lg={6}>
        <AllPrints />
        <OnlyProducts />
        <OnlyLabels />
        <OnlyUsers />
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
      <PopUp />
    </Grid>
  );
}
