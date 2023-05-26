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
    createdBy: "",
    createdAt: "",
    project: {
      printsCount: "",
      productsCount: "",
    },
    user: {
      companyName: "",
    },
  },
  language = "",
}) {
  const currentLanguage = useLanguage();
  const content = useContent_Based_Language();
  const cssClass = useDynamicCssClass();
  const fromNowDate = useFormetDate(print.updatedAt, currentLanguage);
  console.log(print);
  return (
    <div className="w-100 bg_primary_v1 d-flex  border-r-25   mb-2 cur-pointer">
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
            printsCount={print.project?.printsCount}
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
