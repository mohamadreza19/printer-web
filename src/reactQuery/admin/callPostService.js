import { useMutation, useQueryClient } from "react-query";
import useAdmin_CachedToken from "../../utility/useAdmin_CachedToken";
import useToastReducer from "../../recoil/reducer/useToastReducer";

import useAdd_user_controller from "../../helper/admin_add_user/controlInputs";
import useAdd_product from "../../helper/admin_add_product_label/control_product_dynamic_input";
import use_label from "../../helper/admin_add_product_label/control_label_dynamic_input";

import { apiUrl } from "../../services/urlStore";
import api_post from "../../services/admin/api_post";

import { useState } from "react";
import { useRecoilState } from "recoil";
import { isAdminLogin } from "../../recoil/recoilStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import {
  admin_user_symbolList,
  setAdmin_user_symbolList,
} from "../querykey/common";
import { useSelector } from "react-redux";
import { getProduct } from "../../redux/product/product_slice";
import { useTranslation } from "react-i18next";
export const AdminLogin_Mutation = () => {
  const [_, setIsAdminLogin] = useRecoilState(isAdminLogin);

  const { set: setAdminToken } = useAdmin_CachedToken();
  const setLoading = useToastReducer();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const result = useMutation({
    mutationKey: "admin-login",
    mutationFn: (body) => api_post.login(body),
  });
  const { data, isLoading } = result;

  useEffect(() => {
    if (data) {
      console.log(data);
      setLoading({ isShow: false, message: "" });
      setAdminToken(data);
      setIsAdminLogin(true);
      navigate("/admin");
    }
    if (isLoading) {
      // setLoading({ isShow: true, message: "" });
    }
  }, [data, isLoading]);
  const is401 = result.error?.includes("401");

  let message;

  let statusCode = 201;

  if (is401) {
    message = t("login.401");
    statusCode = 401;
  }

  return { ...result, error: message, statusCode };
};

export const AdminAddUser_Mutation = () => {
  const { value: token } = useAdmin_CachedToken();
  const setLoading = useToastReducer();
  const meta = useAdd_user_controller(false, true);
  const result = useMutation({
    mutationKey: "add-user",
    mutationFn: (body) => api_post.add_user(token, body),
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
      console.log(error);
      if (error.statusCode === 409) {
        const username = error.message.includes("username");
        const email = error.message.includes("email");

        let message = {
          userName: "این نام کاربری قبلا ثبت شده!",
          email: "این ایمیل قبلا ثبت شده !",
        };
        if (username) {
          meta.setUsername((draft) => ({ ...draft, errMsg: message.userName }));
          setLoading(() => ({
            isShow: false,
            message: "",
          }));
          return;
        }
        if (email) {
          setLoading(() => ({
            isShow: false,
            message: "",
          }));
          meta.setEmail((draft) => ({ ...draft, errMsg: message.email }));
          return;
        }
      }

      setLoading(() => ({
        isShow: true,
        message: error,
      }));
    }
  }, [isSuccess, isLoading, error]);
  return { ...result };
};
export const AdminAddAdmin_Mutation = () => {
  const { value: token } = useAdmin_CachedToken();
  const setLoading = useToastReducer();
  const meta = useAdd_user_controller(false, true);
  const result = useMutation({
    mutationKey: "add-admin",
    mutationFn: (body) => api_post.add_admin(token, body),
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
      console.log(error);
      if (error.message.includes("username is already taken")) {
        setLoading(() => ({
          isShow: false,
          message: error,
        }));
      } else
        setLoading(() => ({
          isShow: true,
          message: error,
        }));
    }
  }, [isSuccess, isLoading, error]);
  return { ...result };
};

export const AdminAddProduct_Mutation = () => {
  const { value: token } = useAdmin_CachedToken();
  const setLoading = useToastReducer();

  const result = useMutation({
    mutationKey: "add-product",
    mutationFn: (body) => api_post.add_product(token, body),
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
      console.log(error);

      setLoading(() => ({
        isShow: true,
        message: error,
      }));
    }
  }, [isSuccess, isLoading, error]);
  return { ...result };
};

