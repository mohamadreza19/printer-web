import { useState } from "react";

import Icons from "../../../../../styles/__ready/Icons";
import { TextFieldFUN_v5 } from "../../../../../styles/__ready/Textfields";
import Typography from "../../../../../styles/__ready/Typography";
import Buttons from "../../../../../styles/__ready/Buttons";
import { Grid } from "@mui/material";

import add_project_validation from "../../../../../validation/add_project_validation";

import { useNavigate } from "react-router-dom";
import { useDynamicCssClass } from "../../../../../recoil/readStore";
import { AddProject_Mutation } from "../../../../../reactQuery/user/callPostServices";
import { ColumnFour_justify_start } from "../../../../../recoil/userEditorStore/EditorHeaderActionButton";
import { useRecoilState } from "recoil";

export default function ({
  ms_2 = " ",
  pe_1 = " ",
  content = {
    inputLabelOne: " ",
    inputLabelTwo: " ",
    inputLabelThree: "",
    rightToLeft: " ",
    leftToRight: " ",
    continueButton: " ",
  },
  isFa = false,
}) {
  const [justify, setJustify] = useRecoilState(ColumnFour_justify_start);
  const navigate = useNavigate();
  const { isSuccess, isLoading, mutate, error, data } = AddProject_Mutation();
  const cssClass = useDynamicCssClass();
  const [state, setState] = useState({
    createdBy: {
      value: "",
      errMsg: "",
    },
    projectName: {
      value: "",
      errMsg: "",
    },
    railWidth: {
      value: "",
      errMsg: "",
    },
  });

  const [isRightToleft, setIsRightToleft] = useState(true);

  const handleToggleiSRightToleft = () => {
    setIsRightToleft(!isRightToleft);
  };

  const handleChangeProductName = (event) => {
    const value = event.target.value;

    setState((draft) => ({
      ...draft,
      projectName: {
        value,
        errMsg: "",
      },
    }));
  };

  const handleChangeCreatedBy = (event) => {
    const value = event.target.value;

    setState((draft) => ({
      ...draft,
      createdBy: {
        value,
        errMsg: "",
      },
    }));
  };
  const handleChangeRailWidth = (event) => {
    const value = event.target.value;

    setState((draft) => ({
      ...draft,
      railWidth: {
        value,
        errMsg: "",
      },
    }));
  };
  async function submitForm() {
    const direction = isRightToleft ? "right" : "left";
    setJustify(direction);
    const body = {
      createdBy: state.createdBy.value,
      projectName: state.projectName.value,
      railWidth: state.railWidth.value,
      direction,
    };

    try {
      await add_project_validation(body);

      mutate({ ...body, railWidth: +body.railWidth });
    } catch (error) {
      if (error.inner) {
        error.inner.map((err) => {
          const path = err.path;
          const errMsg = err.message;

          setState((draft) => ({
            ...draft,
            [path]: {
              ...[path],
              errMsg,
            },
          }));
        });
      }
    }
  }

  if (isSuccess) {
    navigate(`/user/add-project/editor/${data.id}`);
  }
  return (
    <div className={`w-100 mt-7 px-5 ${cssClass.ms_3}`}>
      <header className="px-3">
        <Typography.H7 className="font-500">{content.header}</Typography.H7>
      </header>
      <article className={"mt-4 w-60 " + cssClass.ms_2}>
        <Typography.H8 className={"mb-2 font-400 " + ms_2}>
          {content.inputLabelOne}
        </Typography.H8>
        <section className="w-100 position-relative">
          <TextFieldFUN_v5
            ImputclassName={ms_2}
            value={state.projectName.value}
            onChange={handleChangeProductName}
          />
          <span className="position-absolute color_danger">
            <Typography.H9>{state.projectName.errMsg}</Typography.H9>
          </span>
        </section>
      </article>

      <article className={"mt-4 w-60 " + cssClass.ms_2}>
        <Typography.H8 className={"mb-2 font-400 " + ms_2}>
          {content.inputLabelTwo}
        </Typography.H8>

        <section className="w-100 position-relative">
          <TextFieldFUN_v5
            ImputclassName={ms_2}
            value={state.createdBy.value}
            onChange={handleChangeCreatedBy}
          />
          <span className="position-absolute color_danger">
            <Typography.H9>{state.createdBy.errMsg}</Typography.H9>
          </span>
        </section>
      </article>
      <article className={"mt-4 w-60 " + cssClass.ms_2}>
        <Typography.H8 className={"mb-2 font-400 " + ms_2}>
          {content.inputLabelThree}
        </Typography.H8>

        <section className="w-100 position-relative">
          <TextFieldFUN_v5
            ImputclassName={ms_2}
            value={state.railWidth.value}
            onChange={handleChangeRailWidth}
          />
          <span className="position-absolute color_danger">
            <Typography.H9>{state.railWidth.errMsg}</Typography.H9>
          </span>
        </section>
      </article>

      <article className="d-flex align-item-center mt-7">
        <div
          style={{
            width: "80px",
            height: "45px",
            minWidth: "80px",
          }}
          className={`
          border-r-20 border d-flex dir-rtl ${
            isRightToleft ? "justify-content-start" : "justify-content-end"
          }`}
          onClick={handleToggleiSRightToleft}
        >
          <section
            className={`d-flex justify-content-center align-item-center border-r-circle 
          cur-pointer transition-all-v1  
          
          ${!isRightToleft && "rotate-180"}
          `}
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: "#F36523",
            }}
          >
            <Icons.Direction svgClassName="icon" />
          </section>
        </div>
        <section className={ms_2}>
          <Typography.H8 className="font-400">
            {isRightToleft ? content.rightToLeft : content.leftToRight}
          </Typography.H8>
        </section>
      </article>

      <article className="w-100 mt-5   pb-4 ">
        <Grid container className={"d-flex justify-content-end "}>
          <Grid item lg={3} md={5} sm={10} xs={10}>
            <Buttons.Contained
              className="w-100 button_large "
              onClick={submitForm}
            >
              <Typography.H6 className=" font-200 ">
                {content.continueButton}
              </Typography.H6>
            </Buttons.Contained>
          </Grid>
        </Grid>
      </article>
    </div>
  );
}
