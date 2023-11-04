import { atom, useRecoilValue, useSetRecoilState } from "recoil";
const adminProfile_atom = atom({
  key: "adminProfile",
  default: {
    // createdAt: "",
    // deleteDate: "",
    // firstName: "",
    // id: "",
    // lastName: "",
    // profilePictures: [],
    // role: "superAdmin", //superAdmin
    // updatedAt: "",
    // username: "",
  },
});

///
export const useGetAdminProfile = () => {
  const adminProfile = useRecoilValue(adminProfile_atom);

  return adminProfile;
};
export const useSetAdminProfile = () => {
  const setAdmin = useSetRecoilState(adminProfile_atom);

  return setAdmin;
};
