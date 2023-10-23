import {
  useContent_Based_Language,
  useDynamicCssClass,
  useLanguage,
} from "../../../../../../../../recoil/readStore";
import Icons from "../../../../../../../../styles/__ready/Icons";
import Typography from "../../../../../../../../styles/__ready/Typography";
import Buttons from "../../../../../../../../styles/__ready/Buttons";
import { useRecoilValue, useSetRecoilState } from "recoil";
import profile_store from "../../../../../../../../recoil/store/user/profile_store";
import project_store from "../../../../../../../../recoil/store/user/project_store";
import useBundleProject from "../../../../../../../../utility/useBundleProject";
import { EditProject_Mutation } from "../../../../../../../../reactQuery/user/callPutServices";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showPutProjectResponse } from "../../../../../../../../recoil/store/user/showPutProjectResponse";
import useScreenShot from "../../../../../../../../utility/useScreenShot";
import { FormatColorResetRounded } from "@mui/icons-material";

export default function () {
  const language = useLanguage();
  const { projectId } = useParams();

  const beForward = language == "fa" ? true : false;
  const cssClass = useDynamicCssClass();
  const content =
    useContent_Based_Language().userPannel.editor.endColumn.rootHeader;
  const navigate = useNavigate();

  const profile_state = useRecoilValue(profile_store);
  const project_state = useRecoilValue(project_store);

  const setShowPutProjectResponse = useSetRecoilState(showPutProjectResponse);

  const mutate = EditProject_Mutation();

  const handle_bundled_project = useBundleProject();

  const autoPrint = useScreenShot();

  function handleSubmitProject() {
    mutate.mutate({
      body: handle_bundled_project(),
    });
  }

  useEffect(() => {
    if (mutate.isSuccess) {
      setShowPutProjectResponse(mutate.data);
      navigate("/user/add-project");
    }
  }, [mutate.isSuccess]);
  return (
    <header className="w-100 d-flex align-items-center justify-content-between  pt-4 px-4">
      <article className="d-flex">
        <section className="d-flex dir-ltr">
          <Typography.H8 language="en" className="">
            @{profile_state.username}
          </Typography.H8>
          <Icons.UserName svgClassName="mx-2" />
        </section>
        <section className="d-flex">
          <Icons.Back
            svgClassName="mx-3"
            size="small"
            pathClassName="fill_disabled"
            beForward={beForward}
          />
          <Typography.H8 className="">{content.addNewProject}</Typography.H8>
        </section>
        <section className="d-flex">
          <Icons.Back
            svgClassName="mx-3"
            size="small"
            pathClassName="fill_disabled"
            beForward={beForward}
          />
          <Typography.H8 className="">
            {project_state.projectName}
          </Typography.H8>
        </section>
        <section className="d-flex">
          <Icons.Back
            svgClassName="mx-3"
            size="small"
            pathClassName="fill_disabled"
            beForward={beForward}
          />
          <Typography.H8 className="">{content.editor}</Typography.H8>
        </section>
      </article>
      <article className="d-flex">
        <Buttons.Outlined
          onClick={() => autoPrint("IMAGE")}
          className="editor-header-button_extra-medium"
        >
          <Icons.Editor_ExportFile size="large" />
          <Typography.H7 className={cssClass.ms_1}>
            {content.Output}
          </Typography.H7>
        </Buttons.Outlined>
        <Buttons.Contained
          onClick={() => autoPrint("PRODUCT", projectId)}
          className="editor-header-button_extra-small mx-3"
        >
          <Icons.Editor_Print size="large" />
          <Typography.H7 className={cssClass.ms_1 + " font-300"}>
            {content.print}
          </Typography.H7>
        </Buttons.Contained>
        <Buttons.Contained
          className="editor-header-button_extra-large"
          onClick={handleSubmitProject}
        >
          <Icons.Editor_Save size="medium" />
          <Typography.H7 className={cssClass.ms_1 + " font-300"}>
            {content.saveAndContinue}
          </Typography.H7>
        </Buttons.Contained>
      </article>
    </header>
  );
}
