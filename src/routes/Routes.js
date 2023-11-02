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
import AdminAddLabelBeta from "../components/adminPannel/layout/endColumn/addNewLabelBeta";
import Admin_Edit_Product from "../components/adminPannel/layout/endColumn/list_Of_Label_And_Product/ProductEdit";
import Admin_Edit_Label from "../components/adminPannel/layout/endColumn/list_Of_Label_And_Product/LabelEdit";

import AdminList_Of_User from "../components/adminPannel/layout/endColumn/list_Of_User";
import AdminList_Of_User_edit from "../components/adminPannel/layout/endColumn/list_Of_User/edit";
import AdminList_Of_User_Printer from "../components/adminPannel/layout/endColumn/list_Of_User/printer";
//
import AdminList_Of_Manager from "../components/adminPannel/layout/endColumn/list_Of_Manager";
import AdminList_Of_Manager_edit from "../components/adminPannel/layout/endColumn/list_Of_Manager/edit";
import AdminList_Of_Manager_Printer from "../components/adminPannel/layout/endColumn/list_Of_Manager/printer";
import AdminSetting from "../components/adminPannel/layout/endColumn/setting/Setting";
//
import AdminAddLabel from "../components/adminPannel/layout/endColumn/addNewLabel";

import ElsePath from "../controller/ElsePath";
import { Suspense } from "react";
import ViewPrinitChart from "../components/adminPannel/layout/endColumn/viewPrinitChart";
import Loading from "../styles/__ready/Loading";
import AdminAuthentication from "../controller/AdminAuthentication";
const ListOfProject = React.lazy(() =>
  import("../components/userPannel/layout/endColumn/listOfProject")
);
// const Setting = React.lazy(() =>
//   import("../components/adminPannel/layout/endColumn/setting/Setting")
// );
export const UserRoutePath = {
  Index: "/user",
  projectList: "/user/project-list",
  createProject: "/user/add-project",
  labelList: "/user/label-list",
  priningHistory: "/user/print-history",
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
        <Route path="print-history" element={<HistoryPrining />} />
      </Route>
      {/* editor */}
      <Route
        path="user/add-project/editor/:projectId"
        element={<AddNewProject_Editor />}
      />
      {/* <Route
        path="admin/add-label-beta/editor/:projectId"
        element={<AddNewProject_Editor />}
      /> */}
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
        <Route path="add-product/" element={<AdminAddProduct />} />
        <Route
          path="add-product/edit/:productid"
          element={<Admin_Edit_Product />}
        />
        <Route
          path="add-product/upload-flie"
          element={<AdminAddProduct_UploadFile />}
        />
        <Route path="add-project" element={<AddNewProject />} />
        <Route path="add-label-beta" element={<AdminAddLabelBeta />} />
        <Route path="add-label" element={<AdminAddLabel />} />
        <Route path="add-label/edit/:labelid" element={<Admin_Edit_Label />} />
        <Route
          path="list-labels-products"
          element={<AdminList_Of_Label_And_Product />}
        />
        <Route path="list-user" element={<AdminList_Of_User />} />
        <Route path="list-user/edit/:id" element={<AdminList_Of_User_edit />} />
        <Route
          path="list-user/add-printer"
          element={<AdminList_Of_User_Printer />}
        />
        <Route path="list-manager" element={<AdminList_Of_Manager />} />
        <Route
          path="list-manager/edit/:id"
          element={<AdminList_Of_Manager_edit />}
        />
        <Route
          path="list-manager/add-printer"
          element={<AdminList_Of_Manager_Printer />}
        />
        <Route path="charts" element={<ViewPrinitChart />} />
        <Route path="setting" element={<AdminSetting />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="*" element={<ElsePath />} />
    </Routes>
  );
}
