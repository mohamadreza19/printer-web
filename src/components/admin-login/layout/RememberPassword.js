import { Link } from "react-router-dom";
import {
  useContent_Based_Language,
  useDynamicCssClass,
  useLanguage,
} from "../../../recoil/readStore";
import Typography from "../../../styles/__ready/Typography";
export default function () {
  const language = useLanguage();
  const { login } = useContent_Based_Language();
  const cssClass = useDynamicCssClass();

  return (
    <div className={"w-100 d-flex  justify-content-end my-2 " + cssClass.me_2}>
      <section className="borderb-primary">
        <Link className="cur-pointer color-primary font-bold ">
          <Typography.H7>{login.remember}</Typography.H7>
        </Link>
      </section>
    </div>
  );
}
