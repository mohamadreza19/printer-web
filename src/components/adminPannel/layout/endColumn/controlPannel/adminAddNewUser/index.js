import { Grid } from "@mui/material";
import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../../../../recoil/readStore";
import Buttons from "../../../../../../styles/__ready/Buttons";
import Icons from "../../../../../../styles/__ready/Icons";
import Textfields, {
  TextFieldFUN_v3,
  TextFieldFUN_v4,
} from "../../../../../../styles/__ready/Textfields";
import Typography from "../../../../../../styles/__ready/Typography";
import Header from "./Header";
export default function () {
  const cssClass = useDynamicCssClass();
  const content =
    useContent_Based_Language().AdminPannel.end_col.controlPannel.AddNewUser;
  const allContent = useContent_Based_Language();
  const [accessProduct, setAccessProduct] = useState(false);
  const response = false;
  function handleToggleAccessProduct() {
    setAccessProduct(!accessProduct);
  }
  const AccessProductBox = () => {
    const changedJustify = accessProduct
      ? "justify-content-start"
      : "justify-content-end";
    const changedBackGround = accessProduct ? "#F36523" : "rgb(238 170 139)";
    return (
      <div
        style={{
          width: "62px",
          height: "36px",
          backgroundColor: "#FBD1BD",
          borderRadius: "18px",
        }}
        className={"mt-1 d-flex align-item-center  dir-rtl " + changedJustify}
      >
        <span
          onClick={handleToggleAccessProduct}
          style={{
            width: "29.95px",
            height: "29.95px",
            backgroundColor: changedBackGround,
            borderRadius: "18px",
          }}
          className="transition-all-v1  "
        ></span>
      </div>
    );
  };
  const fakeData = {
    header: " شرکت تجهیز صنعت پاسارگاد",
    title: " sبا مدیریت محسن رشیدی",
    username: "usertest13443 ",
    password: "@#dww5543@!",
  };
  const fakeDataClass = {
    header: fakeData.header.length > 25 ? "x-scroll" : " ",
    username: fakeData.username.length > 17 ? "x-scroll" : " ",
    password: fakeData.password.length > 17 ? "x-scroll" : " ",
  };

  if (response)
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
              <Typography.H5
                className={"font-500 mt-3 " + fakeDataClass.header}
              >
                {fakeData.header}
              </Typography.H5>
            </header>
            <main className="w-100 d-flex justify-content-center mt-3 ">
              <Typography.H8 className="font-400 ">
                {fakeData.title}
              </Typography.H8>
            </main>
            <main className="w-100 d-flex justify-content-center flex-column align-item-center mt-4 card-header-1 ">
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
                    <p className={"font-400 " + fakeDataClass.username}>
                      {fakeData.username}
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
                    <p className={"font-400 " + fakeDataClass.password}>
                      {fakeData.password}
                    </p>
                  </section>
                </article>
              </div>
            </main>
            <footer className="w-100 d-flex justify-content-center mt-3">
              <Typography.H9_5 className={"font-300 " + cssClass.me_2}>
                انقضا اعتبار(سه ماهه)
              </Typography.H9_5>
              <Typography.H9_5 className="font-300">۱٤۰۱/۰٥/۲٥</Typography.H9_5>
            </footer>
          </article>
        </section>
        <footer className="w-100 d-flex  justify-content-center mt-6 pb-4_2rem">
          <Buttons.Outlined className="button_extra-large ">
            <Typography.H8>
              {allContent.AdminPannel.end_col.controlPannel.row1.usersList}
            </Typography.H8>
          </Buttons.Outlined>
          <Buttons.Contained_Custom
            className={"button_extra-large bg_primary " + cssClass.ms_2}
          >
            <Typography.H8 className={"font-400 "}>
              {allContent.AdminPannel.end_col.controlPannel.row1.AddNewProduct}
            </Typography.H8>
          </Buttons.Contained_Custom>
        </footer>
      </div>
    );
  return (
    <div className="w-100 ">
      <Header />
      <Grid
        container
        className="mt-2 px-4 scrollable2"
        columnSpacing={3}
        rowSpacing={2}
      >
        <Grid item lg={6} className="d-flex justify-content-end">
          <div className="w-90">
            <Typography.H8 className={"font-400 mb-2 " + cssClass.ms_3}>
              {content.row1.Name_of_the_company_or_institution}
            </Typography.H8>
            <TextFieldFUN_v3 />
          </div>
        </Grid>
        <Grid item lg={6} className="d-flex justify-content-start">
          <div className="w-90">
            <Typography.H8 className={"font-400 mb-2 " + cssClass.ms_3}>
              {content.row1.ManagementName}
            </Typography.H8>
            <TextFieldFUN_v3 />
          </div>
        </Grid>
        <Grid item lg={6} className="d-flex justify-content-end">
          <div className="w-90">
            <Typography.H8 className={"font-400 mb-2 " + cssClass.ms_3}>
              {content.row2.phoneNumber}
            </Typography.H8>
            <TextFieldFUN_v3 />
          </div>
        </Grid>
        <Grid item lg={6} className="d-flex justify-content-start">
          <div className="w-90">
            <Typography.H8 className={"font-400 mb-2 " + cssClass.ms_3}>
              {content.row2.userName}
            </Typography.H8>
            <TextFieldFUN_v3 />
          </div>
        </Grid>
        <Grid item lg={6} className="d-flex justify-content-end">
          <div className="w-90">
            <Typography.H8 className={"font-400 mb-2 " + cssClass.ms_3}>
              {content.row3.Email}
            </Typography.H8>
            <TextFieldFUN_v3 />
          </div>
        </Grid>
        <Grid item lg={6} className="d-flex justify-content-start">
          <div className="w-90">
            <Typography.H8 className={"font-400 mb-2 " + cssClass.ms_3}>
              {content.row3.CompanyZipCode}
            </Typography.H8>
            <TextFieldFUN_v3 />
          </div>
        </Grid>
        {/* // */}
        <Grid item lg={4}>
          <div className="d-flex">
            <article className={cssClass.me_3 + " language-card-select"}>
              <span>
                <Typography.H8 className={"font-400 mb-2 " + cssClass.ms_3}>
                  {content.row4.State}
                </Typography.H8>
              </span>
              <select name="cars" id="cars" className="select-rtl">
                <option value="تهران">
                  <Typography.H8>تهران</Typography.H8>
                </option>
                <option value="کرج">
                  <Typography.H9>کرج</Typography.H9>
                </option>
              </select>
            </article>
            <article>
              <span>
                <Typography.H8 className={"font-400 mb-2 " + cssClass.ms_3}>
                  {content.row4.City}
                </Typography.H8>
              </span>
              <select name="cars" id="cars" className="select-rtl">
                <option value="تهران">
                  <Typography.H8>تهران</Typography.H8>
                </option>
                <option value="کرج">
                  <Typography.H9>کرج</Typography.H9>
                </option>
              </select>
            </article>
          </div>
          <article className={cssClass.me_3 + " mt-5 "}>
            <select name="cars" id="cars" className="select-rtl">
              <option value="یک ماهه">
                <Typography.H8>یک ماهه</Typography.H8>
              </option>
              <option value="دو ماهه">
                <Typography.H9>دو ماهه</Typography.H9>
              </option>
            </select>
          </article>
        </Grid>
        <Grid item lg={8} className="d-flex justify-content-start">
          <div className={"w-85  " + cssClass.ms_6}>
            <Typography.H8 className={"font-400 mb-2 " + cssClass.ms_3}>
              {content.row4.CompanyAddress}
            </Typography.H8>
            <TextFieldFUN_v4 />
          </div>
        </Grid>
        <Grid item lg={6} className="d-flex align-item-center">
          <AccessProductBox />
          <span>
            <Typography.H8 className={"font-400  " + cssClass.ms_3}>
              {content.row5.AccessToProducts}
            </Typography.H8>
          </span>
        </Grid>
        <Grid item lg={6} className="d-flex justify-content-end ">
          <div
            style={{
              position: "relative",
              top: "0.8rem",
            }}
          >
            <Buttons.Contained className="button_large border-r-20 ">
              <Typography.H7 className="font-400">
                {content.row6.AddUser}
              </Typography.H7>
            </Buttons.Contained>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
