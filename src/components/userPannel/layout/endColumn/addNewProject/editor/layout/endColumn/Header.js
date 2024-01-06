import {
  useContent_Based_Language,
  useDynamicCssClass,
  useLanguage,
} from "../../../../../../../../recoil/readStore";
import Icons from "../../../../../../../../styles/__ready/Icons";
import Typography from "../../../../../../../../styles/__ready/Typography";
import Buttons from "../../../../../../../../styles/__ready/Buttons";
import { useRecoilValue, useSetRecoilState } from "recoil";
import profile_store, {
  useGetUserProfile,
} from "../../../../../../../../recoil/store/user/profile_store";
import project_store from "../../../../../../../../recoil/store/user/project_store";
import useBundleProject from "../../../../../../../../utility/useBundleProject";
import { EditProject_Mutation } from "../../../../../../../../reactQuery/user/callPutServices";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showPutProjectResponse } from "../../../../../../../../recoil/store/user/showPutProjectResponse";
import useScreenShot from "../../../../../../../../utility/useScreenShot";
import { FormatColorResetRounded } from "@mui/icons-material";
import useLocalStorage from "react-use-localstorage";
import { EditTemplate_project_Mutation } from "../../../../../../../../reactQuery/admin/callPutService";
import { useSetBorderToProntState } from "../../../../../../../../recoil/userEditorStore/bordersToPrint";

const PROJECT_EDIT = "project/edit";
const PROJECT_TEMPLATES_EDIT = "project-templates/edit";

export default function () {
  const [editor_access, _] = useLocalStorage("editor_access");
  const language = useLanguage();
  const { projectId } = useParams();
  const profile = useGetUserProfile();
  const beForward = language == "fa" ? true : false;
  const cssClass = useDynamicCssClass();
  const content =
    useContent_Based_Language().userPannel.editor.endColumn.rootHeader;
  const navigate = useNavigate();

  const profile_state = useRecoilValue(profile_store);
  const project_state = useRecoilValue(project_store);
  const setBordersToPrint = useSetBorderToProntState(); //NONE, ALL, HORIZONTAL, VERTICAL

  const setShowPutProjectResponse = useSetRecoilState(showPutProjectResponse);

  const project_mutate = EditProject_Mutation();
  const project_template_mutate = EditTemplate_project_Mutation();

  const handle_bundled_project = useBundleProject();

  const autoPrint = useScreenShot();

  function handleSetBordersToPrint(e) {
    const checkbox_horizontal = document.getElementById("checkbox-horizontal");

    const checkbox_vertical = document.getElementById("checkbox-vertical");

    if (e.target.checked) {
      if (
        checkbox_horizontal.isEqualNode(e.target) &&
        checkbox_vertical.checked === false
      ) {
        setBordersToPrint("HORIZONTAL");
      }
      if (
        checkbox_vertical.isEqualNode(e.target) &&
        checkbox_horizontal.checked === false
      ) {
        setBordersToPrint("VERTICAL");
      }
      if (checkbox_vertical.checked && checkbox_horizontal.checked) {
        setBordersToPrint("ALL");
      }
    } else {
      if (
        checkbox_horizontal.isEqualNode(e.target) &&
        checkbox_vertical.checked === true
      ) {
        setBordersToPrint("VERTICAL");
      }
      if (
        checkbox_vertical.isEqualNode(e.target) &&
        checkbox_horizontal.checked === true
      ) {
        setBordersToPrint("HORIZONTAL");
      }
      if (!checkbox_vertical.checked && !checkbox_horizontal.checked) {
        setBordersToPrint("NONE");
      }
    }
  }

  function handleSubmitProject() {
    switch (editor_access) {
      case PROJECT_EDIT:
        // return console.log(handle_bundled_project());

        project_mutate.mutate({
          body: handle_bundled_project(),
        });
        break;
      case PROJECT_TEMPLATES_EDIT:
        project_template_mutate.mutate({
          body: handle_bundled_project(),
        });
        break;

      default:
        break;
    }
    // mutate.mutate({
    //   body: handle_bundled_project(),
    // });
  }

  if (project_mutate.isSuccess || project_template_mutate.isSuccess) {
    if (editor_access === PROJECT_EDIT) {
      setShowPutProjectResponse(project_mutate.data);
      navigate("/user/add-project");
    }
    if (editor_access === PROJECT_TEMPLATES_EDIT) {
      navigate("/admin/list-labels-products");
    }
  }
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
        <main
          style={{
            columnGap: "15px",
          }}
          className="mx-3 d-flex align-items-center"
        >
          <div class="form-check">
            <input
              onChange={handleSetBordersToPrint}
              class="form-check-input"
              type="checkbox"
              id="checkbox-vertical"
            />
            <label class="form-check-label" for="flexCheckDefault">
              <Typography.H8>چاپ خطوط عمودی</Typography.H8>
            </label>
          </div>
          <div class="form-check">
            <input
              onChange={handleSetBordersToPrint}
              class="form-check-input"
              type="checkbox"
              id="checkbox-horizontal"
            />
            <label class="form-check-label" for="flexCheckDefault">
              <Typography.H8>چاپ خطوط افقی</Typography.H8>
            </label>
          </div>
        </main>
        <div className="d-flex">
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
        </div>
      </article>
    </header>
  );
}
