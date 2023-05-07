import { useEffect } from "react";
import { ProjectDeleteOne_Mutation } from "../../../../../helper/UserApiQueries";
import useToastReducer from "../../../../../recoil/reducer/useToastReducer";
import Project from "./Project";
import useDeleteAlert from "../../../../../recoil/reducer/useDeleteAlert";
import { useQueryClient } from "react-query";

export default function ({ projectList = [{}] }) {
  const queryClient = useQueryClient();
  const { error, isLoading, mutate, isSuccess, data } =
    ProjectDeleteOne_Mutation();
  const setLoading = useToastReducer();
  const setDeleteAlert = useDeleteAlert();

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
  }, [isLoading, data, error]);

  return (
    <div className="w-100 mt-2 px-4 scrollable-medium-test ">
      {projectList.map((project, index) => {
        function showDeleteMassge() {
          setDeleteAlert((draft) => ({
            ...draft,
            isShow: true,
            deleteFn: () => mutate(project.id),
          }));
        }
        return (
          <Project
            project={project}
            key={index}
            showDeleteMassge={showDeleteMassge}
          />
        );
      })}
    </div>
  );
}
