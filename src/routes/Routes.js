import { Navigate, Route, Routes } from "react-router-dom";
import useLocalStorage from "react-use-localstorage";
import Authentication from "../controller/Authentication";
import SelectLanguage from "../components/selectLanguage";
import useCachedLanguage from "../utility/useCachedLanguage";
import Login from "../components/login";
import UserPannel from "../components/userPannel";
export default function () {
  const { value: cachedLanguage } = useCachedLanguage();

  // if (!cachedLanguage) return <SelectLanguage />;

  return (
    <div className="w-100">
      <Routes>
        <Route
          path="/user"
          element={
            <Authentication>
              <UserPannel />
            </Authentication>
          }
        ></Route>

        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/user" replace />} />
      </Routes>
    </div>
  );
}
