import { useDynamicCssClass } from "../../../../../../../../../../recoil/readStore";
import Editbox from "./editbox";
// import Header from "./Header";
import Header from "./header/index";
import ScaleController from "./ScaleController";

export default function () {
  const cssClass = useDynamicCssClass();
  return (
    <div className="w-100 h-100  position-relative">
      <Header />
      <Editbox />
      <ScaleController />
    </div>
  );
}
