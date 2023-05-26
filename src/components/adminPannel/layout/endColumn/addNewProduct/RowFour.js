import {
  useDynamicCssClass,
  useContent_Based_Language,
} from "../../../../../recoil/readStore";
import { TextFieldFUN_v5_Big } from "../../../../../styles/__ready/Textfields";
import Typography from "../../../../../styles/__ready/Typography";
import useAdminAdd_Product from "../../../../../helper/admin_add_product_label/control_product_dynamic_input";
export default function () {
  const cssClass = useDynamicCssClass();
  const content =
    useContent_Based_Language().AdminPannel.end_col.addNew_Project_Or_Label
      .rowFour;
  const {
    additionalInfoValue,
    additionalInfoHandeler,
    handleSetLanguage_Of__AdditionalInfo_Header_Card,
    AdditionalInfo_headerCardCurrentBackground,
  } = useAdminAdd_Product("additionalInfo");
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
            value={additionalInfoValue}
            onChange={additionalInfoHandeler}
          />
        </article>
        <article className="position-absolute d-flex add-product-big-text-area-header-card ">
          <section
            onClick={() =>
              handleSetLanguage_Of__AdditionalInfo_Header_Card("fa")
            }
            style={{
              zIndex: "1",
              right: "34.32rem",
              bottom: "-2rem",
            }}
            className={
              "laguage-card  d-flex justify-content-center align-item-center " +
              AdditionalInfo_headerCardCurrentBackground.persian
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
            onClick={() =>
              handleSetLanguage_Of__AdditionalInfo_Header_Card("en")
            }
            style={{
              zIndex: "1",
              right: "40rem",
              bottom: "-2rem",
            }}
            className={
              "laguage-card  d-flex justify-content-center align-item-center mx-1 " +
              AdditionalInfo_headerCardCurrentBackground.english
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
            onClick={() =>
              handleSetLanguage_Of__AdditionalInfo_Header_Card("tr")
            }
            style={{
              zIndex: "1",
              right: "47.59rem",
              bottom: "-2rem",
            }}
            className={
              "laguage-card  d-flex justify-content-center align-item-center " +
              AdditionalInfo_headerCardCurrentBackground.turkish
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
