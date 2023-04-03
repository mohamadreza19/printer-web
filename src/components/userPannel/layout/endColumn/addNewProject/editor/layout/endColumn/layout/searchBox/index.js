import { useDynamicCssClass } from "../../../../../../../../../../recoil/readStore";
import Search from "./Search";

export default function () {
  const cssClass = useDynamicCssClass();
  return (
    <div
      className={"w-100  " + cssClass.ps_3}
      style={{
        // height: "89vh",
        maxHeight: "89vh",
      }}
    >
      <header
        style={{ height: "400px" }}
        className={"bg-white border-r-top-right-20 pt-3 "}
      >
        <Search />
      </header>
    </div>
  );
}
