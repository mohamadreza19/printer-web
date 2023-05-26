import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../../../recoil/readStore";
import Buttons from "../../../../../styles/__ready/Buttons";
import Icons from "../../../../../styles/__ready/Icons";
import Typography from "../../../../../styles/__ready/Typography";

import useCachedLanguage from "../../../../../utility/useCachedLanguage";
import formatDate from "../../../../../utility/useFormetDate";
export default function ({
  project = {
    id: "",
    printsCount: "",
    projectName: "",
    createdBy: "",
    createdAt: "",
  },
  language = "",
}) {
  const cssClass = useDynamicCssClass();
  const { value: currentLanguage } = useCachedLanguage();
  const content = useContent_Based_Language();

  const ActionButton = () => {
    return (
      <div className={"d-flex align-items-center "}>
        <Typography.Body2
          className={`font-300 font ${cssClass.me_4} ${
            currentLanguage != "fa" && "font-English"
          }`}
        >
          <span>{project.printsCount}</span>
          <span>{content.userPannel.end_col.historyOfPrinting.print}</span>
        </Typography.Body2>
        <Buttons.Contained_Custom className="bg_primary py-3 px-3   ">
          <Icons.Print />
          <Typography.H9 className={"font-400 " + cssClass.ms_1}>
            {content.userPannel.end_col.historyOfPrinting.reprint}
          </Typography.H9>
        </Buttons.Contained_Custom>
      </div>
    );
  };
  return (
    <div className="w-100 bg-white border py-2 px-1 d-flex align-items-center justify-content-between  border-r-25 mb-2 ">
      <section className=" d-flex align-items-center justify-content-between">
        <Typography.Body2 className={"font-500 " + cssClass.ms_3}>
          {project.projectName}
        </Typography.Body2>
      </section>
      <div className="d-flex ">
        <section className={"d-flex align-item-center " + cssClass.me_5}>
          <div className={"position-relative " + cssClass.left_3_9rem}>
            <Typography.Body2 className={"font-300 "}>
              <span className={cssClass.me_1}>
                <Icons.Persion />
              </span>
              {project.createdBy}
            </Typography.Body2>
          </div>

          <div className={" position-relative " + cssClass.right_5rem}>
            <Typography.Body2 className={"font-300 " + cssClass.ms_3}>
              {formatDate(project.createdAt, language)}
            </Typography.Body2>
          </div>
        </section>
      </div>
      <ActionButton />
    </div>
  );
}
