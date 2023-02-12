import { Navigate } from "react-router-dom";
import { useIsUserLogin } from "../recoil/readStore";

export default function (props) {
  const { isLoggin } = useIsUserLogin();

  if (isLoggin) {
    return props.children;
  } else {
    return <Navigate to={"/login"} replace />;
  }
}
