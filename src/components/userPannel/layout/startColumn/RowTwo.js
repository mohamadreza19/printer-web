import Icons from "../../../../styles/__ready/Icons";
import Buttons from "../../../../styles/__ready/Buttons";
import Typography from "../../../../styles/__ready/Typography";
import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../../recoil/readStore";
import { Link, useLocation } from "react-router-dom";
import { UserRoutePath } from "../../../../routes/Routes";
export default function () {
  const { pathname } = useLocation();

  const cssClass = useDynamicCssClass();
  const content = useContent_Based_Language();
  const buttonsText = content.userPannel.start_col.row2;
  const colorClass = true
    ? "bg_secondray box_shadow_disabled"
    : "bg_primary box_shadow_disabled";
  const ListOfProject = () => {
    const dynamicColor = pathname.includes("project-list")
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
      <Link to={UserRoutePath.projectList}>
        <Buttons.Contained_Custom
          className={
            "w-100 d-flex justify-content-start py-3  px-3 mb-3 border-r-20 " +
            dynamicColor.bg
          }
        >
          <Icons.List className={dynamicColor.fill} />
          <Typography.H7
            className={`font-200 ${cssClass.ms_2} ${dynamicColor.color}`}
          >
            {buttonsText.listOfProjects}
          </Typography.H7>
        </Buttons.Contained_Custom>
      </Link>
    );
  };
  const AddProject = () => {
    // const bg = pathname.includes("add-project")
    //   ? "bg_primary box_shadow_disabled"
    //   : "bg_secondray box_shadow_disabled";
    const dynamicColor = pathname.includes("add-project")
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
      <Link to={UserRoutePath.createProject}>
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
            {buttonsText.addNewProject}
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
      <ListOfProject />
      <AddProject />
      <LabelList />
      <History />
      <Setting />
    </div>
  );
}
