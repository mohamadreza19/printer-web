import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import useAdmin_CachedToken from "../../utility/useAdmin_CachedToken";
import { apiUrl } from "../../services/urlStore";

import api_get from "../../services/common/api_get";
import useCachedToken from "../../utility/useCachedToken";
import useToastReducer from "../../recoil/reducer/useToastReducer";
import { useEffect } from "react";

import {
  admin_user_image,
  admin_user_productList,
  admin_user_symbolList,
} from "../querykey/common";
import { useLanguage } from "../../recoil/readStore";

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
export const Admin_User_Symbol = (role = "admin") => {
  const adminToken = useAdmin_CachedToken();
  const userToken = useCachedToken();
  const queryClient = useQueryClient();
  const setLoading = useToastReducer();
  const result = useMutation({
    mutationKey: ["Admin_User_Symbol", admin_user_symbolList],
    mutationFn: (option) => {
      const { id } = option;

      const currentToken =
        role === "admin" ? adminToken.value : userToken.value;
      return api_get.admin_user_symbol(currentToken, id);
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
  const language = useLanguage();

  const setLoading = useToastReducer();
  function setLanguageHeader_Based_cached_language(language) {
    if (language == "fa") {
      return "persian";
    }
    if (language == "en") {
      return "english";
    }
    if (language == "tr") {
      return "turkish";
    }
  }
  let initUrl = `${apiUrl}/label?`;
  if (search) initUrl = initUrl.concat(`search=${search}&`);
  if (startDate) initUrl = initUrl.concat(`startDate=${startDate}&`);
  if (endDate) initUrl = initUrl.concat(`endDate=${endDate}&`);

  const result = useInfiniteQuery({
    queryKey: ["admin-user-labelList", search, startDate, endDate],

    queryFn: ({ pageParam = initUrl }) =>
      api_get.admin_user_labelList(
        role === "admin" ? adminToken : token,
        pageParam,
        setLanguageHeader_Based_cached_language(language)
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

  const { value: adminToken } = useAdmin_CachedToken();

  const language = useLanguage();
  function setLanguageHeader_Based_cached_language(language) {
    if (language == "fa") {
      return "persian";
    }
    if (language == "en") {
      return "english";
    }
    if (language == "tr") {
      return "turkish";
    }
  }

  const setLoading = useToastReducer();

  let initUrl = `${apiUrl}/product?`;
  if (search) initUrl = initUrl.concat(`search=${search}&`);
  if (startDate) initUrl = initUrl.concat(`startDate=${startDate}&`);
  if (endDate) initUrl = initUrl.concat(`endDate=${endDate}&`);

  const result = useInfiniteQuery({
    queryKey: [
      "admin-user-productList",
      search,
      startDate,
      endDate,
      admin_user_productList,
    ],

    queryFn: ({ pageParam = initUrl }) =>
      api_get.admin_user_productList(
        role === "admin" ? adminToken : token,
        pageParam,
        setLanguageHeader_Based_cached_language(language)
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
  if (result.isSuccess) {
    data.pages.forEach((page) =>
      page.items.forEach((item) => modifiedData.push(item))
    );
  }

  return { ...result, data: modifiedData };
};
export const Admin_UserSymbols = (role = "admin") => {
  const { value: token } = useAdmin_CachedToken();
  const { value: userToken } = useCachedToken();
  const queryClient = useQueryClient();
  const setLoading = useToastReducer();
  const chosenToken = role === "admin" ? token : userToken;

  let queryParams = "symbol?";

  const result = useQuery({
    queryKey: ["admin-symbolList"],
    queryFn: () => api_get.symbols(chosenToken, queryParams),
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

  return result;
};
