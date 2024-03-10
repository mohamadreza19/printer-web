import { Link } from "react-router-dom";
import {
  useContent_Based_Language,
  useDynamicCssClass,
  useLanguage,
} from "../../../recoil/readStore";
import Typography from "../../../styles/__ready/Typography";
import { useTranslation } from "react-i18next";
export default function () {
  const language = useLanguage();

  const cssClass = useDynamicCssClass();
  const { t } = useTranslation();

  return (
    <div className={"w-100 d-flex  justify-content-end my-2 " + cssClass.me_2}>
      <section className="borderb-primary">
        <Link className="cur-pointer color-primary font-bold ">
          <Typography.H7>{t("login.forgetPassword")}</Typography.H7>
        </Link>
      </section>
    </div>
  );
}