export const AdminAddLabel_Mutation = () => {
  const { value: token } = useAdmin_CachedToken();
  const setLoading = useToastReducer();
  const meta = use_label();
  const modifedDate = { ...meta.safeState };

  // delete modifedDate.picture;
  const result = useMutation({
    mutationKey: "add-product",
    mutationFn: (body) => api_post.add_label(token, body),
  });
  const { isSuccess, isLoading, error } = result;
  useEffect(() => {
    if (isLoading) {
      // setLoading(() => ({
      //   isShow: true,
      //   message: "",
      // }));
    }
    if (isSuccess) {
      // setLoading(() => ({
      //   isShow: false,
      //   message: "",
      // }));
    }
    if (error) {
      console.log(error);

      setLoading(() => ({
        isShow: false,
        message: error,
      }));
    }
  }, [isSuccess, isLoading, error]);
  return { ...result };
};
export const AdminAddProject_TemplatesMutation = () => {
  const { value: token } = useAdmin_CachedToken();
  const setLoading = useToastReducer();

  const result = useMutation({
    mutationKey: "add_project_templates",
    mutationFn: (body) => api_post.add_project_templates(token, body),
  });

  const { isSuccess, isLoading, error } = result;
  useEffect(() => {
    if (isLoading) {
      // setLoading(() => ({
      //   isShow: true,
      //   message: "",
      // }));
    }
    if (isSuccess) {
      // setLoading(() => ({
      //   isShow: false,
      //   message: "",
      // }));
    }
    if (error) {
      console.log(error);

      setLoading(() => ({
        isShow: true,
        message: error,
      }));
    }
  }, [isSuccess, isLoading, error]);

  return result;
};

