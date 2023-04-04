import {
  ZoomIn,
  ZoomOut,
} from "../../../../../../../../../../styles/__ready/EditorIcons";
import Typography from "../../../../../../../../../../styles/__ready/Typography";

export default function () {
  return (
    <div className="scale-contoller-box d-flex">
      <section className="scale-contoller-percent-box d-flex justify-content-center align-items-center color_gray2">
        <p>100%</p>
      </section>
      <ZoomIn className={"mx-2"} />
      <ZoomOut />
    </div>
  );
}
