import { useSetRecoilState } from "recoil";
import { toastifyStore } from "../recoilStore";

export default function () {
  const setState = useSetRecoilState(toastifyStore);

  function handler(
    newState = {
      isShow: true,
      message: "",
    }
  ) {
    setState(newState);
  }
  return handler;
}
