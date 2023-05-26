import { useDynamicCssClass } from "../../../../../recoil/readStore";
import Icons from "../../../../../styles/__ready/Icons";
import Textfields from "../../../../../styles/__ready/Textfields";
import Typography from "../../../../../styles/__ready/Typography";

import DropDown from "../../../../../styles/__ready/common/User_DropDown";

export default function ({ setSearch, setCurrentList, currentList }) {
  const cssClass = useDynamicCssClass();
  return (
    <header className="w-100 d-flex justify-content-between pb-3 border-bottom-gray">
      <article className="d-flex align-items-center">
        <section className="d-flex align-items-center">
          <Icons.Labels classNameForPath="fill_black" />
          <Typography.H8 className={"font-500 " + cssClass.ms_2}>
            لیست محصولات و لیبل ها
          </Typography.H8>
        </section>
      </article>
      <article className=" d-flex align-items-center">
        <DropDown
          onChange={setCurrentList}
          currentValue={currentList}
          options={[
            { label: "همه موارد", value: "All" },
            { label: "لیبل ها", value: "Label" },
            { label: "محصولات", value: "Product" },
          ]}
        />
        <section className={"search_box " + cssClass.ms_2}>
          <Textfields.v2_SearchBox
            placeholder="جست و جوی محصول"
            onClickAndGetValeFn={setSearch}
          />
        </section>
      </article>
    </header>
  );
}
