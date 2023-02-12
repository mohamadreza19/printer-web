import { Route, Routes } from "react-router-dom";
import useLocalStorage from "react-use-localstorage";
import Authentication from "../controller/Authentication";
import SelectLanguage from "../components/selectLanguage";
import useCachedLanguage from "../utility/useCachedLanguage";
import Login from "../components/login";
export default function () {
  const { value: cachedLanguage } = useCachedLanguage();

  if (!cachedLanguage) return <SelectLanguage />;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Authentication>
            <div>slm</div>
          </Authentication>
        }
      ></Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
