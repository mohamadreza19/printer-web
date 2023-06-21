import { useNavigate } from "react-router-dom";
import useAdmin_CachedToken from "./useAdmin_CachedToken";
import useCachedToken from "./useCachedToken";

export const useLogOut = () => {
  const navigate = useNavigate();

  return function (role = "user") {
    if (role == "user") {
      localStorage.removeItem("t");
      navigate("/login");
    }
    if (role == "admin") {
      localStorage.removeItem("admin-t");

      navigate("/admin/login");
    }
  };
};
