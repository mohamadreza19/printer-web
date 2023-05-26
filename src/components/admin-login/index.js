import { Grid } from "@mui/material";
import { useDynamicCssClass } from "../../recoil/readStore";

import Header from "./layout/Header";

import SelectedLanguage from "./layout/SelectedLanguage";
import Slider from "./layout/Slider";
import TextfiledsBox from "./layout/TextfiledsBox";

import useCachedLanguage from "../../utility/useCachedLanguage";
import { AdminLogin_Mutation } from "../../reactQuery/admin/callPostService";

export default function () {
  const { value: cachedValue, set: setCachedLanguage } = useCachedLanguage();
  const cssClass = useDynamicCssClass();
  // const reducer = useCachedToken();

  const { isLoading, error, data, mutate, statusCode } = AdminLogin_Mutation();

  if (error) {
    if (statusCode !== 201) {
    }
  }
  function handleLogin(body) {
    if (!cachedValue) {
      setCachedLanguage("fa");
    }
    mutate(body);
  }

  return (
    <Grid
      container
      className={"bg_secondray  vh100"}
      style={{
        minHeight: "768px",
      }}
    >
      <Grid
        item
        lg={6}
        md={6}
        sm={12}
        xs={12}
        className={
          cssClass.border_r_e_50px +
          " bg_info py-4 h-100 d-flex flex-column justify-content-between"
        }
      >
        <Header />

        <TextfiledsBox handleLogin={handleLogin} error={error} />

        <SelectedLanguage />
      </Grid>
      <Grid className="h-100 bg_secondray " item lg={6} md={6}>
        <Slider />
      </Grid>
    </Grid>
  );
}
