import use_addUser_controller from "./admin_add_user/controlInputs";

import { useMutation, useQuery, useQueryClient } from "react-query";

import admin_callApi from "./admin_callApi";
import useAdmin_CachedToken from "../utility/useAdmin_CachedToken";
import useToastReducer from "../recoil/reducer/useToastReducer";
import { useEffect } from "react";
import public_callApi from "./public_callApi";
import { useLanguage } from "../recoil/readStore";
import { useRecoilValue } from "recoil";
import { province_store } from "../recoil/store/admin_add_user/add_user_store";

export const Public_Provinces = () => {
  const queryClient = useQueryClient();
  const setLoading = useToastReducer();
  const language = useLanguage();

  // backend need this language persian turkish english

  let lanForBackend;

  if (language === "fa") {
    lanForBackend = "persian";
  }
  if (language === "en") {
    lanForBackend = "english";
  }
  if (language === "tr") {
    lanForBackend = "turkish";
  }

  const result = useQuery({
    queryKey: ["provinces"],
    queryFn: () => public_callApi.provinces(lanForBackend),
  });
  const { isLoading, isSuccess, error, data } = result;
  let modifiedData = [];
  useEffect(() => {
    if (isLoading) {
      setLoading(() => ({
        isShow: true,
        message: "",
      }));
    }
    if (data) {
      setLoading(() => ({
        isShow: false,
        message: "",
      }));
      modifiedData = data.map((province) => {
        return {
          label: province,
          value: province,
        };
      });
    }
    if (error) {
      setLoading(() => ({
        isShow: true,
        message: error,
      }));
    }
    // console.log(data);
    // console.log(modifiedData);
  }, [isSuccess, isLoading, error]);
  if (data) {
    modifiedData = data.map((province) => {
      return {
        label: province,
        value: province,
      };
    });
  }
  return { ...result, data: modifiedData };
};
export const Public_Provinces_Cities = () => {
  const queryClient = useQueryClient();
  const setLoading = useToastReducer();
  const language = useLanguage();
  const { province } = use_addUser_controller(true);

  let lanForBackend;

  if (language === "fa") {
    lanForBackend = "persian";
  }
  if (language === "en") {
    lanForBackend = "english";
  }
  if (language === "tr") {
    lanForBackend = "turkish";
  }

  const result = useQuery({
    queryKey: ["cities", province],
    queryFn: () => public_callApi.cities(province, lanForBackend),
  });
  const { isLoading, isSuccess, error, data } = result;
  let modifiedData = data;
  useEffect(() => {
    if (isLoading) {
      setLoading(() => ({
        isShow: true,
        message: "",
      }));
    }
    if (data) {
      setLoading(() => ({
        isShow: false,
        message: "",
      }));
      modifiedData = data.map((province) => {
        return {
          label: province,
          value: province,
        };
      });
    }
    if (error) {
      setLoading(() => ({
        isShow: true,
        message: error,
      }));
    }
  }, [isSuccess, isLoading, error]);
  if (data) {
    modifiedData = data.map((city) => {
      return {
        label: city,
        value: city,
      };
    });
  }
  return { ...result, data: modifiedData };
};
