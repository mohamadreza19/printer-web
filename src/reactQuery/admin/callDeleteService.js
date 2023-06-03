import { useMutation, useQueryClient } from "react-query";
import useAdmin_CachedToken from "../../utility/useAdmin_CachedToken";
import useDeleteAlert from "../../recoil/reducer/useDeleteAlert";
import useToastReducer from "../../recoil/reducer/useToastReducer";
import api_delete from "../../services/admin/api_delete";
import {
  adminsList_key,
  admins_and_users_key,
  product_label_key,
  setAdminsList_key,
  setAdmins_and_users_key,
  setProduct_label_key,
} from "../querykey/admin_key";
import { useEffect } from "react";
import { setAdmin_user_image } from "../querykey/common";
export const AdminDelete_Product_Mutation = () => {
  const { value: token } = useAdmin_CachedToken();

  const queryClient = useQueryClient();

  const setDeleteAlert = useDeleteAlert();
  const setLoading = useToastReducer();

  const result = useMutation({
    mutationKey: "admin-delete_product",
    mutationFn: (option) => api_delete.delete_product(token, option.id),
    onSuccess: () => {
      console.log("is Success");
      queryClient.invalidateQueries(product_label_key);
      setProduct_label_key(Math.random() * 100);
      setAdmin_user_image(Math.random() * 100);
    },
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

      setDeleteAlert({
        isShow: false,
        message: "",
        deleteFn: () => {},
      });
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
export const AdminDelete_Label_Mutation = () => {
  const { value: token } = useAdmin_CachedToken();
  const queryClient = useQueryClient();
  const setDeleteAlert = useDeleteAlert();
  const setLoading = useToastReducer();
  const result = useMutation({
    mutationKey: "admin-delete-label",
    mutationFn: (option) => api_delete.delete_label(token, option.id),
    onSuccess: () => {
      console.log({ product_label_key });
      queryClient.invalidateQueries(product_label_key);
      setProduct_label_key(Math.random() * 100);
      setAdmin_user_image(Math.random() * 100);
    },
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

      setDeleteAlert({
        isShow: false,
        message: "",
        deleteFn: () => {},
      });
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
export const AdminDelete_User_Mutation = () => {
  const { value: token } = useAdmin_CachedToken();
  const queryClient = useQueryClient();
  const setDeleteAlert = useDeleteAlert();
  const setLoading = useToastReducer();
  const result = useMutation({
    mutationKey: "admin-delete-label",
    mutationFn: (option) => api_delete.delete_user(token, option.id),
    onSuccess: () => {
      queryClient.invalidateQueries(admins_and_users_key);
      setAdmins_and_users_key(Math.random() * 10);
    },
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

      setDeleteAlert({
        isShow: false,
        message: "",
        deleteFn: () => {},
      });
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
export const Super_AdminDelete_Admin_Mutation = () => {
  const { value: token } = useAdmin_CachedToken();
  const queryClient = useQueryClient();
  const setDeleteAlert = useDeleteAlert();
  const setLoading = useToastReducer();
  const result = useMutation({
    mutationKey: "super-admin-delete-admin",
    mutationFn: (option) => api_delete.delete_admin(token, option.id),
    onSuccess: () => {
      queryClient.invalidateQueries(adminsList_key);
      setAdminsList_key(Math.random() * 10);
    },
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

      setDeleteAlert({
        isShow: false,
        message: "",
        deleteFn: () => {},
      });
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
