import { useRecoilState } from "recoil";
import { useDynamicCssClass } from "../../../../../../../../../../recoil/readStore";
import { showHide_Btn } from "../../../../../../../../../../recoil/userEditorStore/searchboxStore";

import Editbox from "./editbox";
// import Header from "./Header";
import Header from "./header/index";
import LargeHeader from "./largeHeader/index";
import ScaleController from "./ScaleController";
import { useState } from "react";

export default function ({ column }) {
  const cssClass = useDynamicCssClass();
  const [showHide, setShowHide] = useRecoilState(showHide_Btn);

  return (
    <div className="w-100 h-100  position-relative">
      {!showHide ? <Header /> : <LargeHeader />}

      <Editbox />
      <ScaleController />
    </div>
  );
}