export const AdminAddImage_Mutation = () => {
  const { value: token } = useAdmin_CachedToken();
  const setLoading = useToastReducer();
  const [onLoadedMeta, setOnLoadedMeta] = useState(null);

  const result = useMutation({
    mutationKey: "add-product",
    mutationFn: async (payload) => {
      const { entityType, entityId, file } = payload;
      console.log(file.constructor === Blob);
      const formData = new FormData();
      formData.append("picture", file, file.name);
      return await axios.post(
        `${apiUrl}/file/upload-image/admin?entityType=${entityType}&entityId=${entityId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
            "Content-Type": "multipart/form-data",
          },

          onUploadProgress: (progressEvent) => {
            // console.log(progressEvent);
            const { loaded, total } = progressEvent;
            // console.log({ loaded, total });
            const percentage = Math.floor((loaded / total) * 100);
            // console.log(percentage);
            const progressBar = document.getElementById("file-progress");
            const loadedTo_mg = document.getElementById("file-progress-loaded");
            const totalTo_mg = document.getElementById("file-progress-total");

            const loaded_mb = Number(loaded / Math.pow(1024, 2)).toFixed(2);
            const total_mb = Number(total / Math.pow(1024, 2)).toFixed(2);

            let uploadMeta = {
              loaded_mb: loaded_mb,
              total_mb: total_mb,
              percentage: percentage,
            };
            setOnLoadedMeta(uploadMeta);
            loadedTo_mg.innerText = `${loaded_mb}/`;
            totalTo_mg.innerText = `${total_mb}`;
            console.log({ loaded_mb, total_mb });

            progressBar.value = percentage;
          },
        }
      );
    },
  });

  return { ...result, onLoadedMeta };
};
export const AdminAddSymbol_Mutation = () => {
  const { value: token } = useAdmin_CachedToken();
  const setLoading = useToastReducer();
  const queryClient = useQueryClient();
  const [onLoadedMeta, setOnLoadedMeta] = useState(null);

  const result = useMutation({
    mutationKey: "AdminAddSymbol_Mutation",
    mutationFn: async (payload) => {
      const { file } = payload;

      const formData = new FormData();
      formData.append("picture", file, file.name);
      return await axios.post(`${apiUrl}/symbol`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
          "Content-Type": "multipart/form-data",
        },

        onUploadProgress: (progressEvent) => {
          // console.log(progressEvent);
          const { loaded, total } = progressEvent;
          // console.log({ loaded, total });
          const percentage = Math.floor((loaded / total) * 100);
          // console.log(percentage);
          const progressBar = document.getElementById("file-progress");
          const loadedTo_mg = document.getElementById("file-progress-loaded");
          const totalTo_mg = document.getElementById("file-progress-total");

          const loaded_mb = Number(loaded / Math.pow(1024, 2)).toFixed(2);
          const total_mb = Number(total / Math.pow(1024, 2)).toFixed(2);

          let uploadMeta = {
            loaded_mb: loaded_mb,
            total_mb: total_mb,
            percentage: percentage,
          };
          setOnLoadedMeta(uploadMeta);
          loadedTo_mg.innerText = `${loaded_mb}/`;
          totalTo_mg.innerText = `${total_mb}`;
          console.log({ loaded_mb, total_mb });

          progressBar.value = percentage;
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(admin_user_symbolList);
      setAdmin_user_symbolList(Math.random() * 100);
    },
  });

  return { ...result, onLoadedMeta };
};
export const AdminAddImageSlide_Mutation = () => {
  const { value: token } = useAdmin_CachedToken();
  const setLoading = useToastReducer();
  const queryClient = useQueryClient();
  const [onLoadedMeta, setOnLoadedMeta] = useState(null);

  const result = useMutation({
    mutationKey: "AdminAddImageSlide_Mutation",
    mutationFn: async (payload) => {
      const { file } = payload;

      const formData = new FormData();
      formData.append("picture", file, file.name);
      return await axios.post(`${apiUrl}/slider`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
          "Content-Type": "multipart/form-data",
        },

        // onUploadProgress: (progressEvent) => {
        //   // console.log(progressEvent);
        //   const { loaded, total } = progressEvent;
        //   // console.log({ loaded, total });
        //   const percentage = Math.floor((loaded / total) * 100);
        //   // console.log(percentage);
        //   const progressBar = document.getElementById("file-progress");
        //   const loadedTo_mg = document.getElementById("file-progress-loaded");
        //   const totalTo_mg = document.getElementById("file-progress-total");

        //   const loaded_mb = Number(loaded / Math.pow(1024, 2)).toFixed(2);
        //   const total_mb = Number(total / Math.pow(1024, 2)).toFixed(2);
        //   console.log({ loaded_mb });
        //   let uploadMeta = {
        //     loaded_mb: loaded_mb,
        //     total_mb: total_mb,
        //     percentage: percentage,
        //   };

        //   setOnLoadedMeta(uploadMeta);
        //   loadedTo_mg.innerText = `${loaded_mb}/`;
        //   totalTo_mg.innerText = `${total_mb}`;
        //   console.log({ loaded_mb, total_mb });

        //   progressBar.value = percentage;
        // },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(admin_user_symbolList);
      setAdmin_user_symbolList(Math.random() * 100);
    },
  });

  return { ...result, onLoadedMeta };
};
export const AdminAddExcelFile_Mutation = () => {
  const { value: token } = useAdmin_CachedToken();
  const setLoading = useToastReducer();
  const [onLoadedMeta, setOnLoadedMeta] = useState(null);

  const result = useMutation({
    mutationKey: "add-product",
    mutationFn: async (payload) => {
      const { file } = payload;

      const formData = new FormData();
      formData.append("excel", file, file.name);

      return await axios.post(`${apiUrl}/file/upload-exel/admin`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
          "Content-Type": "multipart/form-data",
        },

        onUploadProgress: (progressEvent) => {
          // console.log(progressEvent);
          const { loaded, total } = progressEvent;
          // console.log({ loaded, total });
          const percentage = Math.floor((loaded / total) * 100);
          // console.log(percentage);
          const progressBar = document.getElementById("file-progress");
          const loadedTo_mg = document.getElementById("file-progress-loaded");
          const totalTo_mg = document.getElementById("file-progress-total");

          const loaded_mb = Number(loaded / Math.pow(1024, 2)).toFixed(2);
          const total_mb = Number(total / Math.pow(1024, 2)).toFixed(2);

          let uploadMeta = {
            loaded_mb: loaded_mb,
            total_mb: total_mb,
            percentage: percentage,
          };
          setOnLoadedMeta(uploadMeta);
          // loadedTo_mg.innerText = `${loaded_mb}/`;
          // totalTo_mg.innerText = `${total_mb}`;
          console.log({ loaded_mb, total_mb });

          progressBar.value = percentage;
        },
      });
    },
  });

  return { ...result, onLoadedMeta };
};
