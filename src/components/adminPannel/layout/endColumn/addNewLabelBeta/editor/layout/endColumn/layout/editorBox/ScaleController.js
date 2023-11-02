import { useRecoilState } from "recoil";
import {
  ZoomIn,
  ZoomOut,
} from "../../../../../../../../../../styles/__ready/EditorIcons";
import Typography from "../../../../../../../../../../styles/__ready/Typography";
import scaleStore from "../../../../../../../../../../recoil/userEditorStore/scaleStore";

export default function () {
  const [scaleState, setScaleState] = useRecoilState(scaleStore);
  function zoomIn() {
    setScaleState(scaleState + 0.25);
  }

  function zoomOut() {
    setScaleState(scaleState - 0.25);
  }
  function showPercent() {
    return scaleState * 100 + "%";
  }
  return (
    <div className="scale-contoller-box d-flex">
      <section className="scale-contoller-percent-box d-flex justify-content-center align-items-center color_gray2">
        <p>{showPercent()}</p>
      </section>
      <section onClick={zoomIn}>
        <ZoomIn className={"mx-2"} />
      </section>
      <section onClick={zoomOut}>
        <ZoomOut />
      </section>
    </div>
  );
}
