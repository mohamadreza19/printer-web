import { useNavigate, useParams } from "react-router-dom";
import api_put from "../../services/user/api_put";
import { useMutation, useQueryClient } from "react-query";
import { useEffect } from "react";
import useToastReducer from "../../recoil/reducer/useToastReducer";
import useCachedToken from "../../utility/useCachedToken";
import { useSetRecoilState } from "recoil";
import { is_project_sucess_edit_store } from "../../recoil/store/user/project_store";

export const EditProject_Mutation = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { value: token } = useCachedToken();
  const setIsSucess_edit = useSetRecoilState(is_project_sucess_edit_store);
  const setLoading = useToastReducer();
  const { projectId } = useParams();
  const result = useMutation({
    mutationKey: "project-put",
    mutationFn: (option) =>
      api_put.put_projectById(token, option.body, projectId),

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
        message: "",
      });
    }
  }, [isLoading]);

  if (isSuccess) {
    setLoading({
      isShow: false,
      message: "",
    });
    setIsSucess_edit(true);
  }
  console.log({ result });
  return result;
};
