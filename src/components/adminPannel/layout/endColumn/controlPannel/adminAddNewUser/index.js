import { useEffect, useState } from "react";
import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../../../../recoil/readStore";
import useAdd_user_controller from "../../../../../../helper/admin_add_user/controlInputs";
import add_user_validate from "../../../../../../helper/admin_add_user/add_user_validate";

import Buttons from "../../../../../../styles/__ready/Buttons";
import Icons from "../../../../../../styles/__ready/Icons";

import Typography from "../../../../../../styles/__ready/Typography";
//
import Header from "./Header";

import moment from "moment";
import "moment/locale/fa";
import "moment/locale/tr";
import { AdminAddUser_Mutation } from "../../../../../../reactQuery/admin/callPostService";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Company_or_Institution from "../../list_Of_User/edit/Company_or_Institution";
import ManagementName from "../../list_Of_User/edit/ManagementName";
import PhoneNumber from "../../list_Of_User/edit/PhoneNumber";
import UserName from "../../list_Of_User/edit/UserName";
import Email from "../../list_Of_User/edit/Email";
import Province from "../../list_Of_User/edit/Province";
import City from "../../list_Of_User/edit/City";
import CompanyAddress from "../../list_Of_User/edit/CompanyAddress";
import Expirition from "../../list_Of_User/edit/Expirition";
import AccessProductBox from "../../list_Of_User/edit/AccessProductBox";
import { validationSchemaForCreate } from "../../list_Of_User/edit/validateSchema";
import { t } from "i18next";
import CompanyZipCode from "../../list_Of_User/edit/CompanyZipCode";
import Password from "../../list_Of_User/edit/Password";
export default function () {
  const cssClass = useDynamicCssClass();
  const content =
    useContent_Based_Language().AdminPannel.end_col.controlPannel.AddNewUser;
  const allContent = useContent_Based_Language();
  const state = useAdd_user_controller(true);
  const validate = add_user_validate();
  const navigate = useNavigate();
  const { isSuccess, data, mutateAsync, error } = AdminAddUser_Mutation();
  const initialValues = {
    username: "",
    password: "",
    email: "",
    companyName: "",
    managerName: "",
    phoneNumber: "",
    companyZipCode: "",
    province: "",
    city: "",
    address: "",
    daysToExpire: 10,
    productAccess: true,
  };
  // const initialValues = {
  //   username: "test1",
  //   password: "test1",
  //   email: "test1@gmail.com",
  //   companyName: "test1",
  //   managerName: "test1",
  //   phoneNumber: "09032446913",
  //   companyZipCode: "1111111111",
  //   province: "تهران",
  //   city: "تهران",
  //   address: "ضصث ضضصث",
  //   daysToExpire: 10,
  //   productAccess: true,
  // };
  const formik = useFormik({
    initialValues: initialValues,
    // enableReinitialize: true,
    onSubmit: (values) => {
      const phoneNumber = "+98" + values.phoneNumber;

      const copy = {
        ...values,
        phoneNumber: phoneNumber,
        daysToExpire: Number(values.daysToExpire),
      };

      mutateAsync(copy);
    },

    validationSchema: validationSchemaForCreate,
  });

  const handleChangeUsername = (event) => {
    formik.setFieldValue("username", event.target.value);
  };
  const handleChangePassword = (event) => {
    formik.setFieldValue("password", event.target.value);
  };

  const handleChangeEmail = (event) => {
    formik.setFieldValue("email", event.target.value);
  };
  const handleChangeCompanyName = (event) => {
    formik.setFieldValue("companyName", event.target.value);
  };
  const handleChangeManagerName = (event) => {
    formik.setFieldValue("managerName", event.target.value);
  };
  const handleChangePhoneNumber = (event) => {
    formik.setFieldValue("phoneNumber", event.target.value);
  };
  const handleChangeCompanyZipCode = (event) => {
    formik.setFieldValue("companyZipCode", event.target.value);
  };
  const handleChangeProvince = (event) => {
    formik.setFieldValue("province", event.target.value);
  };
  const handleChangeCity = (event) => {
    formik.setFieldValue("city", event.target.value);
  };
  const handleChangeAddress = (event) => {
    formik.setFieldValue("address", event.target.value);
  };
  const handleChangeExpiresIn = (event) => {
    formik.setFieldValue("daysToExpire", event.target.value);
  };
  const handleChangeProductAccess = (event) => {
    formik.setFieldValue("productAccess", event.target.value);
  };

  useEffect(() => {
    if (error) {
      if (error.message === "email is already registered") {
        formik.setFieldError("email", t("errMsg.alreadyExist"));
      }
      if (error.message === "username is already taken") {
        formik.setFieldError("username", t("errMsg.alreadyExist"));
      }
    }
    if (isSuccess) {
      // navigate("/admin/list-user");
    }
  }, [error, isSuccess]);

  if (data)
    return (
      <div className="w-100">
        <Header />

        <section className="w-100 d-flex mt-4 justify-content-center flex-column align-item-center  mt-4 ">
          <span className="success-logo ">
            <Icons.Cheked />
          </span>
          <Typography.H5 className="color-primary font-500 mt-3">
            {content.success.NewUserSuccessfullyCreated}
          </Typography.H5>
        </section>

        <section className="w-100 d-flex  justify-content-center mt-3">
          <article className="card-1  ">
            <header className="w-100 d-flex justify-content-center  ">
              <Typography.H5 className={"font-500 mt-3 "}>
                {data.managerName}
              </Typography.H5>
            </header>
            <main className="w-100 d-flex justify-content-center mt-3 ">
              <Typography.H8 className="font-400 ">
                با مدیریت {data.managerName}
              </Typography.H8>
            </main>
            <main className="w-100 d-flex justify-content-center flex-column align-item-center mt-3 card-header-1 ">
              <div className="user-pass-box d-flex">
                <article className="w-100 d-flex  border-bottom">
                  <section className="user-pass-child-box  ">
                    <Icons.UserName size="small" />
                  </section>
                  <section
                    style={{
                      width: "142px",
                      position: "relative",
                      top: "4.5px",
                    }}
                    className={"d-flex justify-content-end px-2   "}
                  >
                    <p
                      className={"font-400 " + data.username}
                      style={{
                        overflowY: "auto",
                      }}
                    >
                      {data.username}
                    </p>
                  </section>
                </article>
                <article className="w-100 d-flex ">
                  <section className="user-pass-child-box  ">
                    <Icons.Password size="small" />
                  </section>
                  <section
                    style={{
                      width: "142px",
                      position: "relative",
                      top: "4.5px",
                    }}
                    className="d-flex justify-content-end px-2 "
                  >
                    <p
                      style={{
                        overflowY: "auto",
                      }}
                      className={"font-400 "}
                    >
                      {formik.values.password}
                    </p>
                  </section>
                </article>
              </div>
            </main>
            <footer className="w-100 d-flex justify-content-center mt-3">
              <Typography.H9_5 className={"font-400 " + cssClass.me_2}>
                <span className={cssClass.me_2}>انقضا اعتبار</span>
                {new Date(data.expiresIn).toLocaleDateString("fa-IR")}
              </Typography.H9_5>
            </footer>
          </article>
        </section>
        <footer className="w-100 d-flex  justify-content-center mt-6 pb-4_2rem">
          <Buttons.Outlined
            onClick={() => navigate("/admin/list-user")}
            className="button_extra-large "
          >
            <Typography.H7>
              {allContent.AdminPannel.end_col.controlPannel.row1.usersList}
            </Typography.H7>
          </Buttons.Outlined>
          <Buttons.Contained_Custom
            className={"button_extra-large bg_primary " + cssClass.ms_2}
          >
            <Typography.H7 className={"font-400 "}>
              {allContent.AdminPannel.end_col.controlPannel.row1.AddNewProduct}
            </Typography.H7>
          </Buttons.Contained_Custom>
        </footer>
      </div>
    );

  const AddUserButton = () => {
    return (
      <div className="w-100 d-flex justify-content-end">
        <Buttons.Contained
          onClick={formik.handleSubmit}
          className="button_large border-r-20 "
        >
          <Typography.H7 className="font-400">
            {content.row6.AddUser}
          </Typography.H7>
        </Buttons.Contained>
      </div>
    );
  };
  return (
    <div
      style={{
        overflow: "auto",
      }}
      className="
w-100 h-100 bg-white"
    >
      <Header />

      <main className="w-100 px-3-58 d-flex justify-content-between flex-wrap pt-4 bg-white">
        <Company_or_Institution
          error={formik.errors.companyName}
          title={t("admin.createUserFeild.companyName")}
          value={formik.values.companyName}
          onChange={handleChangeCompanyName}
          margin={cssClass.ms_3}
        />
        <ManagementName
          error={formik.errors.managerName}
          title={t("admin.createUserFeild.managerName")}
          value={formik.values.managerName}
          onChange={handleChangeManagerName}
          margin={cssClass.ms_3}
        />
        <PhoneNumber
          error={formik.errors.phoneNumber}
          title={t("admin.createUserFeild.phoneNumber")}
          value={formik.values.phoneNumber}
          onChange={handleChangePhoneNumber}
          margin={cssClass.ms_3}
        />
        <UserName
          error={formik.errors.username}
          title={t("admin.createUserFeild.username")}
          value={formik.values.username}
          onChange={handleChangeUsername}
          margin={cssClass.ms_3}
        />
        <Password
          error={formik.errors.password}
          title={t("admin.createUserFeild.password")}
          value={formik.values.password}
          onChange={handleChangePassword}
          margin={cssClass.ms_3}
        />
        <Email
          error={formik.errors.email}
          title={t("admin.createUserFeild.email")}
          value={formik.values.email}
          onChange={handleChangeEmail}
          margin={cssClass.ms_3}
        />
        <CompanyZipCode
          error={formik.errors.companyZipCode}
          title={t("admin.createUserFeild.companyZipCode")}
          value={formik.values.companyZipCode}
          onChange={handleChangeCompanyZipCode}
          margin={cssClass.ms_3}
        />
        <article className="state-city-box d-flex justify-content-between">
          <Province
            title={t("admin.createUserFeild.province")}
            value={formik.values.province}
            onChange={handleChangeProvince}
            margin={cssClass.ms_3}
          />
          <City
            title={t("admin.createUserFeild.city")}
            value={formik.values.city}
            onChange={handleChangeCity}
            margin={cssClass.ms_3}
            province={formik.values.province}
          />
        </article>
        <CompanyAddress
          error={formik.errors.address}
          title={t("admin.createUserFeild.address")}
          value={formik.values.address}
          onChange={handleChangeAddress}
          margin={cssClass.ms_3}
        />
        <Expirition
          error={formik.errors.daysToExpire}
          title={t("admin.createUserFeild.daysToExpire")}
          value={formik.values.daysToExpire}
          onChange={handleChangeExpiresIn}
          margin={cssClass.ms_3}
        />
        <AccessProductBox
          title={t("admin.createUserFeild.productAccess")}
          value={formik.values.productAccess}
          onChange={handleChangeProductAccess}
          margin={cssClass.ms_3}
        />
        <AddUserButton />
      </main>
    </div>
  );
}
