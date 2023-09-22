import { useIsAdminLogin, useIsUserLogin } from "../recoil/readStore";
import { Navigate } from "react-router-dom";
import useCachedToken from "../utility/useCachedToken";

export default function ElsePath() {
  const isAdminLogin = useIsAdminLogin();
  const isUserLogin = useIsUserLogin();
  const userToken = useCachedToken();

  if (isAdminLogin) {
    return <Navigate to={"/admin/login"} replace />;
  }
  if (isUserLogin || userToken) {
    return <Navigate to={"/user"} replace />;
  }

  return <Navigate to={"/login"} replace />;
}
