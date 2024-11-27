import moment from "moment";
import jalaliMoment from "jalali-moment";
import "moment/locale/fa";
import "moment/locale/tr";
export default function (utcDate, interval, language) {
  if (interval === "Week") {
    return jalaliMoment(utcDate).locale(language).format("dddd");
  }
  if (interval === "Month") {
    console.log("hhhh");
    return jalaliMoment(utcDate).locale(language).format("MM/DD");
    // return jalaliMoment(utcDate).locale(language).format("MM/DD");
  }
  if (interval === "Year") {
    return jalaliMoment(utcDate).locale(language).format("MMMM");
  }

  if (!interval) {
    return jalaliMoment(utcDate).locale(language).format("YY/M/D");
  }
}
