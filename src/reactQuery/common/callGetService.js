import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import useAdmin_CachedToken from "../../utility/useAdmin_CachedToken";
import { apiUrl } from "../../services/urlStore";

import api_get from "../../services/common/api_get";
import useCachedToken from "../../utility/useCachedToken";
import useToastReducer from "../../recoil/reducer/useToastReducer";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { product_column } from "../../recoil/userEditorStore/cellsStore";
import { admin_user_image } from "../querykey/common";

export const Admin_User_Image = (role = "admin") => {
  const adminToken = useAdmin_CachedToken();
  const userToken = useCachedToken();
  const queryClient = useQueryClient();
  const setLoading = useToastReducer();
  const result = useMutation({
    mutationKey: [admin_user_image],
    mutationFn: (option) => {
      const { fileId } = option;

      const currentToken =
        role === "admin" ? adminToken.value : userToken.value;
      return api_get.admin_user_image(currentToken, fileId);
    },
  });
  const { isLoading, isSuccess, error } = result;
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
  // console.log(result);
  return result;
};

export const Admin_User_LabelList_Call = (
  role = "admin",
  search = "",
  startDate = null,
  endDate = null
) => {
  const { value: token } = useCachedToken();
  const { value: adminToken } = useAdmin_CachedToken();

  const setLoading = useToastReducer();

  let initUrl = `${apiUrl}/label?`;
  if (search) initUrl = initUrl.concat(`search=${search}&`);
  if (startDate) initUrl = initUrl.concat(`startDate=${startDate}&`);
  if (endDate) initUrl = initUrl.concat(`endDate=${endDate}&`);

  const result = useInfiniteQuery({
    queryKey: ["admin-user-labelList", search, startDate, endDate],

    queryFn: ({ pageParam = initUrl }) =>
      api_get.admin_user_labelList(
        role === "admin" ? adminToken : token,
        pageParam
      ),

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
export const Admin_User_ProductList_Call = (
  role = "admin",
  search = "",
  startDate = null,
  endDate = null
) => {
  const { value: token } = useCachedToken();
  const [product_column_state, setProduct_column] =
    useRecoilState(product_column);
  const { value: adminToken } = useAdmin_CachedToken();

  const setLoading = useToastReducer();

  let initUrl = `${apiUrl}/product?`;
  if (search) initUrl = initUrl.concat(`search=${search}&`);
  if (startDate) initUrl = initUrl.concat(`startDate=${startDate}&`);
  if (endDate) initUrl = initUrl.concat(`endDate=${endDate}&`);

  const result = useInfiniteQuery({
    queryKey: ["admin-user-productList", search, startDate, endDate],

    queryFn: ({ pageParam = initUrl }) =>
      api_get.admin_user_productList(
        role === "admin" ? adminToken : token,
        pageParam
      ),

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
      if (data) {
        let modifiedData = [];
        data.pages.forEach((page) =>
          page.items.forEach((item) => modifiedData.push(item))
        );

        setProduct_column(modifiedData);
      }
    }
    if (error) {
      setLoading(() => ({
        isShow: true,
        message: error,
      }));
    }
  }, [isSuccess, isLoading, error]);

  if (product_column_state.length > 0) {
    return { ...result, data: product_column_state };
  }
};
