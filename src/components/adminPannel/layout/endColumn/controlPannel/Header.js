import Buttons from "../../../../../styles/__ready/Buttons";
import { Grid } from "@mui/material";
import Typography from "../../../../../styles/__ready/Typography";
import useCachedLanguage from "../../../../../utility/useCachedLanguage";
import { useContent_Based_Language } from "../../../../../recoil/readStore";
import { Link } from "react-router-dom";
import {
  AdminActive_users,
  AdminPrintsStatistics,
} from "../../../../../helper/AdminApiQueries";
import { useEffect } from "react";
import useToastReducer from "../../../../../recoil/reducer/useToastReducer";
export default function () {
  const { value: currenctLanguage } = useCachedLanguage();
  const content = useContent_Based_Language();
  //
  const setLoading = useToastReducer();
  //

  const { data = { allActiveUsers: 0, havingPrint: 0 } } = AdminActive_users();
  //
  const {
    data: printsStatistics_data = {
      totalPrints: 3,
      distinctCompanies: 1,
      productsAndLabels: 1,
    },
  } = AdminPrintsStatistics();

  const StartCol = ({
    value = {
      row1: " ",
      row2: " ",
    },
  }) => {
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
    return (
      <section className="w-48 d-flex align-items-center flex-column bg-white border-r-25 py-3 px-3">
        <Buttons.Outlined className="button_big mb-2">
          <Typography.H7>{value.row1}</Typography.H7>
        </Buttons.Outlined>
        <Buttons.Contained_Custom className="button_big bg_primary   ">
          <Link to={value.row2Link} replace>
            <Typography.H7 className="font-300">{value.row2}</Typography.H7>
          </Link>
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
              row2Link: "add-user",
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
                row1: printsStatistics_data.productsAndLabels,
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
                row2Link: "/admin/add-product",
              }}
            />
          </article>
        </div>
      );
  };

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
