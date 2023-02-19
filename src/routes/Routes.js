import { Navigate, Route, Routes } from "react-router-dom";
import useLocalStorage from "react-use-localstorage";
import Authentication from "../controller/Authentication";
import SelectLanguage from "../components/selectLanguage";
import useCachedLanguage from "../utility/useCachedLanguage";
import Login from "../components/login";
import UserPannel from "../components/userPannel";
import ListOfProject from "../components/userPannel/layout/endColumn/listOfProject";
import AddNewProject from "../components/userPannel/layout/endColumn/addNewProject/";

export const UserRoutePath = {
  Index: "/user",
  projectList: "/user/project-list",
  createProject: "/user/add-project",
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
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/user" replace />} />
    </Routes>
  );
}
