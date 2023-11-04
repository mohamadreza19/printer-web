import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const profile_atom = atom({
  key: "user_profile",
  default: {
    username: "",
    email: "",
  },
});

export const useGetUserProfile = () => {
  const userProfile = useRecoilValue(profile_atom);

  return userProfile;
};
export const useSetUserProfile = () => {
  const setUser = useSetRecoilState(profile_atom);

  return setUser;
};

export default profile_atom;
