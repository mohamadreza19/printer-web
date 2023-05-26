import InfiniteScroll from "react-infinite-scroll-component";
import { useLanguage } from "../../../../../recoil/readStore";
import Item from "./Item";

export default function ({
  projects = [],
  hasNextPage,
  fetchNextPage = () => {},
}) {
  const lan = useLanguage();
  return (
    <InfiniteScroll
      dataLength={projects.length}
      hasMore={hasNextPage}
      next={fetchNextPage}
      height={430}
      className="w-100 mt-3   px-4"
    >
      {projects.map((project, key) => (
        <Item project={project} key={key} language={lan} />
      ))}
    </InfiniteScroll>
  );
}
