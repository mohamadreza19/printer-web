import { useDynamicCssClass } from "../../../../../recoil/readStore";
import Icons from "../../../../../styles/__ready/Icons";
import Textfields from "../../../../../styles/__ready/Textfields";
import Typography from "../../../../../styles/__ready/Typography";
import Header from "./Header";
import Items from "./Items";

export default function () {
  return (
    <div className="w-100 ">
      <Header />
      <Items />
    </div>
  );
}
