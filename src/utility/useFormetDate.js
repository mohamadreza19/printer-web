import moment from "moment";
import "moment/locale/fa";
import "moment/locale/tr";
export default function (timeStamp = "", language = "", withoutSuffix = false) {
  const date = new Date(timeStamp);
  console.log(moment(timeStamp).daysInMonth());
  return moment(timeStamp).locale(language).fromNow(withoutSuffix);
}
