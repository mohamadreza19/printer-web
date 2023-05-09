import { useMutation, useQuery, useQueryClient } from "react-query";

import admin_callApi from "./admin_callApi";
import useAdmin_CachedToken from "../utility/useAdmin_CachedToken";

//_POST

//__login
export const AdminLogin_Mutation = () => {
  const result = useMutation({
    mutationKey: "admin-login",
    mutationFn: (body) => admin_callApi.login(body),
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

  return { ...result, error: message.fa, statusCode };
};

//_GET

//__project/admin

export const AdminProjects = () => {
  const { value: token } = useAdmin_CachedToken();
  const queryClient = useQueryClient();
  const result = useQuery({
    queryKey: "admin-projects",
    queryFn: () => admin_callApi.projects(token),
  });
  // const is401 = result.error?.includes("401");
  // let message = {
  //   fa: "",
  // };
  // let statusCode = 201;
  // if (is401) {
  //   message = {
  //     fa: "نام کاربری یا رمز عبور اشتباه است",
  //   };
  //   statusCode = 401;
  // }

  // return { ...result, error: message.fa, statusCode };
  return result;
};
