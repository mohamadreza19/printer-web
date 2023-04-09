import { useRecoilValue } from "recoil";
import { cells } from "../../userEditorStore/cellsStore";
export default function () {
  const value = useRecoilValue(cells);

  return value;
}
