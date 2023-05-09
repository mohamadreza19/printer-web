import { Grid } from "@mui/material";
import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../../../recoil/readStore";
import Icons from "../../../../../styles/__ready/Icons";
import Typography from "../../../../../styles/__ready/Typography";
import useCachedLanguage from "../../../../../utility/useCachedLanguage";
import useFormetDate from "../../../../../utility/useFormetDate";

export default function ({
  product = {
    id: "",
    createdBy: "",
    projectName: "",
    updatedAt: "",
    productsCount: "",
    printsCount: "",
  },
  language = "",
}) {
  const cssClass = useDynamicCssClass();
  const { value: currentLanguage } = useCachedLanguage();
  const content = useContent_Based_Language();
  const fromNowDate = useFormetDate(product.updatedAt, language);
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
          <Typography.H10>{product.createdBy}</Typography.H10>
        </Grid>
        <Grid item lg={3} className="d-flex justify-content-end">
          <Typography.H10>{fromNowDate}</Typography.H10>
        </Grid>
        <Grid item lg={3} className="d-flex justify-content-end">
          <span>
            <Typography.H10 language={currentLanguage}>
              {product.productsCount}
              <span className={cssClass.ms_1}>
                {content.AdminPannel.end_col.controlPannel.row3.product}
              </span>
            </Typography.H10>
          </span>
        </Grid>
        <Grid
          item
          lg={3}
          className={"d-flex justify-content-end " + cssClass.pe_5}
        >
          <span>
            <Typography.H10 language={currentLanguage}>
              {product.printsCount}
              <span className={cssClass.ms_1}>
                {content.AdminPannel.end_col.controlPannel.row3.print}
              </span>
            </Typography.H10>
          </span>
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
