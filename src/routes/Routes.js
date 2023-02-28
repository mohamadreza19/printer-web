import { Navigate, Route, Routes } from "react-router-dom";
import useLocalStorage from "react-use-localstorage";
import Authentication from "../controller/Authentication";
import SelectLanguage from "../components/selectLanguage";
import useCachedLanguage from "../utility/useCachedLanguage";
import Login from "../components/login";
import UserPannel from "../components/userPannel";
import ListOfProject from "../components/userPannel/layout/endColumn/listOfProject";
import AddNewProject from "../components/userPannel/layout/endColumn/addNewProject/";
import LabelList from "../components/userPannel/layout/endColumn/label-list";
import HistoryPrining from "../components/userPannel/layout/endColumn/historyPrining";
//admin
import AdminPannel from "../components/adminPannel";

import AdminControlPannel from "../components/adminPannel/layout/endColumn/controlPannel";
import AdimHistory from "../components/adminPannel/layout/endColumn/controlPannel/adimHistory";
import AdminAddNewUser from "../components/adminPannel/layout/endColumn/controlPannel/adminAddNewUser";
import AdminAddProduct_Or_Label from "../components/adminPannel/layout/endColumn/addNewProduct_Label";
import ElsePath from "../controller/ElsePath";

export const UserRoutePath = {
  Index: "/user",
  projectList: "/user/project-list",
  createProject: "/user/add-project",
  labelList: "/user/label-list",
  priningHistory: "/user/prining-history",
};
export const AdminRoutePath = {
  index: "/admin",
  controlPannel: "/admin/control-pannel",
  controlPannel_History: "/admin/control-pannel/history",
};

export default function () {
  const { value: cachedLanguage } = useCachedLanguage();

  // if (!cachedLanguage) return <SelectLanguage />;

  return (
    <Routes>
      <Route
        path="/user"
        element={
          <Authentication>
            <UserPannel />
          </Authentication>
        }
      >
        <Route path="project-list" element={<ListOfProject />} />
        <Route path="add-project" element={<AddNewProject />} />
        <Route path="label-list" element={<LabelList />} />
        <Route path="prining-history" element={<HistoryPrining />} />
      </Route>
      <Route
        path="/admin"
        element={
          <Authentication>
            <AdminPannel />
          </Authentication>
        }
      >
        <Route path="control-pannel" element={<AdminControlPannel />} />
        <Route path="control-pannel/history" element={<AdimHistory />} />
        <Route path="control-pannel/add-user" element={<AdminAddNewUser />} />
        <Route
          path="add-product-label"
          element={<AdminAddProduct_Or_Label />}
        />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="*" element={<ElsePath />} />
    </Routes>
  );
}
