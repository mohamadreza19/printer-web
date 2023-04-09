import { useRecoilState } from "recoil";
import { cells } from "../userEditorStore/cellsStore";

export default function () {
  const [state, setState] = useRecoilState(cells);
  console.log({ state });
}
