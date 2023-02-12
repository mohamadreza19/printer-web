import {
  Box,
  createTheme,
  responsiveFontSizes,
  styled,
  ThemeProvider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import rtlPlugin from "stylis-plugin-rtl";

import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import { Link } from "react-router-dom";
import { useLanguage } from "../recoil/readStore";

const colors = {
  primary: "#FF7D41",
  secondary: "#434343",
  info: "#F5F5F5",
  gray1: "#ECECEC",
  gray2: "#CBCBCB",
  white: "#FFFFFF",
  black1: "#454545",
  danger: "#FA452D",
};

export const cacheRTL = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
export const cacheLtr = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

export const RtlTheme =
  //  responsiveFontSizes(
  createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            color: "#FFFFFF",
            borderRadius: "10px",
            // fontSize: "0px",
          },
        },
      },
    },
    typography: {
      fontFamily: ["Vazirmatn"],
    },
    palette: {
      primary: {
        main: colors.primary,
      },
      secondary: {
        main: "#404040",
      },
      info: {
        main: "#FFFFFF",
      },
    },
  });
// );

export const LtrTheme =
  //  responsiveFontSizes(
  createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            color: "#010101",
          },
        },
      },
    },
    typography: {
      // fontFamily: ["IRANSens_v2"],
    },
    palette: {
      background: {
        // default: "black !important",
      },

      primary: {
        main: "#FFA100",
      },
      secondary: {
        main: "#404040",
      },
      info: {
        main: "#FFFFFF",
      },
    },
  });
// );
export const MycacheProider = (props) => {
  const language = useLanguage();
  return language === "fa" ? (
    <CacheProvider value={cacheRTL}>{props.children}</CacheProvider>
  ) : (
    <div>{props.children}</div>
  );
};
export const ErrorFallbackComponent = ({ error, language }) => {
  const data = {
    title: language === "persion" ? "مشکلی پیش امده است" : "problem happend",
  };
  return (
    <div className="fallback-component d-flex justify-content-center align-items-center flex-column">
      <Typography variant="h6">{data.title}</Typography>
      <Typography variant="body1">{error.message || " "}</Typography>
      <Link to={error.redirect}>
        <Typography> try agin</Typography>
      </Link>
    </div>
  );
};
