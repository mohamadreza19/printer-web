import { useDynamicCssClass, useLanguage } from "../../../../recoil/readStore";
import Typography from "../../Typography";

export default function ({ printsCount = "", text = "" }) {
  const lan = useLanguage();
  const cssClass = useDynamicCssClass();
  return (
    <Typography.H10 language={lan}>
      {printsCount}
      <span className={cssClass.ms_1}>{text}</span>
    </Typography.H10>
  );
}
