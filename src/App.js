import "./App.css";

import { ThemeProvider } from "@mui/material";

import {
  ErrorFallbackComponent,
  LtrTheme,
  MycacheProider,
  RtlTheme,
} from "./styles/theme";
import { ErrorBoundary } from "react-error-boundary";
import useHandleDirection_Based_Langiage from "./utility/useHandleDirection_Based_Langiage";

import Routes from "./routes/Routes";
import useHandleLanguage_Based_CachedLanguage from "./utility/useHandleLanguage_Based_CachedLanguage";
import { useLanguage } from "./recoil/readStore";

function App() {
  useHandleDirection_Based_Langiage();
  useHandleLanguage_Based_CachedLanguage();
  console.log("test");
  return (
    <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
      <MycacheProider>
        <ThemeProvider
          //  theme={language === "fa" ? RtlTheme : LtrTheme}
          // theme={language == "fa" ? RtlTheme : LtrTheme}
          theme={RtlTheme}
        >
          <Routes />
        </ThemeProvider>
      </MycacheProider>
    </ErrorBoundary>
  );
}

export default App;
