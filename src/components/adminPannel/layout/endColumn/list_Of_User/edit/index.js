import { useState } from "react";
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
import Company_or_Institution from "./Company_or_Institution";
import ManagementName from "./ManagementName";
import PhoneNumber from "./PhoneNumber";
import UserName from "./UserName";
import Email from "./Email";
import CompanyZipCode from "./CompanyZipCode";
import Province from "./Province";
import City from "./City";
import CompanyAddress from "./CompanyAddress";
import Expirition from "./Expirition";
import AccessProductBox from "./AccessProductBox";

import moment from "moment";
import "moment/locale/fa";
import "moment/locale/tr";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { AdminUser_FindOne } from "../../../../../../reactQuery/admin/callGetService";
import { AdminEditUser_Mutation } from "../../../../../../reactQuery/admin/callPutService";
import { useFormik } from "formik";
import { t } from "i18next";
import validationSchema from "./validateSchema";
import { setAdmins_and_users_key } from "../../../../../../reactQuery/querykey/admin_key";

const initialValues = {
  username: "",
  email: "",
  companyName: "",
  managerName: "",
  phoneNumber: "",
  companyZipCode: "",
  province: "",
  city: "",
  address: "",
  daysToExpire: 1,
  productAccess: true,
};
export default function () {
  const cssClass = useDynamicCssClass();
  const content =
    useContent_Based_Language().AdminPannel.end_col.controlPannel.AddNewUser;

  const allContent = useContent_Based_Language();
  const navigate = useNavigate();
  const { id } = useParams();

  const findedUser = AdminUser_FindOne("admin", id);
  const { isSuccess, data, mutateAsync, error } = AdminEditUser_Mutation();

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      const phoneNumber = "+98" + values.phoneNumber;

      const copy = {
        ...values,
        phoneNumber: phoneNumber,
        daysToExpire: Number(values.daysToExpire),
      };

      const data = {
        id,
        body: copy,
      };

      mutateAsync(data);
      navigate("/admin/list-user");
      formik.resetForm();
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
  });

  const handleChangeUsername = (event) => {
    formik.setFieldValue("username", event.target.value);
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

  function format() {
    const d = new Date("2023-06-13T21:15:25.829Z");
    let mypersiandate = d.toLocaleDateString("fa-IR");
    const momentDate = moment("2023-05-15T20:12:57.454Z").locale("fa");
    const diff = moment("2023-06-13T21:15:25.829Z").diff(
      moment(),
      "millisecond"
    );

    console.log(mypersiandate);
  }

  const EditUserButton = () => {
    return (
      <div className="w-100 d-flex justify-content-end">
        <Buttons.Contained
          onClick={formik.handleSubmit}
          className="button_large border-r-20 "
        >
          <Typography.H7 className="font-400">
            {content.row6.EditUser}
          </Typography.H7>
        </Buttons.Contained>
      </div>
    );
  };

  useEffect(() => {
    if (findedUser.data) {
      formik.setFieldValue("username", findedUser.data.username);
      formik.setFieldValue("email", findedUser.data.email);
      formik.setFieldValue("companyName", findedUser.data.companyName);
      formik.setFieldValue("managerName", findedUser.data.managerName);
      formik.setFieldValue(
        "phoneNumber",
        findedUser.data.phoneNumber.replace(/^\+98/, "")
      );
      formik.setFieldValue("companyZipCode", findedUser.data.companyZipCode);
      formik.setFieldValue("province", findedUser.data.province);
      formik.setFieldValue("city", findedUser.data.city);
      formik.setFieldValue("address", findedUser.data.address);

      // var currenDate = moment(new Date());
      // var endDate = moment(findedUser.data.daysToExpire);
      // console.log(findedUser.data.daysToExpire);
      // var result = endDate.diff(currenDate, "days");
      formik.setFieldValue("daysToExpire", findedUser.data.daysToExpire);
      formik.setFieldValue("productAccess", findedUser.data.productAccess);
    }

    return () => {
      // console.log(findedUser.data);
      setAdmins_and_users_key(Math.random() * 122);
    };
  }, [findedUser.isSuccess, findedUser.data]);

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
      navigate("/admin/list-user");
    }
  }, [error, isSuccess]);
  return (
    <>
      {data ? (
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
                </div>
              </main>
              <footer className="w-100 d-flex justify-content-center mt-3">
                <Typography.H9_5 className={"font-400 " + cssClass.me_2}>
                  <span className={cssClass.me_2}>
                    انقضا اعتبار({formik.values.expiresIn})
                  </span>
                  {new Date(data.expiresIn).toLocaleDateString("fa-IR")}
                </Typography.H9_5>
              </footer>
            </article>
          </section>
          <footer className="w-100 d-flex  justify-content-center mt-6 pb-4_2rem">
            <Link to={"/admin/list-user"}>
              <Buttons.Outlined className="button_extra-large ">
                <Typography.H7>
                  {allContent.AdminPannel.end_col.controlPannel.row1.usersList}
                </Typography.H7>
              </Buttons.Outlined>
            </Link>
            {/* <Buttons.Contained_Custom
          className={"button_extra-large bg_primary " + cssClass.ms_2}
        >
          <Typography.H7 className={"font-400 "}>
            {allContent.AdminPannel.end_col.controlPannel.row1.AddNewProduct}
          </Typography.H7>
        </Buttons.Contained_Custom> */}
          </footer>
        </div>
      ) : (
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
              error={formik.errors.usernames}
              title={t("admin.createUserFeild.username")}
              value={formik.values.username}
              onChange={handleChangeUsername}
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
            <EditUserButton />
          </main>
        </div>
      )}
    </>
  );
}
