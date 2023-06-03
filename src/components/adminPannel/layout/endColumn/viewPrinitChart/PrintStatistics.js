import { useDynamicCssClass } from "../../../../../recoil/readStore";
import Typography from "../../../../../styles/__ready/Typography";

export default function ({
  printsStatistics_response = {
    data: {
      totalPrints: "",
      distinctCompanies: "",
      productsAndLabels: "",
    },
  },
  interval = "",
  selectedDate = [],
}) {
  const cssClass = useDynamicCssClass();
  return (
    <div
      className={
        "w-100 d-flex flex-column align-items-center justify-content-center mt-4 " +
        cssClass.pe_6
      }
    >
      <header className="d-flex flex-column align-items-center mb-3">
        <Typography.H3 className="color-primary font-400">
          {printsStatistics_response.data.totalPrints}
        </Typography.H3>
        <Typography.H7>چاپ</Typography.H7>
      </header>
      <main className=" d-flex flex-column align-items-center justify-content-center footer-statistics ">
        <section className="w-100 h-50 d-flex border-bottom d-flex justify-content-center align-item-center">
          <span>
            <Typography.H6 className=" font-400 ">شرکت مختلف</Typography.H6>
          </span>
          <span className={cssClass.me_1}>
            <Typography.H5 className="color-primary font-400 ">
              {printsStatistics_response.data.distinctCompanies}
            </Typography.H5>
          </span>
        </section>
        <section className="w-100 h-50 d-flex d-flex justify-content-center align-item-center">
          <span>
            <Typography.H6 className=" font-400 ">محصول و لیبل</Typography.H6>
          </span>
          <span className={cssClass.me_1}>
            <Typography.H5 className="color-primary font-400 ">
              {printsStatistics_response.data.productsAndLabels}
            </Typography.H5>
          </span>
        </section>
      </main>
    </div>
  );
}
