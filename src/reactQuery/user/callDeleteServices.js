import { useRecoilState } from "recoil";
import { delete_alert } from "../../recoil/recoilStore";
import { useMutation, useQueryClient } from "react-query";
import useCachedToken from "../../utility/useCachedToken";
import { projectsKey, setProjectsKey } from "../querykey/user_key";
import { useEffect } from "react";
import useDeleteAlert from "../../recoil/reducer/useDeleteAlert";
import useToastReducer from "../../recoil/reducer/useToastReducer";

import api_delete from "../../services/user/api_delete";

export const ProjectDeleteOne = () => {
  const setLoading = useToastReducer();

  const setDeleteAlert = useDeleteAlert();

  const { value: token } = useCachedToken();
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationKey: "project-deleteOne",
    mutationFn: (productId) => {
      api_delete.project_deleteOne(token, productId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(projectsKey);
      setProjectsKey(Math.random() * 20);
    },
  });
  const { isLoading, isSuccess, error } = result;

  useEffect(() => {
    if (isLoading) {
      setLoading({ isShow: true, message: "" });
    }
    if (isSuccess) {
      setLoading({ isShow: false, message: "" });
      setDeleteAlert((draft) => ({
        ...draft,
        isShow: false,
      }));
    }
    if (error) {
      setLoading({ isShow: true, message: error });
    }
  }, [isLoading, isSuccess, error]);

  return result;
};
export const Bookmark_Label_Delete = () => {
  const setLoading = useToastReducer();

  const setDeleteAlert = useDeleteAlert();

  const { value: token } = useCachedToken();
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationKey: "delete-label-bookmark",
    mutationFn: (option) => {
      api_delete.label_bookmark_delete(token, option.id);
    },
    onSuccess: () => {
      // queryClient.invalidateQueries(projectsKey);
      // setProjectsKey(Math.random() * 20);
    },
  });
  const { isLoading, isSuccess, error } = result;

  useEffect(() => {
    if (isLoading) {
      setLoading({ isShow: true, message: "" });
    }
    if (isSuccess) {
      setLoading({ isShow: false, message: "" });
      setDeleteAlert((draft) => ({
        ...draft,
        isShow: false,
      }));
    }
    if (error) {
      setLoading({ isShow: true, message: error });
    }
  }, [isLoading, isSuccess, error]);

  return result;
};
export const Bookmark_Product_Delete = () => {
  const setLoading = useToastReducer();

  const setDeleteAlert = useDeleteAlert();

  const { value: token } = useCachedToken();
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationKey: "delete-product-bookmark",
    mutationFn: (option) => {
      api_delete.product_bookmark_delete(token, option.id);
    },
    onSuccess: () => {
      // queryClient.invalidateQueries(projectsKey);
      // setProjectsKey(Math.random() * 20);
    },
  });
  const { isLoading, isSuccess, error } = result;

  useEffect(() => {
    if (isLoading) {
      setLoading({ isShow: true, message: "" });
    }
    if (isSuccess) {
      setLoading({ isShow: false, message: "" });
      setDeleteAlert((draft) => ({
        ...draft,
        isShow: false,
      }));
    }
    if (error) {
      setLoading({ isShow: true, message: error });
    }
  }, [isLoading, isSuccess, error]);

  return result;
};
