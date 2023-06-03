import Buttons from "../../../../../styles/__ready/Buttons";
import { Grid } from "@mui/material";
import Typography from "../../../../../styles/__ready/Typography";
import useCachedLanguage from "../../../../../utility/useCachedLanguage";
import { useContent_Based_Language } from "../../../../../recoil/readStore";
import { Link, useNavigate } from "react-router-dom";

import {
  AdminActive_users,
  AdminPrintsStatistics,
  AdminProduct_Label_Count,
} from "../../../../../reactQuery/admin/callGetService";
export default function () {
  const { value: currenctLanguage } = useCachedLanguage();
  const content = useContent_Based_Language();
  const navigate = useNavigate();
  //
  //

  const { data = { allActiveUsers: 0, havingPrint: 0 } } = AdminActive_users();
  //
  const { data: product_Label_countData } = AdminProduct_Label_Count();

  const StartCol = ({
    value = {
      row1: " ",
      row2: " ",
    },
  }) => {
    // function row1OnClick() {
    //   navigate(value.row1Link);
    // }
    // function row2OnClick() {
    //   navigate(value.row2Link);
    // }
    return (
      <section className="w-52">
        <div className="w-100 h-100 d-flex justify-content-center align-items-center flex-column">
          <Typography.H2
            className="color-white font-400"
            language={currenctLanguage}
          >
            {value.row1}
          </Typography.H2>
          <Typography.H4 className="color-white text-algin-center">
            {value.row2}
          </Typography.H4>
        </div>
      </section>
    );
  };
  const EndCol = ({
    value = {
      row1: " ",
      row2: " ",
      row1Link: " ",
      row2Link: " ",
    },
  }) => {
    function row1OnClick() {
      navigate(value.row1Link);
    }
    function row2OnClick() {
      navigate(value.row2Link);
    }
    return (
      <section className="w-48 d-flex align-items-center flex-column bg-white border-r-25 py-3 px-3">
        <Buttons.Outlined className="button_big mb-2" onClick={row1OnClick}>
          <Typography.H7>{value.row1}</Typography.H7>
        </Buttons.Outlined>
        <Buttons.Contained_Custom
          className="button_big bg_primary   "
          onClick={row2OnClick}
        >
          <Typography.H7 className="font-300">{value.row2}</Typography.H7>
        </Buttons.Contained_Custom>
      </section>
    );
  };
  const FirstCard = () => {
    return (
      <div className="w-100 bg_primary_opacity-7  border-r-25 d-flex ">
        <article className=" d-flex justify-content-between w-100 ">
          <StartCol
            value={{
              row1: data.allActiveUsers,
              row2: content.AdminPannel.end_col.controlPannel.row1.activeUser,
            }}
          />
          <EndCol
            value={{
              row1: content.AdminPannel.end_col.controlPannel.row1.usersList,
              row2: content.AdminPannel.end_col.controlPannel.row1.AddNewUser,
              row1Link: "/admin/list-user",
              row2Link: "/admin/control-pannel/add-user",
            }}
          />
        </article>
      </div>
    );
  };
  const SeceondCard = () => {
    if (data)
      return (
        <div className="w-100 bg_primary_opacity-7  border-r-25 d-flex ">
          <article className=" d-flex justify-content-between w-100 ">
            <StartCol
              value={{
                row1: product_Label_countData.all,
                row2: content.AdminPannel.end_col.controlPannel.row1
                  .ProductAndLabel,
              }}
            />
            <EndCol
              value={{
                row1: content.AdminPannel.end_col.controlPannel.row1
                  .productsList,
                row2: content.AdminPannel.end_col.controlPannel.row1
                  .AddNewProduct,
                row1Link: "/admin/list-labels-products",
                row2Link: "/admin/add-product",
              }}
            />
          </article>
        </div>
      );
  };

  if (product_Label_countData)
    return (
      <Grid container columnSpacing={1.5}>
        <Grid item lg={6}>
          <FirstCard />
        </Grid>
        <Grid item lg={6}>
          <SeceondCard />
        </Grid>
      </Grid>
    );
}
