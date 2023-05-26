import { atom } from "recoil";

export default atom({
  key: "timeLimitStore",
  default: {
    ui: {
      from: "",
      to: "",
    },
    server: {
      from: "",
      to: "",
    },
  },
});
