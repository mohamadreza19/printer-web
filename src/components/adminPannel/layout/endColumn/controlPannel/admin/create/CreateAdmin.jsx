import { useFormik } from "formik";
import { TextFieldFUN_v3 } from "../../../../../../../styles/__ready/Textfields";
import Header from "../Header";
import Input from "../Input";
import { t } from "i18next";
import Buttons from "../../../../../../../styles/__ready/Buttons";
import Typography from "../../../../../../../styles/__ready/Typography";
import validateAdmin from "../validateAdmin";
import { AdminAddAdmin_Mutation } from "../../../../../../../reactQuery/admin/callPostService";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateAdmin = () => {
  const { mutate, error, isSuccess } = AdminAddAdmin_Mutation();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      Role: "admin",
      firstName: "",
      lastName: "",
    },
    onSubmit: (values) => {
      mutate(values);
    },

    validationSchema: validateAdmin,
  });
  useEffect(() => {
    if (error) {
      if (error.message.includes("username is already taken")) {
        setFormikError({
          username: `${formik.values.username} ${t("errMsg.alreadyExist")}`,
        });
      }
    }
    if (isSuccess) {
      navigate("/admin/list-manager");
    }
  }, [error, isSuccess]);

  const handleChangeUsername = (event) => {
    formik.setFieldValue("username", event.target.value);
  };
  const handleChangePassword = (event) => {
    formik.setFieldValue("password", event.target.value);
  };
  const handleChangeFirstName = (event) => {
    formik.setFieldValue("firstName", event.target.value);
  };
  const handleChangeLastName = (event) => {
    formik.setFieldValue("lastName", event.target.value);
  };
  function setFormikError(error = { key: "" }) {
    formik.setErrors({ ...formik.errors, ...error });
  }
  return (
    <div className="w-100 h_100vh">
      <Header title={t("admin.addNewAdmin")} />

      <div className="d-flex flex-wrap gap-3 py-3 px-3">
        <Input
          title={t("admin.username")}
          onChange={handleChangeUsername}
          value={formik.values.username}
          error={formik.errors.username}
        />
        <Input
          title={t("admin.firstName")}
          onChange={handleChangeFirstName}
          value={formik.values.firstName}
          error={formik.errors.firstName}
        />
        <Input
          title={t("admin.lastName")}
          onChange={handleChangeLastName}
          value={formik.values.lastName}
          error={formik.errors.lastName}
        />
        <Input
          title={t("admin.password")}
          onChange={handleChangePassword}
          value={formik.values.password}
          error={formik.errors.password}
        />

        <AddUserButton
          onlick={formik.handleSubmit}
          value={t("admin.addNewAdmin")}
        />
      </div>
    </div>
  );
};

export default CreateAdmin;
const AddUserButton = ({ value, onlick }) => {
  return (
    <div className="w-100 d-flex justify-content-end">
      <Buttons.Contained onClick={onlick} className="button_large border-r-20 ">
        <Typography.H7 className="font-400">{value}</Typography.H7>
      </Buttons.Contained>
    </div>
  );
};
