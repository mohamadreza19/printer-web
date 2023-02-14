import Icons from "../../../../styles/__ready/Icons";
import Buttons from "../../../../styles/__ready/Buttons";
import Typography from "../../../../styles/__ready/Typography";
import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../../recoil/readStore";
export default function () {
  const cssClass = useDynamicCssClass();
  const content = useContent_Based_Language();
  const buttonsText = content.userPannel.start_col.row2;
  const colorClass = true
    ? "bg_secondray box_shadow_disabled"
    : "bg_primary box_shadow_disabled";
  const ListOfProject = () => {
    return (
      <Buttons.Contained_Custom
        className={
          "w-100 d-flex justify-content-start py-3_5rm  px-3 mb-3 border-r-20 " +
          colorClass
        }
      >
        <Icons.List />
        <Typography.H6 className={"font-200 " + cssClass.ms_2}>
          {buttonsText.listOfProjects}
        </Typography.H6>
      </Buttons.Contained_Custom>
    );
  };
  const AddProject = () => {
    return (
      <Buttons.Contained_Custom
        className={
          "w-100 d-flex justify-content-start py-3_5rm  border-r-20  px-3 mb-3 " +
          colorClass
        }
      >
        <Icons.AddNewProject />
        <Typography.H6 className={"font-200 " + cssClass.ms_2}>
          {buttonsText.addNewProject}
        </Typography.H6>
      </Buttons.Contained_Custom>
    );
  };
  const LabelList = () => {
    return (
      <Buttons.Contained_Custom
        className={
          "w-100 d-flex justify-content-start py-3_5rm  border-r-20  px-3 mb-3 " +
          colorClass
        }
      >
        <Icons.Labels />
        <Typography.H6 className={"font-200 " + cssClass.ms_2}>
          {buttonsText.listOfLabels}
        </Typography.H6>
      </Buttons.Contained_Custom>
    );
  };
  const History = () => {
    return (
      <Buttons.Contained_Custom
        className={
          "w-100 d-flex justify-content-start py-3_5rm  px-3  border-r-20 mb-3 " +
          colorClass
        }
      >
        <Icons.History />
        <Typography.H6 className={"font-200 " + cssClass.ms_2}>
          {buttonsText.historyOfPrinting}
        </Typography.H6>
      </Buttons.Contained_Custom>
    );
  };
  const Setting = () => {
    return (
      <Buttons.Contained_Custom
        className={
          "w-100 d-flex justify-content-start py-3_5rm  px-3 " + colorClass
        }
      >
        <Icons.Setting />
        <Typography.H6 className={"font-200 " + cssClass.ms_2}>
          {buttonsText.settings}
        </Typography.H6>
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
