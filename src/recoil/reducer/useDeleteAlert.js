import { useSetRecoilState } from "recoil";
import { delete_alert } from "../recoilStore";

export default function () {
  const setState = useSetRecoilState(delete_alert);

  function handler(
    newState = {
      isShow: true,
      message: "",
      deleteFn: () => {},
    }
  ) {
    setState(newState);
  }
  return handler;
}
