import { UserProjects_Qury } from "../../../../../helper/UserApiQueries";
import useToastReducer from "../../../../../recoil/reducer/useToastReducer";
import Projects from "./Projects";
import SearchBox from "./SearchBox";
import Loading from "../../../../../styles/__ready/Loading";
import { useEffect } from "react";

export default function () {
  const { isLoading, error, data } = UserProjects_Qury();
  const SetLoading = useToastReducer();

  useEffect(() => {
    if (isLoading) {
      SetLoading({ isShow: true, message: "" });
    }
  }, [isLoading]);
  if (error) {
    SetLoading({ isShow: true, message: error });
  }
  if (data) {
    SetLoading({ isShow: false, message: "" });

    return (
      <div className="w-100   h-100">
        <SearchBox />
        <Projects projectList={data.items} />
      </div>
    );
  }
  // data = {
  // items: [{…}],
  // links:// {first: 'http://ipaddress:1235/api/project?limit=10', previous: '', next: '', last: 'http://ipaddress:1235/api/project?page=1&limit=10'},
  // meta: {totalItems: 1, itemCount: 1, itemsPerPage: 10, totalPages: 1, currentPage: 1},
  // };
}
