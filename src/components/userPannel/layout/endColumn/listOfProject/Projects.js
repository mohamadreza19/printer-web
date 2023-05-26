import useToastReducer from "../../../../../recoil/reducer/useToastReducer";
import Project from "./Project";
import useDeleteAlert from "../../../../../recoil/reducer/useDeleteAlert";

import { ProjectDeleteOne } from "../../../../../reactQuery/user/callDeleteServices";
import InfiniteScroll from "react-infinite-scroll-component";

export default function ({
  projectList = [{}],
  hasNextPage,
  fetchNextPage = () => {},
}) {
  const { error, isLoading, mutate, isSuccess, data } = ProjectDeleteOne();
  const setLoading = useToastReducer();
  const setDeleteAlert = useDeleteAlert();

  return (
    <InfiniteScroll
      className="w-100 mt-2 px-4"
      dataLength={projectList.length}
      hasMore={hasNextPage}
      next={fetchNextPage}
      height={540}
    >
      {projectList.map((project, index) => {
        function showDeleteMassge() {
          setDeleteAlert((draft) => ({
            ...draft,
            isShow: true,
            message: "ایا از حذف پروژه خود مطمعا هستید",
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
    </InfiniteScroll>
  );
}
