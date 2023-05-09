import { Navigate } from "react-router-dom";
import { useIsAdminLogin, useIsUserLogin } from "../recoil/readStore";
import useAdminCached from "../utility/useAdmin_CachedToken";

export default function ({ children, replacePath = "/admin/login" }) {
  const isLoggin = useIsAdminLogin();
  const { value } = useAdminCached();

  if (isLoggin || value) {
    return children;
  } else {
    return <Navigate to={replacePath} replace />;
  }
}
