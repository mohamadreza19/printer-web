import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const label_atom = atom({
  key: "label",
  default: {
    width: "",
    height: "",
  },
});

export const useGetLabel = () => {
  const userProfile = useRecoilValue(label_atom);

  return userProfile;
};
export const useSetLabel = () => {
  const setUser = useSetRecoilState(label_atom);

  return setUser;
};
