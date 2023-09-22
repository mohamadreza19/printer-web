import { setBaseUrl } from "../services/urlStore";

const PUBLIC_URL = "http://5.160.185.2";
const PRIVATE_URL = "http://192.168.100.2";
const APIPATH_AND_PORT = ":1235/api";
export default function () {
  console.log({
    origin: window.location.origin,
  });
  if (window.location.origin === PRIVATE_URL) {
    setBaseUrl(PRIVATE_URL + APIPATH_AND_PORT);
  } else {
    setBaseUrl(PUBLIC_URL + APIPATH_AND_PORT);
  }
}
