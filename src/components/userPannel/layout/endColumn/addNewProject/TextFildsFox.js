import { useState } from "react";
import { atom, useRecoilState } from "recoil";
import { useImmer } from "use-immer";
import Icons from "../../../../../styles/__ready/Icons";
import Textfields, {
  TextFieldFUN_v5,
} from "../../../../../styles/__ready/Textfields";
import Typography from "../../../../../styles/__ready/Typography";
import Buttons from "../../../../../styles/__ready/Buttons";
import { Grid, css } from "@mui/material";
import { ProjectPost_Mutation } from "../../../../../helper/UserApiQueries";
import useToastReducer from "../../../../../recoil/reducer/useToastReducer";
import add_project_validation from "../../../../../validation/add_project_validation";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDynamicCssClass } from "../../../../../recoil/readStore";

export default function ({
  ms_2 = " ",
  pe_1 = " ",
  content = {
    inputLabelOne: " ",
    inputLabelTwo: " ",
    rightToLeft: " ",
    leftToRight: " ",
    continueButton: " ",
  },
  isFa = false,
}) {
  const navigate = useNavigate();
  const { isSuccess, isLoading, mutate, error, data } = ProjectPost_Mutation();
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
  });
  const setLoading = useToastReducer();
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
  async function submitForm() {
    const body = {
      createdBy: state.createdBy.value,
      projectName: state.projectName.value,
    };

    try {
      await add_project_validation(body);
      mutate(body);
      console.log(isSuccess);
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
      setLoading({
        isShow: false,
        message: error.massage,
      });
    }
  }

  useEffect(() => {
    if (isLoading) {
      setLoading({
        isShow: true,
        message: "",
      });
    }
  }, [isLoading]);
  if (isSuccess) {
    setLoading({
      isShow: false,
      message: "",
    });
    // data = {
    //   createdAt: "2023-05-07T10:56:14.762Z",
    //   createdBy: "dsfdsf",
    //   id: 127,
    //   numberOfRails: 1,
    //   projectName: "dfsdf",
    //   updatedAt: "2023-05-07T10:56:14.762Z",
    //   userId: 1,
    // }
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
