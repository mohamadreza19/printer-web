import { t } from "i18next";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, () => t("errMsg.minStr4"))
    .required(() => t("errMsg.required")),

  email: Yup.string()
    .email(() => t("errMsg.email"))
    .required(() => t("errMsg.required")),

  companyName: Yup.string()
    .min(5, () => t("errMsg.minStr4"))
    .required(() => t("errMsg.required")),

  managerName: Yup.string()
    .min(5, () => t("errMsg.minStr4"))
    .required(() => t("errMsg.required")),

  phoneNumber: Yup.string()

    .test(
      "isValidPhoneNumber", // Custom test name
      () => t("errMsg.phoneNumber"), // Error message from translation
      (value) => /^09\d{9}$/.test(value) // Custom regex check
    )
    .required(() => t("errMsg.required")),

  companyZipCode: Yup.string()
    .length(10, () => t("errMsg.length10"))
    .required(() => t("errMsg.required")),

  address: Yup.string()
    .min(5, () => t("errMsg.minStr4"))
    .required(() => t("errMsg.required")),

  daysToExpire: Yup.number()
    .integer(() => t("errMsg.integer"))
    .required(() => t("errMsg.required")),
});

export const validationSchemaForCreate = validationSchema.concat(
  Yup.object().shape({
    // New or modified fields can be added here
    password: Yup.string()
      .min(4, () => t("errMsg.minStr4"))
      .required(() => t("errMsg.required")),
  })
);
export const validationSchemaForEdit = validationSchema.concat(
  Yup.object().shape({
    // New or modified fields can be added here
    password: Yup.string().min(4, () => t("errMsg.minStr4")),
  })
);
