import { Grid } from "@mui/material";
import { useDynamicCssClass } from "../../../../../recoil/readStore";
import Typography from "../../../../../styles/__ready/Typography";
import Header from "./Header";

export default function () {
  const cssClass = useDynamicCssClass();
  return (
    <div className="w-100 ">
      <Header />
      <Grid container className="mt-3">
        <Grid item lg={12}>
          <Grid container>
            <Grid item lg={7}>
              <div className="position-relative">
                <article className={cssClass.me_3}>
                  <select name="cars" id="cars" className="select-large">
                    <option value="تهران">
                      <Typography.H8>تهران</Typography.H8>
                    </option>
                    <option value="کرج">
                      <Typography.H9>کرج</Typography.H9>
                    </option>
                  </select>
                </article>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={12}>
          <Grid container>
            <Grid item lg={7} className="position-relative">
              <article
                className={cssClass.me_3 + " language-card-select"}
                style={{
                  position: "absolute",
                  zIndex: "2",
                }}
              >
                <select name="cars" id="cars" className="select-large">
                  <option value="تهران">
                    <Typography.H8>تهران</Typography.H8>
                  </option>
                  <option value="کرج">
                    <Typography.H9>کرج</Typography.H9>
                  </option>
                </select>
              </article>
              <section
                style={{
                  backgroundColor: "red",
                  zIndex: "1",
                  right: "24.29rem",
                  bottom: "-2rem",
                }}
                className="laguage-card position-absolute"
              ></section>
              <section
                style={{
                  backgroundColor: "red",
                  zIndex: "1",
                  right: "17.29rem",
                  bottom: "-2rem",
                }}
                className="laguage-card position-absolute"
              ></section>
              <section
                style={{
                  backgroundColor: "red",
                  zIndex: "1",
                  right: "10.29rem",
                  bottom: "-2rem",
                }}
                className="laguage-card position-absolute"
              ></section>
            </Grid>
          </Grid>
        </Grid>

        <Grid item lg={12} className="">
          s
        </Grid>
        <Grid item lg={12}>
          s
        </Grid>
      </Grid>
    </div>
  );
}
