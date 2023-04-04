import { useDynamicCssClass } from "../../../../../../../../../../recoil/readStore";
import Bookmarks from "./Bookmarks";
import Labels_Products from "./Labels_Products";
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
      <main
        style={{ height: "400px" }}
        className={"bg-white border-r-top-right-20 pt-3 "}
      >
        <Search />
        <Bookmarks />
        <Labels_Products />
      </main>
    </div>
  );
}
