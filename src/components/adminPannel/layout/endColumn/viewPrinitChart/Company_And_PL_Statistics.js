import { useState } from "react";
import { AdminPrints } from "../../../../../reactQuery/admin/callGetService";
import Typography from "../../../../../styles/__ready/Typography";
import DynamicCopmanyAndLabel from "./dynamicCopmanyAndLabel";

export default function () {
  const [order, setOrder] = useState("ASC");
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

  if (data)
    return (
      <div>
        <Header
          displayPriority={displayPriority}
          setDisplayPriority={setDisplayPriority}
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
const Header = ({ displayPriority, setDisplayPriority }) => {
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
          <Typography.H7>آمار شرکت ها</Typography.H7>
        </section>
        <section
          onClick={onClickProduct_label}
          className={
            "w-50 d-flex justify-content-center py-2 border-r-top-left-30 " +
            dynamicBackgorund_based_displayPriority_pl
          }
        >
          <Typography.H7>آمار محصولات و لیبل ها</Typography.H7>
        </section>
      </header>
    </div>
  );
};
