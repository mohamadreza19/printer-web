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
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { AdminUser_FindOne } from "../../../../../../reactQuery/admin/callGetService";
import { AdminEditUser_Mutation } from "../../../../../../reactQuery/admin/callPutService";
export default function () {
  const cssClass = useDynamicCssClass();
  const content =
    useContent_Based_Language().AdminPannel.end_col.controlPannel.AddNewUser;

  const allContent = useContent_Based_Language();

  const { id } = useParams();

  const state = useAdd_user_controller(true);
  const meta = useAdd_user_controller();

  const validate = add_user_validate();
  const findedUser = AdminUser_FindOne("admin", id);
  const { isSuccess, data, mutateAsync } = AdminEditUser_Mutation();

  async function EditUser() {
    try {
      await validate();
      console.log(state);
      const option = {
        id: id,
        body: state,
      };
      await mutateAsync(option);

      console.log("hhh");
    } catch (error) {
      console.log(error);
    }
  }

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
  format();

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
                      className={"font-400 " + data.password}
                    >
                      {data.password}
                    </p>
                  </section>
                </article>
              </div>
            </main>
            <footer className="w-100 d-flex justify-content-center mt-3">
              <Typography.H9_5 className={"font-400 " + cssClass.me_2}>
                <span className={cssClass.me_2}>
                  انقضا اعتبار({state.daysToExpire})
                </span>
                {new Date(data.expiresIn).toLocaleDateString("fa-IR")}
              </Typography.H9_5>
            </footer>
          </article>
        </section>
        <footer className="w-100 d-flex  justify-content-center mt-6 pb-4_2rem">
          <Buttons.Outlined className="button_extra-large ">
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

  const EditUserButton = () => {
    return (
      <div className="w-100 d-flex justify-content-end">
        <Buttons.Contained
          onClick={EditUser}
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
      let e = {
        target: {
          value: "",
        },
      };

      e.target.value = findedUser.data.companyName;
      meta.handeler.setCompanyNameHandeler(e);

      e.target.value = findedUser.data.managerName;
      meta.handeler.setManagerNameHandeler(e);

      e.target.value = String(findedUser.data.phoneNumber).replace(/^\+98/, "");

      meta.handeler.setPhoneNumberHandeler(e);

      e.target.value = findedUser.data.username;
      meta.handeler.setUsernameHandeler(e);

      e.target.value = findedUser.data.email;
      meta.handeler.setEmailHandeler(e);

      e.target.value = findedUser.data.companyZipCode;
      meta.handeler.setCompanyZipCodeHandeler(e);

      e.target.value = findedUser.data.address;
      meta.handeler.setAddressHandeler(e);

      e.target.value = findedUser.data.address;
      meta.handeler.setAddressHandeler(e);

      meta.handeler.setProductAccessHandeler(findedUser.data.productAccess);

      meta.handeler.setProvinceHandeler(findedUser.data.province);

      meta.handeler.setCityHandeler(findedUser.data.city);

      var currenDate = moment(new Date());
      var endDate = moment(findedUser.data.expiresIn);
      var result = endDate.diff(currenDate, "days");

      meta.handeler.setDaysToExpireHandeler(result);
    }
    return () => {
      meta.clearAll();
    };
  }, [findedUser.isSuccess]);
  // useEffect(() => {
  //   return () => {
  //     meta.clearAll();
  //   };
  // }, []);
  if (findedUser.data)
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
            Name_of_the_company_or_institution={
              content.row1.Name_of_the_company_or_institution
            }
            meta={meta}
            margin={cssClass.ms_3}
          />
          <ManagementName
            ManagementName={content.row1.ManagementName}
            margin={cssClass.ms_3}
            meta={meta}
          />
          <PhoneNumber
            margin={cssClass.ms_3}
            phoneNumber={content.row2.phoneNumber}
            meta={meta}
          />
          <UserName
            userName={content.row2.userName}
            margin={cssClass.ms_3}
            meta={meta}
          />
          <Email
            Email={content.row3.Email}
            margin={cssClass.ms_3}
            meta={meta}
          />
          <CompanyZipCode
            margin={cssClass.ms_3}
            CompanyZipCode={content.row3.CompanyZipCode}
            meta={meta}
          />
          <article className="state-city-box d-flex justify-content-between">
            <Province
              State={content.row4.State}
              margin={cssClass.ms_3}
              meta={meta}
            />
            <City City={content.row4.City} margin={cssClass.ms_3} meta={meta} />
          </article>
          <CompanyAddress
            CompanyAddress={content.row4.CompanyAddress}
            margin={cssClass.ms_3}
            meta={meta}
          />
          <Expirition credit={content.row4.credit} margin={cssClass.ms_3} />
          <AccessProductBox
            AccessToProducts={content.row5.AccessToProducts}
            accessProduct={state.productAccess}
            margin={cssClass.ms_3}
            meta={meta}
          />
          <EditUserButton />
        </main>
      </div>
    );
}
