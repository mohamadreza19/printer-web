import {
  Navigate,
  Outlet,
  useLocation,
  useOutlet,
  redirect,
} from "react-router-dom";
import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../../recoil/readStore";

import Header from "./header";

export default function () {
  const cssClass = useDynamicCssClass();
  const { pathname } = useLocation();

  if (pathname === "/admin")
    return <Navigate to={"/admin/control-pannel"} replace />;
  const isControlPannelPath =
    pathname === "/admin/control-pannel" ? true : false;

  return (
    <div
      style={
        {
          // overflowY: "auto",
        }
      }
      className={`bg_info h-100  pt-4 px-4 ${cssClass.border_r_s_30px}`}
    >
      <Header />
      <main
        className={` mt-3 max-h-100  ${
          isControlPannelPath ? " " : "  pt-4 bg-white"
        } border-r-top-30`}
      >
        <Outlet />
      </main>
    </div>
  );
}
