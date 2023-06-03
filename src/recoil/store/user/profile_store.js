import { atom } from "recoil";

export default atom({
  key: "user_profile",
  default: {
    username: "",
    email: "",
  },
});
