import {
  useDynamicCssClass,
  useContent_Based_Language,
} from "../../../../../recoil/readStore";
import { TextFieldFUN_v5_Big } from "../../../../../styles/__ready/Textfields";
import Typography from "../../../../../styles/__ready/Typography";
import useAdminAdd_Product from "../../../../../helper/admin_add_product_label/control_product_dynamic_input";
import { useEffect, useState } from "react";
import {
  addProduct,
  getProductDescription,
} from "../../../../../redux/product/product_slice";
import { useDispatch, useSelector } from "react-redux";
export default function () {
  const cssClass = useDynamicCssClass();
  const dispatch = useDispatch();
  const productDescription = useSelector(getProductDescription);
  const [lan, setLan] = useState("persian");
  const content =
    useContent_Based_Language().AdminPannel.end_col.addNew_Project_Or_Label
      .rowFour;
  function handleChangeLan(value) {
    setLan(value);
  }
  function handleChangeProductDescription(lan, event) {
    const value = event.target.value;

    const payload = {
      type: "ADD/DESCRIPTION",
      lan,
      value,
    };
    dispatch(addProduct(payload));
  }
  function getCssClassBasedLan(target) {
    if (target === lan) {
      return "bg_primary_g color-white";
    }
    return "bg_primary_light color-primary";
  }
  function getCurrentNameBasedLan() {
    return productDescription[lan];
  }

  return (
    <>
      <div className={"position-relative " + cssClass.ms_3}>
        <article
          style={{
            top: "2rem",
          }}
          className="position-absolute"
        >
          <Typography.H8 className="font-400">
            {content.AdditionalInformationAboutTheProduct}
          </Typography.H8>
        </article>
      </div>
      <div style={{ top: "4.2rem" }} className="position-relative  ">
        <article
          className={
            cssClass.me_3 + " language-card-select-large position-absolute"
          }
          style={{
            zIndex: "2",
          }}
        >
          <TextFieldFUN_v5_Big
            className="language-card-select-large"
            InputclassName=" "
            onChange={(event) => handleChangeProductDescription(lan, event)}
            value={getCurrentNameBasedLan()}
          />
        </article>
        <article className="position-absolute d-flex add-product-big-text-area-header-card ">
          <section
            onClick={() => handleChangeLan("persian")}
            style={{
              zIndex: "1",
              right: "34.32rem",
              bottom: "-2rem",
            }}
            className={
              "laguage-card  d-flex justify-content-center align-item-center " +
              getCssClassBasedLan("persian")
            }
          >
            <span
              style={{
                bottom: "0.99rem",
              }}
              className="position-relative"
            >
              <Typography.H9 className="font-400">
                {" "}
                {content.persian}
              </Typography.H9>
            </span>
          </section>
          <section
            onClick={() => handleChangeLan("english")}
            style={{
              zIndex: "1",
              right: "40rem",
              bottom: "-2rem",
            }}
            className={
              "laguage-card  d-flex justify-content-center align-item-center mx-1 " +
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
              zIndex: "1",
              right: "47.59rem",
              bottom: "-2rem",
            }}
            className={
              "laguage-card  d-flex justify-content-center align-item-center " +
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
      </div>
    </>
  );
}
