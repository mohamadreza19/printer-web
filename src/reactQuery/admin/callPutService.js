import useToastReducer from "../../recoil/reducer/useToastReducer";
import useAdmin_CachedToken from "../../utility/useAdmin_CachedToken";

import useAdd_user_controller from "../../helper/admin_add_user/controlInputs";
import useAdd_product from "../../helper/admin_add_product_label/control_product_dynamic_input";
import use_label from "../../helper/admin_add_product_label/control_label_dynamic_input";
import { useMutation } from "react-query";
import api_put from "../../services/admin/api_put";
import { apiUrl } from "../../services/urlStore";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
export const AdminEditUser_Mutation = () => {
  const { value: token } = useAdmin_CachedToken();
  const setLoading = useToastReducer();
  const meta = useAdd_user_controller(false, true);
  const result = useMutation({
    mutationKey: "edit-user",
    mutationFn: (option) => api_put.edit_user(token, option.id, option.body),
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
export const AdminEditProduct_Mutation = () => {
  const { value: token } = useAdmin_CachedToken();
  const setLoading = useToastReducer();
  const meta = useAdd_product("none", false, true, false);
  const modifedDate = { ...meta };

  delete modifedDate.picture;
  const result = useMutation({
    mutationKey: "edit-product",
    mutationFn: (option) => api_put.edit_product(token, option.id, modifedDate),
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
export const AdminEditLabel_Mutation = () => {
  const { value: token } = useAdmin_CachedToken();
  const setLoading = useToastReducer();
  const meta = use_label();
  const modifedDate = { ...meta.safeState };

  delete modifedDate.picture;
  const result = useMutation({
    mutationKey: "add-product",
    mutationFn: (option) => api_put.edit_label(token, option.id, modifedDate),
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
  return { ...result };
};
export const AdminEditImage_Mutation = () => {
  const { value: token } = useAdmin_CachedToken();
  const setLoading = useToastReducer();
  const [onLoadedMeta, setOnLoadedMeta] = useState(null);

  const result = useMutation({
    mutationKey: "add-product",
    mutationFn: async (payload) => {
      const { perviusFileId, file } = payload;
      console.log({ file });
      const formData = new FormData();

      formData.append("picture", file);

      return await axios.put(
        `${apiUrl}/file/upload-image/admin/${perviusFileId}`,
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
