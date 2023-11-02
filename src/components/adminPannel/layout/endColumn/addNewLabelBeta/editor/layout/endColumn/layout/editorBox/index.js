import { useRecoilState } from "recoil";

import { showHide_Btn } from "../../../../../../../../../../recoil/userEditorStore/searchboxStore";

import Editbox from "./editbox";
// import Header from "./Header";
import Header from "./header/index";
import LargeHeader from "./largeHeader/index";
import ScaleController from "./ScaleController";

export default function ({ column }) {
  const [showHide, setShowHide] = useRecoilState(showHide_Btn);

  return (
    <div className="w-100 h-100  position-relative">
      {!showHide ? <Header /> : <LargeHeader />}

      <Editbox />
      <ScaleController />
    </div>
  );
}
