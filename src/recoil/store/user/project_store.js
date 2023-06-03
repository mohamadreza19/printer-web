import { atom } from "recoil";

export default atom({
  key: "user-project",
  default: {
    projectName: "",
    rails: [],
  },
});
export const is_project_sucess_edit_store = atom({
  key: "is_project_sucess_edit",
  default: false,
});
