import { useDynamicCssClass } from "../../../../../../../../../../../recoil/readStore";
import {
  Angle,
  CubeSpace,
  Down,
  Text,
  TextSize,
  Up,
} from "../../../../../../../../../../../styles/__ready/EditorIcons";
import Typography from "../../../../../../../../../../../styles/__ready/Typography";

export default function () {
  const cssClass = useDynamicCssClass();
  return (
    <article className="mx-2 ">
      <header className="d-flex mb-2 ">
        <section className="editor-medium-cell-box px-2 me-2 d-flex align-items-center justify-content-between ">
          <TextSize />
          <Typography.H9 className={" ms-2 "} language="en">
            14
          </Typography.H9>
          <div className="d-flex flex-column  justify-content-center ">
            <Up />
            <Down />
          </div>
        </section>
        <section className="editor-medium-cell-box px-2 me-2 d-flex align-items-center justify-content-between ">
          <CubeSpace />
          <Typography.H9 className={" ms-2 "} language="en">
            14
          </Typography.H9>
          <div className="d-flex flex-column  justify-content-center ">
            <Up />
            <Down />
          </div>
        </section>
      </header>
      <footer className="d-flex ">
        <section className="editor-medium-cell-box px-2 me-2 d-flex align-items-center justify-content-between ">
          <Angle />
          <Typography.H9 className={" ms-2 "} language="en">
            14
          </Typography.H9>
          <div className="d-flex flex-column  justify-content-center ">
            <Up />
            <Down />
          </div>
        </section>
        <section className="editor-medium-cell-box px-2  d-flex align-items-center justify-content-between ">
          <Text />
          <Typography.H9 className={" ms-2 "} language="en">
            14
          </Typography.H9>
          <div className="d-flex flex-column  justify-content-center ">
            <Up />
            <Down />
          </div>
        </section>
      </footer>
    </article>
  );
}
