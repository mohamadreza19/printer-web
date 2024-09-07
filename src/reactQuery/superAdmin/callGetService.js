import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import useAdmin_CachedToken from "../../utility/useAdmin_CachedToken";
import useCachedToken from "../../utility/useCachedToken";
import useToastReducer from "../../recoil/reducer/useToastReducer";

import api_get from "../../services/admin/api_get";
import { useEffect } from "react";
import { adminsList_key } from "../querykey/admin_key";
import { apiUrl } from "../../services/urlStore";

import handleNextPageParam from "../../helper/handleNextPageParam";

export const SuperAdmin_Admins = (search) => {
  const { value: token } = useAdmin_CachedToken();
  const setLoading = useToastReducer();
  let initialUrl = `${apiUrl}/admin?`;

  if (search) {
    initialUrl = initialUrl.concat(`search=${search}&`);
  }
  console.log(initialUrl);
  const result = useQuery({
    queryKey: [adminsList_key, search],

    queryFn: ({ pageParam = initialUrl }) => api_get.admins(token, pageParam),
    getNextPageParam: (lastPage) =>
      handleNextPageParam(lastPage.meta, initialUrl),
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
