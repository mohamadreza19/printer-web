import moment from "moment";
import jalaliMoment from "jalali-moment";
import "moment/locale/fa";
import "moment/locale/tr";
export default function (timeStamp = "", language = "", withoutSuffix = false) {
  const date = moment(new Date());
  const timeStamp_ = moment(timeStamp);
  timeStamp_.diff(date, "days");

  const diff = timeStamp_.diff(date, "days");

  if (diff >= 1) {
    return jalaliMoment(timeStamp).locale(language).format("y/M/D");
  }
  return jalaliMoment(timeStamp).locale(language).fromNow(withoutSuffix);
}
