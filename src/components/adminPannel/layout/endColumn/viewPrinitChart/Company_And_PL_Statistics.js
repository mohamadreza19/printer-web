import { useState } from "react";
import {
  AdminPrints,
  AdminProduct_Label_v2,
  AdminUsers,
} from "../../../../../reactQuery/admin/callGetService";
import Typography from "../../../../../styles/__ready/Typography";
import DynamicCopmanyAndLabel from "./dynamicCopmanyAndLabel";
import {
  useContent_Based_Language,
  useLanguage,
} from "../../../../../recoil/readStore";
import { ProductsLabels } from "./products-labels";
import useCachedLanguage from "../../../../../utility/useCachedLanguage";
import { Companies } from "./companies";

export default function () {
  const [order, setOrder] = useState("DESC");
  const [displayPriority, setDisplayPriority] = useState("product_label"); //companies | product_label

  const users = AdminUsers();

  const products_labels = AdminProduct_Label_v2("All", "", 10, 1);
  const lang = useLanguage();

  const content =
    useContent_Based_Language().AdminPannel.end_col.view_Print_Statistics;

  return (
    <div>
      <Header
        displayPriority={displayPriority}
        setDisplayPriority={setDisplayPriority}
        Company_statistics_text={content.Company_statistics}
        Statistics_of_products_and_labels={
          content.Statistics_of_products_and_labels
        }
      />

      <ProductsLabels
        hasMore={products_labels.hasNextPage}
        next={products_labels.fetchNextPage}
        data={products_labels.data}
        language={lang}
        show={displayPriority === "product_label"}
      />

      <Companies
        hasMore={users.hasNextPage}
        next={users.fetchNextPage}
        data={users.data}
        language={lang}
        show={displayPriority === "companies"}
      />
    </div>
  );
}
const Header = ({
  displayPriority,
  setDisplayPriority,
  Company_statistics_text,
  Statistics_of_products_and_labels,
}) => {
  const dynamicBackgorund_based_displayPriority_Companies =
    displayPriority === "companies"
      ? " bg-white"
      : "card-header-chart-disabled";
  const dynamicBackgorund_based_displayPriority_pl =
    displayPriority === "product_label"
      ? " bg-white"
      : "card-header-chart-disabled";

  function onClickCompanies() {
    setDisplayPriority("companies");
  }

  function onClickProduct_label() {
    setDisplayPriority("product_label");
  }
  return (
    <div className="w-100  border-r-top-30 ">
      <header className="w-100 d-flex bg_info">
        <section
          onClick={onClickCompanies}
          className={
            "w-50 d-flex justify-content-center py-2  border-r-top-right-30 cur-pointer " +
            dynamicBackgorund_based_displayPriority_Companies
          }
        >
          <Typography.H7>{Company_statistics_text}</Typography.H7>
        </section>
        <section
          onClick={onClickProduct_label}
          className={
            "w-50 d-flex justify-content-center py-2 border-r-top-left-30 cur-pointer " +
            dynamicBackgorund_based_displayPriority_pl
          }
        >
          <Typography.H7>{Statistics_of_products_and_labels}</Typography.H7>
        </section>
      </header>
    </div>
  );
};
