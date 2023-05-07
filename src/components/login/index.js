import { Grid } from "@mui/material";
import { useDynamicCssClass } from "../../recoil/readStore";
import FooterButton from "./layout/FooterButton";
import Header from "./layout/Header";
import RememberPassword from "./layout/RememberPassword";
import SelectedLanguage from "./layout/SelectedLanguage";
import Slider from "./layout/Slider";
import TextfiledsBox from "./layout/TextfiledsBox";
import { LoginUser_Mutation } from "../../helper/UserApiQueries";
import useCachedToken from "../../utility/useCachedToken";
import useToastReducer from "../../recoil/reducer/useToastReducer";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isUserLogin } from "../../recoil/recoilStore";

export default function () {
  const cssClass = useDynamicCssClass();
  const reducer = useCachedToken();
  const navigate = useNavigate();
  const setToast = useToastReducer();
  const [_, setIsUserLogin] = useRecoilState(isUserLogin);
  const { set: setUserToken } = useCachedToken();
  const { isLoading, error, data, mutate } = LoginUser_Mutation();

  if (error) {
    setToast({ isShow: true, message: error });
  }
  function handleLogin(body) {
    mutate(body);
  }
  if (data) {
    setToast({ isShow: false, message: "" });
    setUserToken(data);
    setIsUserLogin(true);
    navigate("/user");
  }
  if (isLoading) {
    setToast({ isShow: true, message: "" });
  }

  return (
    <Grid container className={"bg_secondray  vh100"}>
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
        <TextfiledsBox handleLogin={handleLogin} />

        <SelectedLanguage />
      </Grid>
      <Grid className="h-100 bg_secondray " item lg={6} md={6}>
        <Slider />
      </Grid>
    </Grid>
  );
}
