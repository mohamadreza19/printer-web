import { useQuery, useQueryClient } from "react-query";
import useToastReducer from "../../recoil/reducer/useToastReducer";
import { useLanguage } from "../../recoil/readStore";
import { useEffect } from "react";

import use_addUser_controller from "../../helper/admin_add_user/controlInputs";

import api_get from "../../services/public/api_get";
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
    queryFn: () => api_get.provinces(lanForBackend),
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
    queryFn: () => api_get.cities(province, lanForBackend),
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
