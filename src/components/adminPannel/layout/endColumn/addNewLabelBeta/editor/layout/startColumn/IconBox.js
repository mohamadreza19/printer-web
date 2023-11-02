import { Link } from "react-router-dom";
import Typography from "../../../../../../../../styles/__ready/Typography";

export default function () {
  return (
    <div className="w-100 ">
      <section className="d-flex justify-content-center">
        <Link
          className="d-flex justify-content-center"
          to={"/user/project-list"}
        >
          <img src="/image/editor_start_icon.png" className="w-62 " />
        </Link>
      </section>
      <section className="d-flex justify-content-center mt-2">
        <img src="/svg/raad.svg" />
      </section>
      <section className="d-flex justify-content-center ">
        <Typography.H9_5 className="color-white font-200">
          Label Editor
        </Typography.H9_5>
      </section>
    </div>
  );
}
