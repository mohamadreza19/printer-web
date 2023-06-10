import { useRecoilState } from "recoil";
import { delete_alert } from "../../recoil/recoilStore";
import { useMutation, useQueryClient } from "react-query";
import useCachedToken from "../../utility/useCachedToken";
import {
  add_Product_Bookmark_Mutation_key,
  delete_bookmark_Product_key,
  projectsKey,
  setAdd_Product_Bookmark_Mutation_key,
  setBookmark_Product_Delete_key,
  setProjectsKey,
} from "../querykey/user_key";
import { useEffect } from "react";
import useDeleteAlert from "../../recoil/reducer/useDeleteAlert";
import useToastReducer from "../../recoil/reducer/useToastReducer";

import api_delete from "../../services/user/api_delete";
import {
  admin_user_productList,
  setAdmin_user_productList,
} from "../querykey/common";

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
    mutationKey: ["delete-product-bookmark"],
    mutationFn: (option) => {
      api_delete.product_bookmark_delete(token, option.id);
    },
    onSuccess: () => {
      // queryClient.invalidateQueries(add_Product_Bookmark_Mutation_key);
      // setAdmin_user_productList(Math.random() * 20);
      // setAdd_Product_Bookmark_Mutation_key();
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
