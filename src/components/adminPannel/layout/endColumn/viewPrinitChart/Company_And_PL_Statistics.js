import { useState } from "react";
import { AdminPrints } from "../../../../../reactQuery/admin/callGetService";
import Typography from "../../../../../styles/__ready/Typography";
import DynamicCopmanyAndLabel from "./dynamicCopmanyAndLabel";
import { useContent_Based_Language } from "../../../../../recoil/readStore";

export default function () {
  const [order, setOrder] = useState("DESC");
  const [displayPriority, setDisplayPriority] = useState("companies");
  const { data, hasNextPage, fetchNextPage } = AdminPrints(
    1,
    10,
    null,
    null,
    null,
    null,
    order
  );
  const content =
    useContent_Based_Language().AdminPannel.end_col.view_Print_Statistics;

  if (data)
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
        <DynamicCopmanyAndLabel
          data={data}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          setOrder={setOrder}
          displayPriority={displayPriority}
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
            "w-50 d-flex justify-content-center py-2  border-r-top-right-30 " +
            dynamicBackgorund_based_displayPriority_Companies
          }
        >
          <Typography.H7>{Company_statistics_text}</Typography.H7>
        </section>
        <section
          onClick={onClickProduct_label}
          className={
            "w-50 d-flex justify-content-center py-2 border-r-top-left-30 " +
            dynamicBackgorund_based_displayPriority_pl
          }
        >
          <Typography.H7>{Statistics_of_products_and_labels}</Typography.H7>
        </section>
      </header>
    </div>
  );
};
