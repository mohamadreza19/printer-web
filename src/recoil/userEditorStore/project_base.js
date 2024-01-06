import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";

export const project_base_state = atom({
  key: "project_base",
  default: "CUSTOM", // CUSTOM PRODUCT
});

export const useProject_baseValue = () => {
  const poject_base = useRecoilValue(project_base_state);

  return poject_base;
};
export const useSetProject_baseState = () => {
  const setProject_base = useSetRecoilState(project_base_state);

  return setProject_base;
};
