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
import Main from "./listOfProject";

export default function () {
  const cssClass = useDynamicCssClass();

  const { pathname } = useLocation();

  if (pathname === "/user")
    return <Navigate to={"/user/project-list"} replace />;

  return (
    <div className={"bg_info  vh-100  p-4 bg- " + cssClass.border_r_s_30px}>
      <Header />
      <main className="bg-white    mt-3 py-4 border-r-top-30 ">
        <Outlet />
      </main>
    </div>
  );
}
