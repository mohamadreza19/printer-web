import { Grid } from "@mui/material";
import { useDynamicCssClass } from "../../recoil/readStore";
import FooterButton from "./layout/FooterButton";
import Header from "./layout/Header";
import RememberPassword from "./layout/RememberPassword";
import SelectedLanguage from "./layout/SelectedLanguage";
import Slider from "./layout/Slider";
import TextfiledsBox from "./layout/TextfiledsBox";
import { LoginUser_Mutation } from "../../helper/UserApiQueries";
import useAdmin_CachedToken from "../../utility/useAdmin_CachedToken";
import useToastReducer from "../../recoil/reducer/useToastReducer";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isAdminLogin, language } from "../../recoil/recoilStore";
import { AdminLogin_Mutation } from "../../helper/AdminApiQueries";
import useCachedLanguage from "../../utility/useCachedLanguage";

export default function () {
  const { value: cachedValue, set: setCachedLanguage } = useCachedLanguage();
  const cssClass = useDynamicCssClass();
  // const reducer = useCachedToken();
  const navigate = useNavigate();
  const setLoading = useToastReducer();
  const [_, setIsAdminLogin] = useRecoilState(isAdminLogin);

  const { set: setAdminToken } = useAdmin_CachedToken();
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

  useEffect(() => {
    if (data) {
      console.log(data);
      setLoading({ isShow: false, message: "" });
      setAdminToken(data);
      setIsAdminLogin(true);
      navigate("/admin");
    }
    if (isLoading) {
      // setLoading({ isShow: true, message: "" });
    }
  }, [data, isLoading]);

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
