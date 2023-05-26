import { useEffect } from "react";
import useToastReducer from "../../recoil/reducer/useToastReducer";
import useCachedToken from "../../utility/useCachedToken";
import { useParams } from "react-router-dom";

import api_get from "../../services/user/api_get";
import { useInfiniteQuery, useQuery } from "react-query";
import { projectsKey } from "../querykey/user_key";

import { apiUrl } from "../../services/urlStore";
export const UserProjects_Call = (
  search = "",
  startDate = null,
  endDate = null
) => {
  const { value: token } = useCachedToken();
  const setLoading = useToastReducer();
  let initUrl = `${apiUrl}/project/user?`;

  // if (page) initUrl = initUrl.concat(`page=${page}&`);
  // if (limit) initUrl = initUrl.concat(`limit=${limit}&`);
  if (search) initUrl = initUrl.concat(`search=${search}&`);
  if (startDate) initUrl = initUrl.concat(`startDate=${startDate}&`);
  if (endDate) initUrl = initUrl.concat(`endDate=${endDate}&`);
  console.log(initUrl);
  const result = useInfiniteQuery({
    queryKey: ["user-projects", search, projectsKey, startDate, endDate],
    queryFn: ({ pageParam = initUrl }) =>
      api_get.project_list(token, pageParam),
    getNextPageParam: (lastPage) => lastPage.links.next || undefined,
  });

  const { isSuccess, isLoading, error, data } = result;

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
  let modifiedData = [];
  if (data) {
    data.pages.forEach((page) =>
      page.items.forEach((item) => modifiedData.push(item))
    );
  }

  return { ...result, data: modifiedData };
};

// export const UserProduct_Qury = () => {
//   const { value: token } = useCachedToken();
//   return useQuery({
//     queryKey: ["product_list", projectsKey],
//     queryFn: () => user_callApi.product_list(token),
//   });
// };

// export const UserLabels_Qury = () => {
//   const { value: token } = useCachedToken();
//   const a = useQuery({
//     queryKey: ["label_list"],
//     queryFn: () => user_callApi.label_list(token),
//   });

//   return a;
// };

// export const UserProjectFindOne_Qury = () => {
//   const { projectId } = useParams();
//   const { value: token } = useCachedToken();
//   console.log(projectId);
//   return useQuery({
//     queryKey: "project",
//     queryFn: () => user_callApi.project_findOne(token, projectId),
//   });
// };
