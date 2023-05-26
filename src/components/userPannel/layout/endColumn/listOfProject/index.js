import Projects from "./Projects";
import SearchBox from "./SearchBox";

import { useState } from "react";
import { UserProjects_Call } from "../../../../../reactQuery/user/callGetService";

export default function () {
  const [search, setSearch] = useState("");
  const { isLoading, error, data, hasNextPage, fetchNextPage } =
    UserProjects_Call(search);
  console.log(data);
  if (data) {
    return (
      <div className="w-100   ">
        <SearchBox setSearch={setSearch} />
        <Projects
          projectList={data}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
        />
      </div>
    );
  }
  // data = {
  // items: [{…}],
  // links:// {first: 'http://ipaddress:1235/api/project?limit=10', previous: '', next: '', last: 'http://ipaddress:1235/api/project?page=1&limit=10'},
  // meta: {totalItems: 1, itemCount: 1, itemsPerPage: 10, totalPages: 1, currentPage: 1},
  // };
}
