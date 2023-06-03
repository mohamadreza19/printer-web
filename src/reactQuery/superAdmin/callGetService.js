import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import useAdmin_CachedToken from "../../utility/useAdmin_CachedToken";
import useCachedToken from "../../utility/useCachedToken";
import useToastReducer from "../../recoil/reducer/useToastReducer";

import api_get from "../../services/admin/api_get";
import { useEffect } from "react";
import { adminsList_key } from "../querykey/admin_key";

export const SuperAdmin_Admins = () => {
  const { value: token } = useAdmin_CachedToken();
  const setLoading = useToastReducer();

  const result = useQuery({
    queryKey: [adminsList_key],

    queryFn: () => api_get.admins(token),
  });
  const { isSuccess, isLoading, error } = result;
  useEffect(() => {
    if (isLoading) {
      setLoading(() => ({
        isShow: true,
        message: "",
      }));
    }
    if (isSuccess) {
      setLoading(() => ({
        isShow: false,
        message: "",
      }));
    }
    if (error) {
      setLoading(() => ({
        isShow: true,
        message: error,
      }));
    }
  }, [isSuccess, isLoading, error]);

  return result;
};
