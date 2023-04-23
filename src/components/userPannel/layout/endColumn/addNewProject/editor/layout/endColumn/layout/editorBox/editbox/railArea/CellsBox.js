import { useRecoilState } from "recoil";
import CellBox from "./cellBox";
import { ColumnFour_justify_start } from "../../../../../../../../../../../../recoil/userEditorStore/EditorHeaderActionButton";

export default function ({ children, key, cell }) {
  const [justify, setJustify] = useRecoilState(ColumnFour_justify_start);
  console.log({ cell });
  return (
    <div
      key={key}
      className={`edit-rail d-flex ${
        justify ? "justify-content-start" : "justify-content-end"
      }`}
    >
      {cell.length > 0
        ? cell.map((c, index) => {
            return <CellBox key={index} cell={c} cellWidth={74} />;
          })
        : null}
    </div>
  );
}
