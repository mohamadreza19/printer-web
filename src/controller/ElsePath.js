import { useIsAdminLogin, useIsUserLogin } from "../recoil/readStore";
import { Navigate } from "react-router-dom";

export default function () {
  const isAdminLogin = useIsAdminLogin();
  const isUserLogin = useIsUserLogin();
  if (isAdminLogin) {
    return <Navigate to={"/admin/login"} replace />;
  }
  if (isUserLogin) {
    return <Navigate to={"/user"} replace />;
  }

  return <Navigate to={"/login"} replace />;
}
