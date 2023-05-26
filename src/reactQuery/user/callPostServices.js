import { useMutation, useQueryClient } from "react-query";
import callPostServices from "../../services/user/api_post";
import useCachedToken from "../../utility/useCachedToken";
import { useRecoilState } from "recoil";
import { isUserLogin } from "../../recoil/recoilStore";
import { useNavigate } from "react-router-dom";

import { projectsKey, setProjectsKey } from "../querykey/user_key";
import { useEffect } from "react";
import useToastReducer from "../../recoil/reducer/useToastReducer";

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
    console.log("hiiiiiiiii");
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
