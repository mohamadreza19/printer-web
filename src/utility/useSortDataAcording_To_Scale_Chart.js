import { useState } from "react";
import { useEffect } from "react";
import useFormatDate2 from "./useFormatDate2";

export default function (
  interval,
  scale,
  setScale,
  data,
  ignoreInterval,
  language
) {
  console.log({ ignoreInterval });
  //interval Week 7  Month 30 Year 12
  const [wholeData, setWholeData] = useState([]);
  const [chart_data, setChart_data] = useState([]);

  function lookUpScale() {
    if (wholeData.length > 6) {
      let sliced = [];

      if (interval === "Week") {
        sliced = wholeData.slice(0, 7);
      }
      if (interval === "Month") {
        sliced = wholeData.slice(0, 30);
      }
      if (interval === "Year") {
        sliced = wholeData.slice(0, 12);
      }
      setChart_data(sliced);
    }
  }
  function ignoreIntervalContoller() {
    if (!ignoreInterval) {
      return lookUpScale();
    } else {
      setChart_data(wholeData);
    }
  }
  useEffect(() => {
    if (data) {
      let modifiedData = data.map((item) => {
        const name = useFormatDate2(
          item.date_X,
          !ignoreInterval ? interval : "",
          language
        );
        const key = "تعداد چاپ";

        return { name, "تعداد چاپ": item.count_Y };
      });

      setWholeData(modifiedData);
      // lookUpScale();
      ignoreIntervalContoller();
    }
  }, [data.length, interval, scale, wholeData.length, ignoreInterval]);

  return chart_data;
}
