import add_user_validation from "../../validation/admin/add_user/add_user_validation";
import useAdd_user_controlInput from "./controlInputs";

export default function () {
  const {
    setUsername = () => {},
    setCompanyName = () => {},
    setManagerName = () => {},
    setPhoneNumber = () => {},
    setCompanyZipCode = () => {},
    setProvince = () => {},
    setEmail = () => {},
    setCity = () => {},
    setAddress = () => {},
    setDaysToExpire = () => {},
  } = useAdd_user_controlInput(false, true);
  const state = useAdd_user_controlInput(true, false);
  async function validate_add_user() {
    try {
      await add_user_validation(state);
    } catch (error) {
      error.inner.forEach((err) => {
        const path = err.path;

        if (path === "phoneNumber") {
          return setPhoneNumber((draft) => ({ ...draft, errMsg: err.message }));
        }
        if (path === "username") {
          return setUsername((draft) => ({ ...draft, errMsg: err.message }));
        }
        if (path === "companyName") {
          return setCompanyName((draft) => ({ ...draft, errMsg: err.message }));
        }
        if (path === "managerName") {
          return setManagerName((draft) => ({ ...draft, errMsg: err.message }));
        }
        if (path === "companyZipCode") {
          return setCompanyZipCode((draft) => ({
            ...draft,
            errMsg: err.message,
          }));
        }
        if (path === "address") {
          return setAddress((draft) => ({ ...draft, errMsg: err.message }));
        }
        if (path === "email") {
          return setEmail((draft) => ({
            ...draft,
            errMsg: err.message,
          }));
        }
        if (path === "daysToExpire") {
          return setExpiresIn((draft) => ({
            ...draft,
            errMsg: err.message,
          }));
        }
      });
      throw "validate was handeled";
    }
  }

  return validate_add_user;
}
