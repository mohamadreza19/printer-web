import {
  useContent_Based_Language,
  useDynamicCssClass,
  useLanguage,
} from "../../../../../recoil/readStore";
import { content_Based_Language } from "../../../../../recoil/recoilStore";
import Icons from "../../../../../styles/__ready/Icons";
import Textfields from "../../../../../styles/__ready/Textfields";
import Typography from "../../../../../styles/__ready/Typography";

import DropDown from "../../../../../styles/__ready/common/User_DropDown";

export default function ({ search, setSearch, setCurrentList, currentList }) {
  const cssClass = useDynamicCssClass();
  const content = useContent_Based_Language();
  const language = useLanguage();

  function options_based_language() {
    if (language === "fa") {
      return [
        // { label: "همه موارد", value: "All" },
        { label: "لیبل ها", value: "Label" },
        { label: "محصولات", value: "Product" },
      ];
    }
    if (language === "en") {
      return [
        // { label: "All", value: "All" },
        { label: "Label", value: "Label" },
        { label: "Product", value: "Product" },
      ];
    }
    if (language === "tr") {
      return [
        // { label: "Tüm", value: "All" },
        { label: "Label", value: "Label" },
        { label: "Ürün", value: "Product" },
      ];
    }
  }
  return (
    <header className="w-100 d-flex justify-content-between pb-3 border-bottom-gray px-4">
      <article className="d-flex align-items-center">
        <section className="d-flex align-items-center">
          <Icons.Labels classNameForPath="fill_black" />
          <Typography.H8 className={"font-500 " + cssClass.ms_2}>
            {content.AdminPannel.start_col.row2.listOfLabelsAndProduct}
          </Typography.H8>
        </section>
      </article>
      <article className=" d-flex align-items-center">
        <DropDown
          onChange={setCurrentList}
          currentValue={currentList}
          options={options_based_language()}
        />
        <section className={"search_box " + cssClass.ms_2}>
          <Textfields.v2_SearchBox
            value={search}
            placeholder={
              content.AdminPannel.end_col.label_Product_List.searchPlaceHolder
            }
            onClickAndGetValeFn={setSearch}
          />
        </section>
      </article>
    </header>
  );
}
