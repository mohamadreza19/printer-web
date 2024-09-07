import { t } from "i18next";
import * as Yup from "yup";
export default Yup.object().shape({
  username: Yup.string()
    .min(4, () => t("errMsg.minStr4"))
    .max(15, () => t("errMsg.maxStr15"))
    .required(() => t("errMsg.required")),
  firstName: Yup.string()
    .min(4, () => t("errMsg.minStr4"))
    .max(15, () => t("errMsg.maxStr15"))
    .required(() => t("errMsg.required")),
  lastName: Yup.string()
    .min(4, () => t("errMsg.minStr4"))
    .max(15, () => t("errMsg.maxStr15"))
    .required(() => t("errMsg.required")),
  password: Yup.string()
    .min(8, () => t("errMsg.minStr8"))
    .required(() => t("errMsg.required")),
});
