import { Navigate } from "react-router-dom";
import { useIsUserLogin } from "../recoil/readStore";
import useCachedToken from "../utility/useCachedToken";

export default function ({ children, replacePath = "/login" }) {
  const userToken = useCachedToken();
  const isLoggin = useIsUserLogin();

  if (isLoggin || userToken.value) {
    return children;
  } else {
    return <Navigate to={replacePath} replace />;
  }
}
