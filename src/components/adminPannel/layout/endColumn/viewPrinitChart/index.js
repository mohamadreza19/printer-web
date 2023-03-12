import Icons from "../../../../../styles/__ready/Icons";
import Typography from "../../../../../styles/__ready/Typography";
import Chart from "./Chart";
import CompanyStatistics from "./CompanyStatistics";
import DynamicCopmanyAndLabel from "./dynamicCopmanyAndLabel";
import Header from "./Header";

export default function () {
  const Divider = () => {
    return (
      <div
        style={{
          backgroundColor: "#F5F5F5",

          height: "20px",
        }}
      ></div>
    );
  };
  return (
    <>
      <div className="w-100 px-3">
        <Header />
        <Chart />
      </div>
      <Divider />
      <CompanyStatistics />
      <DynamicCopmanyAndLabel />
    </>
  );
}
