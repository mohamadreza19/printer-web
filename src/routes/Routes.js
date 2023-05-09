import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";

import Authentication from "../controller/Authentication";
import SelectLanguage from "../components/selectLanguage";
import useCachedLanguage from "../utility/useCachedLanguage";
import Login from "../components/login";
import AdminLogin from "../components/admin-login";
import UserPannel from "../components/userPannel";

// import ListOfProject from "../components/userPannel/layout/endColumn/listOfProject";

import AddNewProject from "../components/userPannel/layout/endColumn/addNewProject/";
import AddNewProject_Editor from "../components/userPannel/layout/endColumn/addNewProject/editor";
import LabelList from "../components/userPannel/layout/endColumn/label-list";
import HistoryPrining from "../components/userPannel/layout/endColumn/historyPrining";
//admin
import AdminPannel from "../components/adminPannel";

import AdminControlPannel from "../components/adminPannel/layout/endColumn/controlPannel";
import AdimHistory from "../components/adminPannel/layout/endColumn/controlPannel/adimHistory";
import AdminAddNewUser from "../components/adminPannel/layout/endColumn/controlPannel/adminAddNewUser";
import AdminAddProduct from "../components/adminPannel/layout/endColumn/addNewProduct";
import AdminAddProduct_UploadFile from "../components/adminPannel/layout/endColumn/addNewProduct/uploadFile";
import AdminList_Of_Label_And_Product from "../components/adminPannel/layout/endColumn/list_Of_Label_And_Product";
import AdminList_Of_Label_And_Product_edit from "../components/adminPannel/layout/endColumn/list_Of_Label_And_Product/edit";

import AdminList_Of_User_Manager from "../components/adminPannel/layout/endColumn/list_Of_User_Manager";
import AdminList_Of_User_Manager_edit from "../components/adminPannel/layout/endColumn/list_Of_User_Manager/edit";
import AdminList_Of_User_Manager_Printer from "../components/adminPannel/layout/endColumn/list_Of_User_Manager/printer";
//
import AdminAddLabel from "../components/adminPannel/layout/endColumn/addNewLabel";
import AdminAddLabel_UploadFile from "../components/adminPannel/layout/endColumn/addNewLabel/uploadFile";
import ElsePath from "../controller/ElsePath";
import { Suspense } from "react";
import ViewPrinitChart from "../components/adminPannel/layout/endColumn/viewPrinitChart";
import Loading from "../styles/__ready/Loading";
import AdminAuthentication from "../controller/AdminAuthentication";
const ListOfProject = React.lazy(() =>
  import("../components/userPannel/layout/endColumn/listOfProject")
);
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
  addProduct_Or_Label: "/admin/add-product-label",
};

export default function () {
  const { value: cachedLanguage } = useCachedLanguage();

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
        {/* <Route path="project-list" element={<ListOfProject />} /> */}
        <Route
          path="project-list"
          element={
            <Suspense>
              <ListOfProject />
            </Suspense>
          }
        />
        <Route path="add-project" element={<AddNewProject />} />

        <Route path="label-list" element={<LabelList />} />
        <Route path="prining-history" element={<HistoryPrining />} />
      </Route>
      {/* editor */}
      <Route
        path="user/add-project/editor/:projectId"
        element={<AddNewProject_Editor />}
      />
      <Route
        path="/admin"
        element={
          <AdminAuthentication>
            <AdminPannel />
          </AdminAuthentication>
        }
      >
        <Route path="control-pannel" element={<AdminControlPannel />} />
        <Route path="control-pannel/history" element={<AdimHistory />} />
        <Route path="control-pannel/add-user" element={<AdminAddNewUser />} />
        <Route path="add-product" element={<AdminAddProduct />} />
        <Route
          path="add-product/upload-flie"
          element={<AdminAddProduct_UploadFile />}
        />
        <Route path="add-label" element={<AdminAddLabel />} />
        <Route
          path="add-label/upload-file"
          element={<AdminAddLabel_UploadFile />}
        />
        <Route
          path="list-labels-products"
          element={<AdminList_Of_Label_And_Product />}
        />
        <Route
          path="list-labels-products/edit"
          element={<AdminList_Of_Label_And_Product_edit />}
        />
        <Route
          path="list-user-manager"
          element={<AdminList_Of_User_Manager />}
        />
        <Route
          path="list-user-manager/edit"
          element={<AdminList_Of_User_Manager_edit />}
        />
        <Route
          path="list-user-manager/add-printer"
          element={<AdminList_Of_User_Manager_Printer />}
        />
        <Route path="charts" element={<ViewPrinitChart />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="*" element={<ElsePath />} />
    </Routes>
  );
}
