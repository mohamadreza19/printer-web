import './App.css';

import { ThemeProvider } from '@mui/material';

import {
  ErrorFallbackComponent,
  MycacheProider,
  RtlTheme,
} from './styles/theme';
import { ErrorBoundary } from 'react-error-boundary';
import useHandleDirection_Based_Langiage from './utility/useHandleDirection_Based_Langiage';

import Routes from './routes/Routes';
import useHandleLanguage_Based_CachedLanguage from './utility/useHandleLanguage_Based_CachedLanguage';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from './styles/__ready/Toasts';

import changeBaseUrlBasedHost from './utility/changeBaseUrlBasedHost';

import Providers from './redux/ReduxProviders';
import ReduxProviders from './redux/ReduxProviders';
import ToastMessage from './common/ToastMessage/ToastMessage';
import './language';

function App() {
  changeBaseUrlBasedHost();
  useHandleDirection_Based_Langiage();
  useHandleLanguage_Based_CachedLanguage();

  const queryClient = new QueryClient();
  return (
    <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
      <ReduxProviders>
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
      </ReduxProviders>
    </ErrorBoundary>
  );
}

export default App;
