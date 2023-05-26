import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const params = atom({
  key: "admin-product-label",
  default: {
    page: 1,
    limit: 10,
    productLableFilter: "All",
    search: "",
  },
});

export function useRead_admin_label_param() {
  return useRecoilValue(params);
}
export function useReducer_admin_label_param() {
  return useSetRecoilState(params);
}
