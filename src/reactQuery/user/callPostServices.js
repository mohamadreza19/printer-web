import { useMutation, useQueryClient } from "react-query";
import callPostServices from "../../services/user/api_post";
import useCachedToken from "../../utility/useCachedToken";
import { useRecoilState } from "recoil";
import { isUserLogin } from "../../recoil/recoilStore";
import { useNavigate } from "react-router-dom";

import {
  add_Product_Bookmark_Mutation_key,
  delete_bookmark_Product_key,
  projectsKey,
  setAdd_Product_Bookmark_Mutation_key,
  setBookmark_Product_Delete_key,
  setProjectsKey,
} from "../querykey/user_key";
import { useEffect } from "react";
import useToastReducer from "../../recoil/reducer/useToastReducer";
import {
  admin_user_productList,
  setAdmin_user_productList,
} from "../querykey/common";

export const UserLogin_Mutation = () => {
  const [_, setIsUserLogin] = useRecoilState(isUserLogin);
  const { set: setUserToken } = useCachedToken();
  const navigate = useNavigate();
  const result = useMutation({
    mutationKey: "login",
    mutationFn: (body) => callPostServices.login(body),
  });
  const is401 = result.error?.includes("401");
  let message = {
    fa: "",
  };
  let statusCode = 201;
  if (is401) {
    message = {
      fa: "نام کاربری یا رمز عبور اشتباه است",
    };
    statusCode = 401;
  }
  if (result.data) {
    setUserToken(result.data);
    setIsUserLogin(true);
    navigate("/user");
  }
  return { ...result, error: message.fa, statusCode };
};

//need edit projectsKey

export const AddProject_Mutation = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { value: token } = useCachedToken();

  const setLoading = useToastReducer();

  const result = useMutation({
    mutationKey: "project-post",
    mutationFn: (body) => {
      return callPostServices.add_project(token, body);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(projectsKey);
      // projectsKey = Math.random() * 20;
      setProjectsKey(Math.random() * 20);
    },
  });
  const { isLoading, isSuccess, data } = result;
  useEffect(() => {
    if (isLoading) {
      setLoading({
        isShow: true,
        message: "",
      });
    }
  }, [isLoading]);

  if (isSuccess) {
    setLoading({
      isShow: false,
      message: "",
    });
    // data = {
    //   createdAt: "2023-05-07T10:56:14.762Z",
    //   createdBy: "dsfdsf",
    //   id: 127,
    //   numberOfRails: 1,
    //   projectName: "dfsdf",
    //   updatedAt: "2023-05-07T10:56:14.762Z",
    //   userId: 1,
    // }
    navigate(`/user/add-project/editor/${data.id}`);
  }
  return result;
};
export const AddImage_ToPrint_Local_Mutation = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { value: token } = useCachedToken();

  const setLoading = useToastReducer();

  const result = useMutation({
    mutationKey: "local-fileupload",

    mutationFn: (body) => {
      let formedFile = new FormData();
      const width = body.width;
      formedFile.append("fileupload", body.file);

      return callPostServices.add_image_to_local_prointer(formedFile, width);
    },
    onSuccess: (data) => {
      // queryClient.invalidateQueries(projectsKey);
      // projectsKey = Math.random() * 20;
      // setProjectsKey(Math.random() * 20);
    },
  });
  const { isLoading, isSuccess, data } = result;
  useEffect(() => {
    if (isLoading) {
      setLoading({
        isShow: true,
        message: "",
      });
    }
  }, [isLoading]);

  if (isSuccess) {
    setLoading({
      isShow: false,
      message: "",
    });
    // data = {
    //   createdAt: "2023-05-07T10:56:14.762Z",
    //   createdBy: "dsfdsf",
    //   id: 127,
    //   numberOfRails: 1,
    //   projectName: "dfsdf",
    //   updatedAt: "2023-05-07T10:56:14.762Z",
    //   userId: 1,
    // }
  }
  return result;
};
export const Add_Label_Bookmark_Mutation = () => {
  const queryClient = useQueryClient();

  const { value: token } = useCachedToken();

  const setLoading = useToastReducer();

  const result = useMutation({
    mutationKey: "label-bookmark",
    mutationFn: (option) => {
      return callPostServices.add_label_bookmark(token, option.id);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(projectsKey);
      // projectsKey = Math.random() * 20;
      setProjectsKey(Math.random() * 20);
    },
  });
  const { isLoading, isSuccess, data } = result;
  useEffect(() => {
    if (isLoading) {
      setLoading({
        isShow: true,
        message: "",
      });
    }
  }, [isLoading]);

  if (isSuccess) {
    setLoading({
      isShow: false,
      message: "",
    });
  }
  return result;
};
export const Add_Product_Bookmark_Mutation = () => {
  const queryClient = useQueryClient();

  const { value: token } = useCachedToken();

  const setLoading = useToastReducer();

  const result = useMutation({
    mutationKey: ["product-bookmark"],
    mutationFn: (option) => {
      return callPostServices.add_product_bookmark(token, option.id);
    },
    onSuccess: (data) => {
      console.log({ admin_user_productList });
      // queryClient.invalidateQueries(add_Product_Bookmark_Mutation_key);
      // projectsKey = Math.random() * 20;
      // setAdmin_user_productList(Math.random() * 20);
      // setBookmark_Product_Delete_key();
    },
  });
  const { isLoading, isSuccess, data } = result;
  useEffect(() => {
    if (isLoading) {
      setLoading({
        isShow: true,
        message: "",
      });
    }
  }, [isLoading]);

  if (isSuccess) {
    setLoading({
      isShow: false,
      message: "",
    });
  }
  return result;
};
export const Add_Print = () => {
  const queryClient = useQueryClient();

  const { value: token } = useCachedToken();

  const setLoading = useToastReducer();

  const result = useMutation({
    mutationKey: ["add-print"],
    mutationFn: (option) => {
      const firstKey = Object.keys(option)[0];
      const firstValue = option[firstKey];

      const body = {
        [firstKey]: firstValue,
      };
      return callPostServices.add_print(token, body);
    },
    onSuccess: (data) => {
      // queryClient.invalidateQueries(add_Product_Bookmark_Mutation_key);
      // projectsKey = Math.random() * 20;
      // setAdmin_user_productList(Math.random() * 20);
      // setBookmark_Product_Delete_key();
    },
  });
  const { isLoading, isSuccess, data } = result;
  useEffect(() => {
    if (isLoading) {
      setLoading({
        isShow: true,
        message: "",
      });
    }
  }, [isLoading]);

  if (isSuccess) {
    setLoading({
      isShow: false,
      message: "",
    });
  }
  return result;
};
