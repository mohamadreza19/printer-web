import { Navigate } from "react-router-dom";
import { useIsAdminLogin, useIsUserLogin } from "../recoil/readStore";

export default function ({ children, replacePath = "/login" }) {
  const { isLoggin } = useIsAdminLogin();

  if (isLoggin) {
    return children;
  } else {
    return <Navigate to={replacePath} replace />;
  }
}
