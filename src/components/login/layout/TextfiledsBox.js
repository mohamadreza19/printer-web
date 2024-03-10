import { Grid } from "@mui/material";
import {
  useContent_Based_Language,
  useDynamicCssClass,
  useLanguage,
} from "../../../recoil/readStore";
import Textfields, {
  LoginPasswordTextField,
  UserNameTextField,
} from "../../../styles/__ready/Textfields";
import login_validation from "../../../validation/login_validation";
import RememberPassword from "./RememberPassword";
import FooterButton from "./FooterButton";
import { useEffect, useState } from "react";
import Typography from "../../../styles/__ready/Typography";
import { useTranslation } from "react-i18next";
export default function ({ error = "", handleLogin = () => {} }) {
  const content = useContent_Based_Language();
  const lan = useLanguage();
  const cssClass = useDynamicCssClass();
  const { t } = useTranslation();
  const [state, setState] = useState({
    username: {
      value: "",
      errMsg: "",
    },
    password: {
      value: "",
      errMsg: "",
    },
  });
  function onchangeUserName(e) {
    const value = e.target.value;

    setState((draft) => ({
      ...draft,
      username: { ...draft.username, value: value, errMsg: "" },
    }));
  }
  function onchangeUserPassword(e) {
    const value = e.target.value;
    setState((draft) => ({
      ...draft,
      password: { ...draft.password, value: value, errMsg: "" },
    }));
  }

  async function submit() {
    const body = {
      username: state.username.value,
      password: state.password.value,
    };
    try {
      const v = await login_validation(body, lan);
      handleLogin(body);
    } catch (error) {
      error.inner.map((err) => {
        const path = err.path;
        const message = err.message;
        setState((draft) => {
          return {
            ...draft,
            [path]: {
              ...draft[path],
              errMsg: message,
            },
          };
        });
      });
    }
  }
  useEffect(() => {
    if (error) {
      setState((draft) => ({
        ...draft,
        username: { ...draft.username, errMsg: error },
        password: { ...draft.password, errMsg: error },
      }));
    }
  }, [error]);

  return (
    <Grid container className=" d-flex justify-content-center ">
      <Grid item lg={7} md={10} sm={10} xs={10}>
        <UserNameTextField
          content={t("login.userName")}
          value={state.username.value}
          onChange={onchangeUserName}
          className="mt-3"
          Input_marginStart_based_Language={cssClass.ms_3}
          errMsg={state.username.errMsg}
        />
        <Typography.H9 className="color_danger">
          {state.username.errMsg}
        </Typography.H9>
        <LoginPasswordTextField
          value={state.password.value}
          onChange={onchangeUserPassword}
          content={t("login.password")}
          className="mt-3"
          Input_marginStart_based_Language={cssClass.ms_3}
          onEnterKeyDown={submit}
        />
        <Typography.H9 className="color_danger">
          {state.password.errMsg}
        </Typography.H9>
        <RememberPassword />
        <FooterButton onClick={submit} />
      </Grid>
    </Grid>
  );
}
