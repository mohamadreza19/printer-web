import { useRecoilState } from "recoil";

import { showHide_Btn } from "../../../../../../../../../../recoil/userEditorStore/searchboxStore";

import Editbox from "./editbox";
// import Header from "./Header";
import Header from "./header/index";
import LargeHeader from "./largeHeader/index";
import ScaleController from "./ScaleController";
import { useProject_baseValue } from "../../../../../../../../../../recoil/userEditorStore/project_base";

export default function ({ column }) {
  const [showHide, setShowHide] = useRecoilState(showHide_Btn);
  const poject_base = useProject_baseValue();

  return (
    <div className="w-100 h-100  position-relative">
      {!showHide ? (
        <Header poject_base={poject_base} />
      ) : (
        <LargeHeader poject_base={poject_base} />
      )}

      <Editbox />
      <ScaleController />
    </div>
  );
}
