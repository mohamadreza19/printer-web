import { useIsAdminLogin, useIsUserLogin } from "../recoil/readStore";
import { Navigate } from "react-router-dom";

export default function () {
  const isAdminLogin = useIsAdminLogin();
  const isUserLogin = useIsUserLogin();
  return isAdminLogin && <Navigate to={"/admin"} replace />;
  return isUserLogin && <Navigate to={"/user"} replace />;
  return <Navigate to={"/login"} replace />;
}
