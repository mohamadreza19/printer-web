import { atom } from "recoil";

export default atom({
  key: "history",
  default: {
    past: [],
    present: [],
    future: [],
  },
});
