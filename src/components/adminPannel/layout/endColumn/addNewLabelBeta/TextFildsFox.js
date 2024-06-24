import { useState } from "react";

import Icons from "../../../../../styles/__ready/Icons";
import { TextFieldFUN_v5 } from "../../../../../styles/__ready/Textfields";
import Typography from "../../../../../styles/__ready/Typography";
import Buttons from "../../../../../styles/__ready/Buttons";
import { Grid } from "@mui/material";

import add_project_validation from "../../../../../validation/add_project_validation";

// import RowTwo from "@adminPanel/addNewLabel/RowTwo";
import RowTwo from "../addNewLabel/RowTwo";

import { useNavigate } from "react-router-dom";
import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../../../recoil/readStore";
import { AddProject_Mutation } from "../../../../../reactQuery/user/callPostServices";
import { ColumnFour_justify_start } from "../../../../../recoil/userEditorStore/EditorHeaderActionButton";
import { useRecoilState } from "recoil";
import { useGetAdminProfile } from "../../../../../recoil/store/admin/profile";
import { useEffect } from "react";
import {
  AdminAddLabel_Mutation,
  AdminAddProject_TemplatesMutation,
} from "../../../../../reactQuery/admin/callPostService";
import { EditTemplate_project_Mutation } from "../../../../../reactQuery/admin/callPutService";
import { t } from "i18next";

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
  const content_ =
    useContent_Based_Language().AdminPannel.end_col.addNew_Project_Or_Label
      .rowOne;
  const [justify, setJustify] = useRecoilState(ColumnFour_justify_start);
  const navigate = useNavigate();
  const adminProfileObj = useGetAdminProfile();
  const addlabel = AdminAddLabel_Mutation();

  const { isSuccess, isLoading, mutate, error, data } =
    AdminAddProject_TemplatesMutation();
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
      value: "1",
      errMsg: "",
    },
    Labelheight: {
      value: "1",
      errMsg: "",
    },
    name: {
      english: "",
      persian: "",
      turkish: "",
      err: "",
    },
  });

  const [projectTemplateRespinse, setProjectTemplateRespinse] = useState({});

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
    const value = event.target.value.replace(/\D/g, "");
    if (Number(value) < 1) return;
    setState((draft) => ({
      ...draft,
      railWidth: {
        value,
        errMsg: "",
      },
    }));
  };
  const handleChangeLabelWidth = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    if (Number(value) < 1) return;
    setState((draft) => ({
      ...draft,
      Labelheight: {
        value,
        errMsg: "",
      },
    }));
  };
  const setName = (nameObj) => {
    setState((draft) => ({
      ...draft,
      name: nameObj,
      projectName: {
        value: nameObj.english,
        errMsg: "",
      },
    }));
  };
  function handle_OnChange_SelectBox(e) {
    // console.log(e.target.value);
    navigate("/admin/" + e.target.value, {
      replace: true,
    });
  }
  // function handle_nameError(key, text) {
  //   setState({
  //     ...state,
  //     name: { ...state.name, [key]: {} },
  //   });
  // }
  useEffect(() => {
    if (adminProfileObj) {
      setState((draft) => ({
        ...draft,
        createdBy: {
          value: adminProfileObj.username,
          errMsg: "",
        },
      }));
    }
  }, [adminProfileObj]);

  async function addLabel() {
    const direction = isRightToleft ? "right" : "left";
    setJustify(direction);
    if (!state.name.persian) {
      // setState;
    }

    const body = {
      createdBy: state.createdBy.value,
      projectName: state.projectName.value,
      railWidth: Number(state.railWidth.value),
      direction,
      name: state.name,
    };

    try {
      return addlabel.mutate({
        ...body,
        width: Number(state.railWidth.value),
        height: Number(state.Labelheight.value),
      });
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
  async function addProject_template(labelId) {
    const direction = isRightToleft ? "right" : "left";
    setJustify(direction);

    const body = {
      createdBy: state.createdBy.value,
      projectName: state.projectName.value,
      railWidth: Number(state.railWidth.value),
      direction,
      name: state.name,
      labelId,
    };

    try {
      await add_project_validation(body);

      mutate(body);
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
  function put_projectTemplate() {
    const CustomLabel = {
      createdAt: "2023-11-05T05:59:23.450Z",
      updatedAt: "2023-11-05T05:59:23.450Z",

      frontId: "3-IP-IkJb",
      structure: {
        split: "none",
        content: {
          text: "",
          style: {
            createdAt: "2023-11-05T05:59:23.428Z",
            updatedAt: "2023-11-05T05:59:23.428Z",
            fontFamily: "Arial",
            fontStyle: "regular",
            fontSize: 14,
            angle: 0,
            textAlign: "none",
            textDirecton: "right",
            padding: 0,
            margin: 0,
          },
        },
        frontId: "3-IP-IkJb",
        isQrcode: false,
        isBarcode: false,
        isSelected: false,
      },
      product: {
        id: 10,
        createdAt: "2023-09-20T09:08:33.615Z",
        updatedAt: "2023-09-20T09:08:33.615Z",
        link: "https://web.telegram.org",
        width: 22,
        widthOfPrintingArea: 22,
        name: {
          id: 19,
          createdAt: "2023-09-20T09:08:33.608Z",
          updatedAt: "2023-09-20T09:08:33.608Z",
          english: "test22",
          persian: "test22",
          turkish: "test22",
        },
        admin: {
          id: 1,
          createdAt: "2023-08-19T09:48:27.498Z",
          updatedAt: "2023-08-19T09:48:27.498Z",
          username: "raad",
          firstName: "raad",
          lastName: "super admin",
          role: "superAdmin",
          deleteDate: null,
        },
      },
      productId: 10,
    };
  }
  useEffect(() => {
    if (addlabel.isSuccess) {
      const { id: labelId } = addlabel.data;
      addProject_template(labelId);
      navigate(`/admin/list-labels-products`);
    }
  }, [addlabel.isSuccess]);
  useEffect(() => {
    if (isSuccess) {
    }
  }, [isSuccess]);

  useEffect(() => {
    return () => {
      setState({
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
        Labelheight: {
          value: "",
          errMsg: "",
        },
        name: {
          english: "",
          persian: "",
          turkish: "",
        },
      });
    };
  }, []);
  return (
    <div className={`w-100 mt-7 px-5 ${cssClass.ms_3}`}>
      {/* <header className="px-3">
        <Typography.H7 className="font-500">{content.header}</Typography.H7>
      </header> */}
      <article className={"mt-3 " + cssClass.ms_3}>
        <select
          name="cars"
          id="cars"
          className="select-extra-large"
          onChange={handle_OnChange_SelectBox}
        >
          <option value="add-label-beta">
            <Typography.H8>{content_.addNewLabel}</Typography.H8>
          </option>
          <option value="add-product">
            <Typography.H8>{content_.addNewProduct}</Typography.H8>
          </option>
        </select>
      </article>
      <article
        style={{ marginBottom: "160px" }}
        className={"mt-4 w-60 " + cssClass.ms_2}
      >
        <RowTwo setName={setName} />
      </article>

      <article className={"mt-4 w-60 " + cssClass.ms_2}>
        <Typography.H8 className={"mb-2 font-400 " + ms_2}>
          {/* {content.inputLabelThree} */}
          {t("addNewLabel.labelWidth")} mm
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
      <article className={"mt-4 w-60 " + cssClass.ms_2}>
        <Typography.H8 className={"mb-2 font-400 " + ms_2}>
          {t("addNewLabel.labelLenth")} mm
        </Typography.H8>

        <section className="w-100 position-relative">
          <TextFieldFUN_v5
            ImputclassName={ms_2}
            value={state.Labelheight.value}
            onChange={handleChangeLabelWidth}
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
              onClick={addLabel}
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
