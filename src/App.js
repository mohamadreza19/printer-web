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
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "./styles/__ready/Toasts";
import useGeneralCallApi from "./utility/useGeneralCallApi";

function App() {
  useHandleDirection_Based_Langiage();
  useHandleLanguage_Based_CachedLanguage();

  const queryClient = new QueryClient();
  return (
    <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
      <MycacheProider>
        <ThemeProvider
          //  theme={language === "fa" ? RtlTheme : LtrTheme}
          // theme={language == "fa" ? RtlTheme : LtrTheme}
          theme={RtlTheme}
        >
          <ToastContainer>
            <QueryClientProvider client={queryClient} children={<Routes />} />
          </ToastContainer>
        </ThemeProvider>
      </MycacheProider>
    </ErrorBoundary>
  );
}

export default App;
