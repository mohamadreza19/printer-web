import Typography from "../../../../../styles/__ready/Typography";
import {
  useDynamicCssClass,
  useContent_Based_Language,
} from "../../../../../recoil/readStore";
import { TextFieldFUN_v5 } from "../../../../../styles/__ready/Textfields";
import useAdmin_Add_Label from "../../../../../helper/admin_add_product_label/control_label_dynamic_input";
import { useEffect } from "react";
import { t } from "i18next";

export default function ({ setName = () => {} }) {
  const cssClass = useDynamicCssClass();
  //
  const { labelName } = useAdmin_Add_Label();
  labelName.showState();

  useEffect(() => {
    setName(labelName.showState());
  }, [
    labelName.showState().english,
    labelName.showState().persian,
    labelName.showState().turkish,
  ]);
  const {
    handleSetEnglish,
    handleSetPersian,
    handleSetTurkish,
    labelValue = " ",
    labelHandler = () => {},
    handleSetLanguage_Of_LabelName_Header_Card,
    headerCardCurrentBackground = {
      persian: " ",
      english: " ",
      turkish: " ",
    },
  } = labelName;

  useEffect(() => {
    return () => {
      const e = {
        target: {
          value: " ",
        },
      };

      handleSetEnglish(e);
      handleSetPersian(e);
      handleSetTurkish(e);
    };
  }, []);
  //
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
            {t("addNewLabel.labelName")}
          </Typography.H8>
        </article>
      </div>
      <div
        style={{
          top: "4.2rem",
        }}
        className="position-relative "
      >
        <article
          className={cssClass.me_3 + "  language-card-select position-absolute"}
          style={{
            zIndex: "2",
          }}
        >
          <TextFieldFUN_v5
            className=""
            onChange={labelHandler}
            value={labelValue}
          />
          <Typography.H9 className="color_danger">
            {labelName.validateErr}
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
              headerCardCurrentBackground.persian
            }
            onClick={() => handleSetLanguage_Of_LabelName_Header_Card("fa")}
          >
            <span
              style={{
                bottom: "0.99rem",
              }}
              className="position-relative"
            >
              <Typography.H9 className="font-400">{t("persian")}</Typography.H9>
            </span>
          </section>
          <section
            onClick={() => handleSetLanguage_Of_LabelName_Header_Card("en")}
            style={{
              zIndex: "1",
              right: "24.2rem",
              bottom: "-2rem",
            }}
            className={
              "laguage-card  d-flex justify-content-center align-item-center mx-1  " +
              headerCardCurrentBackground.english
            }
          >
            <span
              style={{
                bottom: "0.99rem",
              }}
              className="position-relative"
            >
              <Typography.H9 className="font-400">{t("english")}</Typography.H9>
            </span>
          </section>
          <section
            onClick={() => handleSetLanguage_Of_LabelName_Header_Card("tr")}
            style={{
              backgroundColor: "red",
              zIndex: "1",
              right: "17.6rem",
              bottom: "-2rem",
            }}
            className={
              "laguage-card   d-flex justify-content-center align-item-center " +
              headerCardCurrentBackground.turkish
            }
          >
            <span
              style={{
                bottom: "0.99rem",
              }}
              className="position-relative"
            >
              <Typography.H9 className="font-400">{t("turkish")}</Typography.H9>
            </span>
          </section>
        </article>
      </div>
    </>
  );
}
