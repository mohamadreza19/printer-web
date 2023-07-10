import { useNavigate } from "react-router-dom";
import { useDynamicCssClass } from "../../../../../recoil/readStore";
import Buttons from "../../../../../styles/__ready/Buttons";
import Icons from "../../../../../styles/__ready/Icons";
import Typography from "../../../../../styles/__ready/Typography";
import useScreenShot from "../../../../../utility/useScreenShot";

export default function ({
  project = {
    id: "0",
    projectName: "",
    createdBy: "",
    productsCount: "",
  },
  showDeleteMassge = () => {},
}) {
  const getScreen = useScreenShot();
  const cssClass = useDynamicCssClass();
  const navigate = useNavigate();
  const ActionButton = () => {
    function navigateEditorById() {
      navigate(`/user/add-project/editor/${project.id}`);
    }
    function openNewTabAndPrint() {
      window.open(
        `/user/add-project/editor/${project.id}?autoPrint=true`,
        "_blank"
      );
      // getScreen();
    }
    return (
      <div className={"d-flex align-items-center cur-pointer "}>
        <div className="" onClick={showDeleteMassge}>
          <Icons.Trash />
        </div>

        <div className="mx-4" onClick={navigateEditorById}>
          <Icons.Edit />
        </div>
        <Buttons.Contained_Custom
          className="bg_primary py-3 px-3"
          onClick={openNewTabAndPrint}
        >
          <Icons.Print />
        </Buttons.Contained_Custom>
      </div>
    );
  };
  const ProjectName_Box = () => {
    return (
      <section className=" d-flex align-items-center justify-content-between">
        <Typography.Body2 className={"font-500 " + cssClass.ms_3}>
          {project.projectName}
        </Typography.Body2>
      </section>
    );
  };
  const CreatedBy_Box = () => {
    return (
      <>
        <Typography.Body2 className={"font-300 " + cssClass.ms_3}>
          <span className={cssClass.me_1}>
            <Icons.Persion />
          </span>
          {project.createdBy}
        </Typography.Body2>
      </>
    );
  };
  return (
    <div className="w-100 bg-white border py-2 px-1 d-flex align-items-center  border-r-25 mb-2">
      <ProjectName_Box />
      <div className={"d-flex  " + cssClass.ms_auto}>
        <article className={"d-flex align-item-center " + cssClass.me_5}>
          <CreatedBy_Box />
          <div>
            <Typography.Body2 className={"font-300 " + cssClass.ms_3}>
              <span className={cssClass.me_1}>
                <Icons.Stack />
              </span>
              {project.productsCount}محصول
            </Typography.Body2>
          </div>
          <div>
            <Typography.Body2 className={"font-300 " + cssClass.ms_3}>
              <span className={cssClass.me_1}>
                <Icons.LeftDirection />
              </span>
              راست به چپ
            </Typography.Body2>
          </div>
        </article>
        <ActionButton />
      </div>
    </div>
  );
}
