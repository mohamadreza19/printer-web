import { Navigate } from "react-router-dom";
import { useIsUserLogin } from "../recoil/readStore";

export default function ({ children, replacePath = "/login" }) {
  const { isLoggin } = useIsUserLogin();

  if (isLoggin) {
    return children;
  } else {
    return <Navigate to={replacePath} replace />;
  }
}
