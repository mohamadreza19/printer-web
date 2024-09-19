import { Grid } from "@mui/material";
import CompanyName from "./CompanyName";
import CreatedBy from "./CreatedAt";
import FromNow from "./FromNow";
import ProductCount from "./ProductCount";
import PrintCount from "./PrintCount";
import {
  useContent_Based_Language,
  useDynamicCssClass,
  useLanguage,
} from "../../../../recoil/readStore";
import useFormetDate from "../../../../utility/useFormetDate";
import Icons from "../../Icons";

export default function ({
  print = {
    updatedAt: "",
    createdBy: "",
    createdAt: "",
    project: {
      printsCount: "",
      productsCount: "",
    },
    label: {},
    user: {
      companyName: "",
    },
  },
  language = "",
  justProduct = false,
}) {
  const currentLanguage = useLanguage();
  const content = useContent_Based_Language();
  const cssClass = useDynamicCssClass();
  const fromNowDate = useFormetDate(print.createdAt, currentLanguage);
  console.log(justProduct);
  function change_background_based_project_label() {
    if ("project" in print) {
      return "bg_primary_v1";
    }
    if (print.label) {
      return "bg_gray2";
    }
  }
  // printCount(print);
  return (
    <div
      className={
        "w-100 d-flex  border-r-25   mb-2 cur-pointer " +
        change_background_based_project_label()
      }
    >
      <Grid
        style={{
          height: "62px",
          borderRadius: "24px",
        }}
        container
        className="w-100 d-flex justify-content-between align-items-center bg-white border  px-3 py-3  "
      >
        <Grid item lg={3}>
          <CompanyName companyName={print.user?.companyName} />
        </Grid>
        <Grid item lg={3} className="d-flex justify-content-end">
          <FromNow fromNowDate={fromNowDate} language={currentLanguage} />
        </Grid>
        <Grid item lg={3} className="d-flex justify-content-end">
          <ProductCount
            productsCount={print.project?.productsCount}
            text={content.AdminPannel.end_col.controlPannel.row3.product}
          />
        </Grid>
        <Grid
          item
          lg={3}
          className={"d-flex justify-content-end " + cssClass.pe_5}
        >
          <PrintCount
            printsCount={printCount(print)}
            text={content.AdminPannel.end_col.controlPannel.row3.print}
          />
        </Grid>
      </Grid>
      <section className={"d-flex align-items-center "}>
        <Icons.LeftArrow
          className="icon_mx-0_6rem"
          language={currentLanguage}
        />
      </section>
    </div>
  );
}
function printCount(print) {
  const label = print.label;
  const project = print.project;
  let printsCount = "";

  if (label !== null) {
    printsCount = label.printsCount || 0;
  }
  if (project !== null) {
    printsCount = project.printsCount || 0;
  }

  return printsCount;
}
