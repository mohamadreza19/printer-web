import Typography from "../../../../../styles/__ready/Typography";
import {
  useDynamicCssClass,
  useContent_Based_Language,
} from "../../../../../recoil/readStore";
import { TextFieldFUN_v5 } from "../../../../../styles/__ready/Textfields";
import useAdminAdd_Product from "../../../../../helper/admin_add_product_label/control_product_dynamic_input";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  clearErr,
  getProductName,
} from "../../../../../redux/product/product_slice";

export default function () {
  const dispatch = useDispatch();
  const productName = useSelector(getProductName);

  const cssClass = useDynamicCssClass();
  const [lan, setLan] = useState("persian");
  //
  const content =
    useContent_Based_Language().AdminPannel.end_col.addNew_Project_Or_Label
      .rowTwo;
  //

  function handleChangeLan(value) {
    setLan(value);
  }
  function handleChangeProductName(lan, event) {
    const value = event.target.value;

    const payload = {
      type: "ADD/NAME",
      lan,
      value,
    };
    const clearErrPayload = {
      type: "NAME",
    };
    dispatch(addProduct(payload));
    dispatch(clearErr(clearErrPayload));
  }
  function getCssClassBasedLan(target) {
    if (target === lan) {
      return "bg_primary_g color-white";
    }
    return "bg_primary_light color-primary";
  }
  function getCurrentNameBasedLan() {
    return productName[lan];
  }

  return (
    <>
      <div className={"position-relative  " + cssClass.ms_3}>
        <header
          style={{
            top: "2rem",
            // right: "0",
          }}
          className="position-absolute"
        >
          <Typography.H8 className="font-400">
            {content.productName}
          </Typography.H8>
        </header>
      </div>
      <main
        style={{
          top: "4.2rem",
        }}
        className="position-relative "
      >
        <article
          className={cssClass.me_3 + " language-card-select position-absolute"}
          style={{
            zIndex: "2",
          }}
        >
          <TextFieldFUN_v5
            onChange={(event) => handleChangeProductName(lan, event)}
            value={getCurrentNameBasedLan()}
            className="add-product-label-textFelid"
          />
          <Typography.H9 className="color_danger">
            {productName.validateErr}
          </Typography.H9>
        </article>
        <article className="position-absolute d-flex add-product-medium-text-area-header-card">
          <section
            style={{
              zIndex: "1",
              right: "10.99rem",
              bottom: "-2rem",
            }}
            className={
              "laguage-card  d-flex justify-content-center align-item-center " +
              getCssClassBasedLan("persian")
            }
            onClick={() => handleChangeLan("persian")}
          >
            <span
              style={{
                bottom: "0.99rem",
              }}
              className="position-relative"
            >
              <Typography.H9 className="font-400">
                {content.persian}
              </Typography.H9>
            </span>
          </section>
          <section
            onClick={() => handleChangeLan("english")}
            style={{
              zIndex: "1",
              right: "24.2rem",
              bottom: "-2rem",
            }}
            className={
              "laguage-card  d-flex justify-content-center align-item-center mx-1  " +
              getCssClassBasedLan("english")
            }
          >
            <span
              style={{
                bottom: "0.99rem",
              }}
              className="position-relative"
            >
              <Typography.H9 className="font-400">
                {content.english}
              </Typography.H9>
            </span>
          </section>
          <section
            onClick={() => handleChangeLan("turkish")}
            style={{
              backgroundColor: "red",
              zIndex: "1",
              right: "17.6rem",
              bottom: "-2rem",
            }}
            className={
              "laguage-card   d-flex justify-content-center align-item-center " +
              getCssClassBasedLan("turkish")
            }
          >
            <span
              style={{
                bottom: "0.99rem",
              }}
              className="position-relative"
            >
              <Typography.H9 className="font-400">
                {content.turkish}
              </Typography.H9>
            </span>
          </section>
        </article>
      </main>
    </>
  );
}
