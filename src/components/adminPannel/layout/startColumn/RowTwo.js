import Icons from "../../../../styles/__ready/Icons";
import Buttons from "../../../../styles/__ready/Buttons";
import Typography from "../../../../styles/__ready/Typography";
import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../../recoil/readStore";
import { Link, useLocation } from "react-router-dom";
import { AdminRoutePath, UserRoutePath } from "../../../../routes/Routes";
export default function () {
  const { pathname } = useLocation();

  const cssClass = useDynamicCssClass();
  const content = useContent_Based_Language();
  // const buttonsText = content.userPannel.start_col.row2;
  const buttonsText = {
    controlPannel: content.AdminPannel.start_col.row2.controlPannel,
    addNewProject: content.userPannel.start_col.row2.addNewProject,
    projectList: content.userPannel.start_col.row2.projectList,
    projectList: content.userPannel.start_col.row2.projectList,
    listOfLabels: content.userPannel.start_col.row2.listOfLabels,
    historyOfPrinting: content.userPannel.start_col.row2.historyOfPrinting,
    settings: content.userPannel.start_col.row2.settings,
  };
  const colorClass = true
    ? "bg_secondray box_shadow_disabled"
    : "bg_primary box_shadow_disabled";
  const ControlPannel = () => {
    const dynamicColor = pathname.includes("control-pannel")
      ? {
          bg: "bg_primary box_shadow_disabled",
          color: "color-white ",
          fill: "fill_white",
        }
      : {
          bg: "bg_secondray box_shadow_disabled",
          color: "color_secondray_v2",
          fill: "fill_secondray_v2",
        };

    return (
      <Link to={AdminRoutePath.controlPannel}>
        <Buttons.Contained_Custom
          className={
            "w-100 d-flex justify-content-start py-3  px-3 mb-3 border-r-20 " +
            dynamicColor.bg
          }
        >
          <Icons.managingPannel pathClassName={dynamicColor.fill} />
          <Typography.H7
            className={`font-200 ${cssClass.ms_2} ${dynamicColor.color}`}
          >
            {buttonsText.controlPannel}
          </Typography.H7>
        </Buttons.Contained_Custom>
      </Link>
    );
  };
  // const ListOfProject = () => {
  //   const dynamicColor = pathname.includes("project-list")
  //     ? {
  //         bg: "bg_primary box_shadow_disabled",
  //         color: "color-white ",
  //         fill: "fill_white",
  //       }
  //     : {
  //         bg: "bg_secondray box_shadow_disabled",
  //         color: "color_secondray_v2",
  //         fill: "fill_secondray_v2",
  //       };

  //   return (
  //     <Link to={UserRoutePath.projectList}>
  //       <Buttons.Contained_Custom
  //         className={
  //           "w-100 d-flex justify-content-start py-3  px-3 mb-3 border-r-20 " +
  //           dynamicColor.bg
  //         }
  //       >
  //         <Icons.List className={dynamicColor.fill} />
  //         <Typography.H7
  //           className={`font-200 ${cssClass.ms_2} ${dynamicColor.color}`}
  //         >
  //           {buttonsText.listOfProjects}
  //         </Typography.H7>
  //       </Buttons.Contained_Custom>
  //     </Link>
  //   );
  // };
  const AddProject_OrLanel = () => {
    // const bg = pathname.includes("add-project")
    //   ? "bg_primary box_shadow_disabled"
    //   : "bg_secondray box_shadow_disabled";
    const dynamicColor = pathname.includes("add-product-label")
      ? {
          bg: "bg_primary box_shadow_disabled",
          color: "color-white ",
          fill: "fill_white",
        }
      : {
          bg: "bg_secondray box_shadow_disabled",
          color: "color_secondray_v2",
          fill: "fill_secondray_v2",
        };
    return (
      <Link to={AdminRoutePath.addProduct_Or_Label}>
        <Buttons.Contained_Custom
          className={
            "w-100 d-flex justify-content-start py-3  border-r-20  px-3 mb-3 " +
            dynamicColor.bg
          }
        >
          <Icons.AddNewProject classNameForPath={dynamicColor.fill} />
          <Typography.H7
            className={`font-200   ${cssClass.ms_2} ${dynamicColor.color}`}
          >
            {" "}
            {content.AdminPannel.start_col.row2.addNewProductAndLabel}
          </Typography.H7>
        </Buttons.Contained_Custom>
      </Link>
    );
  };
  const LabelList = () => {
    const dynamicColor = pathname.includes("label-list")
      ? {
          bg: "bg_primary box_shadow_disabled",
          color: "color-white ",
          fill: "fill_white",
        }
      : {
          bg: "bg_secondray box_shadow_disabled",
          color: "color_secondray_v2",
          fill: "fill_secondray_v2",
        };
    return (
      <Link to={UserRoutePath.labelList}>
        <Buttons.Contained_Custom
          className={
            "w-100 d-flex justify-content-start py-3  border-r-20  px-3 mb-3 " +
            dynamicColor.bg
          }
        >
          <Icons.Labels classNameForPath={dynamicColor.fill} />
          <Typography.H7
            className={`font-200   ${cssClass.ms_2} ${dynamicColor.color}`}
          >
            {buttonsText.listOfLabels}
          </Typography.H7>
        </Buttons.Contained_Custom>
      </Link>
    );
  };
  const History = () => {
    const dynamicColor = pathname.includes("prining-history")
      ? {
          bg: "bg_primary box_shadow_disabled",
          color: "color-white ",
          fill: "fill_white",
        }
      : {
          bg: "bg_secondray box_shadow_disabled",
          color: "color_secondray_v2",
          fill: "fill_secondray_v2",
        };
    return (
      <Link to={UserRoutePath.priningHistory}>
        <Buttons.Contained_Custom
          className={
            "w-100 d-flex justify-content-start py-3  px-3  border-r-20 mb-3 " +
            dynamicColor.bg
          }
        >
          <Icons.History classNameForPath={dynamicColor.fill} />
          <Typography.H7
            className={`font-200   ${cssClass.ms_2} ${dynamicColor.color}`}
          >
            {buttonsText.historyOfPrinting}
          </Typography.H7>
        </Buttons.Contained_Custom>
      </Link>
    );
  };
  const Setting = () => {
    return (
      <Buttons.Contained_Custom
        className={
          "w-100 d-flex justify-content-start py-3  px-3 border-r-20 " +
          colorClass
        }
      >
        <Icons.Setting />
        <Typography.H7 className={"font-200 " + cssClass.ms_2}>
          {buttonsText.settings}
        </Typography.H7>
      </Buttons.Contained_Custom>
    );
  };

  return (
    <div className="w-100  mt-4">
      <ControlPannel />
      <AddProject_OrLanel />

      <LabelList />
      <History />
      <Setting />
    </div>
  );
}
