import { useRecoilValue } from "recoil";
import { cells, cells_history } from "../../userEditorStore/cellsStore";
export default function () {
  // const value = useRecoilValue(cells);
  const value = useRecoilValue(cells_history);

  return value.present;
}
