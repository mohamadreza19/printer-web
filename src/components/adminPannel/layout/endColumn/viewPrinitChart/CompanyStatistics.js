import Typography from "../../../../../styles/__ready/Typography";

export default function () {
  return (
    <div className="w-100  border-r-top-30 ">
      <header className="w-100 d-flex bg_info">
        <section className="w-50 d-flex justify-content-center py-2 bg-white border-r-top-right-30">
          <Typography.H7>آمار شرکت ها</Typography.H7>
        </section>
        <section className="w-50 d-flex justify-content-center py-2 card-header-chart-disabled border-r-top-left-30">
          <Typography.H7>آمار محصولات و لیبل ها</Typography.H7>
        </section>
      </header>
    </div>
  );
}
