import moment from "moment";
import "moment/locale/fa";
import "moment/locale/tr";
export default function (timeStamp = "", language = "") {
  const date = new Date(timeStamp);

  return moment(timeStamp).locale(language).fromNow();
}
