import { useEffect } from "react";
import { useDynamicCssClass } from "../../../../../../recoil/readStore";
import Icons from "../../../../../../styles/__ready/Icons";
import Typography from "../../../../../../styles/__ready/Typography";
import Buttons from "../../../../../../styles/__ready/Buttons";
export default function ({
  language = "",
  showPutProjectResponse = {
    createdAt: "",
    createdBy: "createdBy1",
    direction: "left",
    id: 4,
    products: [],
    projectName: "projectname1",
    rails: [],
    updatedAt: "2023-06-07T12:18:52.000Z",
    userId: 1,
  },
  setShowPutProjectResponse = () => {},
}) {
  const cssClass = useDynamicCssClass();

  function getDirectionText_Based_laguage(language) {
    console.log(language);
    let string = "";
    if (language == "fa") {
      if ("right") string = " راست به چپ";
      if ("left") string = "چپ به راست";
    }
    if (language == "en") {
      if ("right") string = "right to left";
      if ("left") string = "left to right";
    }
    if (language == "tr") {
      if ("right") string = "sağdan sola";
      if ("left") string = "soldan sağa";
    }

    return string;
  }
  useEffect(() => {
    return () => {
      setShowPutProjectResponse(null);
    };
  }, []);
  function onClickaddNewProject() {
    // when  ite object will give empty success will be apear
    setShowPutProjectResponse(null);
  }
  return (
    <div className="w-100">
      <header className="w-100 d-flex justify-content-center pt-5">
        <Typography.H5 className="color-primary">
          پروژه شما با موفقیت ویرایش شد
        </Typography.H5>
      </header>
      <main className="w-100 d-flex justify-content-center">
        <div className="add-project-success mt-4">
          <header className="w-100 d-flex justify-content-center my-3">
            <span
              className="success-logo "
              style={{
                width: "48.11px",
                height: "48.11px",
              }}
            >
              <Icons.Cheked />
            </span>
          </header>
          <footer className="d-flex flex-column align-items-center">
            <Typography.H7 className="font-500">
              {showPutProjectResponse.projectName}
            </Typography.H7>
            <section className="d-flex mt-2">
              <span className={cssClass.me_1}>
                <Icons.Persion />
              </span>
              <Typography.H7 className="font-400">
                {showPutProjectResponse.createdBy}
              </Typography.H7>
            </section>
            <section className="d-flex mt-3">
              <span className={cssClass.me_1}>
                <Icons.Direction pathClassName="fill_secondray_v1" />
              </span>
              <Typography.H7 className="font-400">
                {getDirectionText_Based_laguage(language)}
              </Typography.H7>
            </section>
            <section className="d-flex mt-2">
              <span className={cssClass.me_1}>
                <Icons.Stack pathClassName="fill_secondray_v1" />
              </span>
              <Typography.H7 className="font-400">
                {showPutProjectResponse.products?.length} لیبل
              </Typography.H7>
            </section>
          </footer>
        </div>
      </main>
      <footer className="w-100 d-flex justify-content-center align-item-center mt-5">
        <Buttons.Outlined
          className="button_medium_v01"
          onClick={onClickaddNewProject}
        >
          <span>
            <Icons.AddNewProject classNameForPath="fill_primary" />
          </span>
          <Typography.H7 className={`font-300 ${cssClass.ms_1}`}>
            پروژه جدید
          </Typography.H7>
        </Buttons.Outlined>
        <Buttons.Contained className={"button_medium_v01 " + cssClass.ms_2}>
          <span>
            <Icons.PrintLight />
          </span>
          <Typography.H7 className={`font-300 ${cssClass.ms_1}`}>
            چاپ
          </Typography.H7>
        </Buttons.Contained>
      </footer>
    </div>
  );
}
