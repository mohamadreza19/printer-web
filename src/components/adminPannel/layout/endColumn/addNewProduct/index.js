import { Grid } from "@mui/material";
import useAdmin_Add_Product from "../../../../../helper/admin_add_product_label/control_product_dynamic_input";
import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../../../recoil/readStore";
import Buttons from "../../../../../styles/__ready/Buttons";
import Typography from "../../../../../styles/__ready/Typography";
//
import Header from "./Header";
import RowFour from "./RowFour";
import RowOne from "./RowOne";
import RowThree from "./RowThree";
import RowTwo from "./RowTwo";
import UploadFile from "./uploadFile";
//__v
import useValidateproduct from "../../../../../helper/admin_add_product_label/validate_product";
import { useEffect, useMemo, useState } from "react";
import { setProduct_label_key } from "../../../../../reactQuery/querykey/admin_key";
import { useDispatch, useSelector } from "react-redux";
import {
  validate,
  getPageOneProductErrorValidate,
} from "../../../../../redux/product/product_slice";
import { useNavigate } from "react-router-dom";

export default function () {
  const [allowNextPage, setAllowNextPage] = useState(false);
  const allInput = useAdmin_Add_Product();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pageOneProductErrorValidate = useSelector(
    getPageOneProductErrorValidate
  );

  const cssClass = useDynamicCssClass();
  const content =
    useContent_Based_Language().AdminPannel.end_col.addNew_Project_Or_Label;
  const handleProductNameValidate = useValidateproduct();

  const [state, setState] = useState();

  function handle(pageOneProductErrorValidate) {
    dispatch(validate());

    // if (!pageOneProductHasErrorValidate) {
    //   setAllowNextPage(true);
    // }
  }

  if (allowNextPage) {
    return <UploadFile />;
  }

  function handle_OnChange_SelectBox(e) {
    // console.log(e.target.value);
    navigate("/admin/" + e.target.value, {
      replace: true,
    });
  }
  return (
    <div
      className="w-100 h-100
    
    "
      style={{ overflowY: "auto" }}
    >
      <Header />
      <Grid container className={"mt-5 " + cssClass.ps_6}>
        <Grid item lg={12} className="">
          {/* <RowOne /> */}
          <article className={" " + cssClass.me_3}>
            <select
              onChange={handle_OnChange_SelectBox}
              name="cars"
              id="cars"
              className="select-extra-large"
            >
              <option value="add-product">
                <Typography.H8>{content.addNewProduct}</Typography.H8>
              </option>
              <option value="add-label-beta">
                <Typography.H9>{content.addNewLabel}</Typography.H9>
              </option>
            </select>
          </article>
        </Grid>
        <Grid item lg={12} className="height">
          <RowTwo />
        </Grid>
        <Grid item lg={12} className="height ">
          <RowThree />
        </Grid>

        <Grid item lg={12} className="grid-height">
          <RowFour />
        </Grid>
      </Grid>
      <footer className="w-100 d-flex justify-content-end px-4">
        <Buttons.Contained
          onClick={() => {
            handle(pageOneProductErrorValidate);
          }}
          className="button_large"
        >
          <Typography.H7 className="font-300">ادامه</Typography.H7>
        </Buttons.Contained>
      </footer>
    </div>
  );
}
