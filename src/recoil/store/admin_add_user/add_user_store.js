import { atom } from "recoil";

export const username_store = atom({
  key: "user-name",
  default: {
    value: "",
    errMsg: "",
  },
});
export const companyName_store = atom({
  key: "company-name",
  default: {
    value: "",
    errMsg: "",
  },
});
export const managerName_store = atom({
  key: "manager-name",
  default: {
    value: "",
    errMsg: "",
  },
});
export const phoneNumber_store = atom({
  key: "phone-number",
  default: {
    value: "",
    errMsg: "",
  },
});
export const companyZipCode_store = atom({
  key: "company-zipCode",
  default: {
    value: "",
    errMsg: "",
  },
});
export const email_store = atom({
  key: "email",
  default: {
    value: "",
    errMsg: "",
  },
});
export const province_store = atom({
  key: "province",
  default: {
    value: "",
    errMsg: "",
    letContinue: false,
  },
});
export const city_store = atom({
  key: "city",
  default: {
    value: "",
    errMsg: "",
  },
});
export const address_store = atom({
  key: "address",
  default: {
    value: "",
    errMsg: "",
  },
});
export const daysToExpire_store = atom({
  key: "daysToExpire",
  default: {
    label: "",
    value: "",
    errMsg: "",
  },
});
export const productAccess_store = atom({
  key: "productAccess",
  default: false,
});
