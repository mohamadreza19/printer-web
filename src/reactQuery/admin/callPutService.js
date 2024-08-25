import useToastReducer from '../../recoil/reducer/useToastReducer';
import useAdmin_CachedToken from '../../utility/useAdmin_CachedToken';

import useAdd_user_controller from '../../helper/admin_add_user/controlInputs';
import useAdd_product from '../../helper/admin_add_product_label/control_product_dynamic_input';
import use_label from '../../helper/admin_add_product_label/control_label_dynamic_input';
import { useMutation, useQueryClient } from 'react-query';
import api_put from '../../services/admin/api_put';
import { apiUrl } from '../../services/urlStore';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { is_project_sucess_edit_store } from '../../recoil/store/user/project_store';
import { useResetRecoilState } from 'recoil';
export const AdminEditUser_Mutation = () => {
  const { value: token } = useAdmin_CachedToken();
  const setLoading = useToastReducer();
  const meta = useAdd_user_controller(false, true);
  const result = useMutation({
    mutationKey: 'edit-user',
    mutationFn: async(option) =>{
      const res = await  api_put.edit_user(token, option.id, option.body)
        console.log(res)
      return res
    }, 
    
   
  });
  const { isSuccess, isLoading, error } = result;
  useEffect(() => {
    if (isLoading) {
      setLoading(() => ({
        isShow: true,
        message: '',
      }));
    }
    if (isSuccess) {
      setLoading(() => ({
        isShow: false,
        message: '',
      }));
    }
    if (error) {
      console.log(error);
      if (error.statusCode === 409) {
        const username = error.message.includes('username');
        const email = error.message.includes('email');

        let message = {
          userName: 'این نام کاربری قبلا ثبت شده!',
          email: 'این ایمیل قبلا ثبت شده !',
        };
        if (username) {
          meta.setUsername((draft) => ({ ...draft, errMsg: message.userName }));
          setLoading(() => ({
            isShow: false,
            message: '',
          }));
          return;
        }
        if (email) {
          setLoading(() => ({
            isShow: false,
            message: '',
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

  const result = useMutation({
    mutationKey: 'edit-product',
    mutationFn: (option) => {
      const { productId } = option;
      console.log({ option });
      const copy = { ...option };
      delete copy.exel_file;
      delete copy.exel_file;
      delete copy.is_popup_open;
      delete copy.productId;
      delete copy.file;

      return api_put.edit_product(token, productId, copy);
    },
  });
  const { isSuccess, isLoading, error } = result;
  useEffect(() => {
    if (isLoading) {
      setLoading(() => ({
        isShow: true,
        message: '',
      }));
    }
    if (isSuccess) {
      setLoading(() => ({
        isShow: false,
        message: '',
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
    mutationKey: 'add-product',
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
    mutationKey: 'add-product',
    mutationFn: async (payload) => {
      const { perviusFileId, file } = payload;

      const formData = new FormData();

      formData.append('picture', file);

      return await axios.put(
        `${apiUrl}/file/upload-image/admin/${perviusFileId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },

          onUploadProgress: (progressEvent) => {
            // console.log(progressEvent);
            const { loaded, total } = progressEvent;
            // console.log({ loaded, total });
            const percentage = Math.floor((loaded / total) * 100);
            // console.log(percentage);
            const progressBar = document.getElementById('file-progress');
            const loadedTo_mg = document.getElementById('file-progress-loaded');
            const totalTo_mg = document.getElementById('file-progress-total');

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
export const EditTemplate_project_Mutation = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { value: token } = useAdmin_CachedToken();
  const setIsSucess_edit = useResetRecoilState(is_project_sucess_edit_store);
  const setLoading = useToastReducer();
  const { projectId } = useParams();
  const result = useMutation({
    mutationKey: 'project-template-put',
    mutationFn: (option) =>
      api_put.edit_project_templateById(token, option.body, projectId),

    onSuccess: (data) => {
      //   queryClient.invalidateQueries(projectsKey);
      // projectsKey = Math.random() * 20;
    },
  });
  const { isLoading, isSuccess, data } = result;
  useEffect(() => {
    if (isLoading) {
      setLoading({
        isShow: true,
        message: '',
      });
    }
  }, [isLoading]);

  if (isSuccess) {
    setLoading({
      isShow: false,
      message: '',
    });
    setIsSucess_edit(true);
  }

  return result;
};
