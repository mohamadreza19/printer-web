import CellsBox from "./CellsBox";
import Title from "./Title";
import { useRecoilValue } from "recoil";
import { labelRail_column } from "../../../../../../../../../../../../recoil/userEditorStore/cellsStore";
import Icons from "../../../../../../../../../../../../styles/__ready/Icons";

export default function ({
  rail = {
    id: "",
    customLabels: [],
  },
  deleteRail = () => {},
}) {
  const TrashBox = () => {
    return (
      <div onClick={deleteRail} className="position-absolute trash-rail-box ">
        <Icons.Trash classNameForPath="fill_white" isForEditor />
      </div>
    );
  };

  return (
    <div
      className="w-100 d-flex align-items-end  mb-3"
      style={{
        height: "152.09px",
      }}
    >
      <article className="d-flex align-items-center position-relative">
        <TrashBox />
        <Title children={"ریل اول"} />
        <CellsBox customLabels={rail.customLabels} railId={rail.id} />
      </article>
    </div>
  );
}
