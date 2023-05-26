import { useLanguage } from "../../../../../recoil/readStore";
import Item from "./Item";

export default function ({ projects }) {
  const lan = useLanguage();
  return (
    <div className="w-100 mt-3   px-4">
      {projects.map((project, key) => (
        <Item project={project} key={key} language={lan} />
      ))}
    </div>
  );
}
