import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../../recoil/readStore";
import Header from "./header";
import Main from "./main";

export default function () {
  const cssClass = useDynamicCssClass();
  const content = useContent_Based_Language();
  return (
    <div className={"bg_info h-100  p-4  " + cssClass.border_r_s_30px}>
      <Header />
      <Main />
    </div>
  );
}
