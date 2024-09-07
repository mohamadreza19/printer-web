import { t } from "i18next";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, () => t("errMsg.minStr5"))
    .required(() => t("errMsg.required")),

  email: Yup.string()
    .email(() => t("errMsg.email"))
    .required(() => t("errMsg.required")),

  companyName: Yup.string()
    .min(5, () => t("errMsg.minStr5"))
    .required(() => t("errMsg.required")),

  managerName: Yup.string()
    .min(5, () => t("errMsg.minStr5"))
    .required(() => t("errMsg.required")),

  phoneNumber: Yup.number()
    .test(
      "isValidPhoneNumber", // Custom test name
      () => t("errMsg.phoneNumber"), // Error message from translation
      (value) => /^090\d{8}$/.test(value) // Custom regex check
    )
    .required(() => t("errMsg.required")),

  companyZipCode: Yup.string()
    .length(10, () => t("errMsg.length10"))
    .required(() => t("errMsg.required")),

  address: Yup.string()
    .min(5, () => t("errMsg.minStr5"))
    .required(() => t("errMsg.required")),

  expiresIn: Yup.number()
    .positive(() => t("errMsg.positive"))
    .required(() => t("errMsg.required")),
});

export default validationSchema;
