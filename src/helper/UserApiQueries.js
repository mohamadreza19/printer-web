import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import user_callApi from "./user_callApi";
import useCachedToken from "../utility/useCachedToken";
import { delete_alert } from "../recoil/recoilStore";
import { useRecoilState } from "recoil";
import { useParams } from "react-router-dom";

//user projects GET
let projectsKey = 1;
export const UserProjects_Qury = () => {
  const { value: token } = useCachedToken();
  return useQuery({
    queryKey: ["user-projects", projectsKey],
    queryFn: () => user_callApi.project_list(token),
  });
};
//user project GET
export const UserProjectFindOne_Qury = () => {
  const { projectId } = useParams();
  const { value: token } = useCachedToken();
  console.log(projectId);
  return useQuery({
    queryKey: "project",
    queryFn: () => user_callApi.project_findOne(token, projectId),
  });
};
//login POST
export const LoginUser_Mutation = () => {
  return useMutation({
    mutationKey: "login",
    mutationFn: (body) => user_callApi.login(body),
  });
};
//ProjectPost POST
export const ProjectPost_Mutation = () => {
  const queryClient = useQueryClient();
  const { value: token } = useCachedToken();
  const res = useMutation({
    mutationKey: "project-post",
    mutationFn: (body) => {
      user_callApi.project_post(token, body);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(projectsKey);
      projectsKey = Math.random() * 20;
    },
  });

  return res;
};
//ProjectDeleteOne DELETE
export const ProjectDeleteOne_Mutation = () => {
  const [deleteAlert, setDeleteAlert] = useRecoilState(delete_alert);
  const { value: token } = useCachedToken();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: "project-deleteOne",
    mutationFn: (productId) => {
      user_callApi.project_deleteOne(token, productId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(projectsKey);
      projectsKey = Math.random() * 20;
    },
  });
};
