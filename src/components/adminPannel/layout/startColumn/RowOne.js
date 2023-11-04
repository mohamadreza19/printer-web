import Typography from "../../../../styles/__ready/Typography";
import TypographyTest from "@mui/material/Typography";
import {
  useContent_Based_Language,
  useDynamicCssClass,
  useLanguage,
} from "../../../../recoil/readStore/";
import useCachedLanguage from "../../../../utility/useCachedLanguage";
import { Admin_Profile_Call } from "../../../../reactQuery/admin/callGetService";
import useFormetDate from "../../../../utility/useFormetDate";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { adminRole } from "../../../../recoil/recoilStore";
import { useGetAdminProfile } from "../../../../recoil/store/admin/profile";
export default function () {
  const cssClass = useDynamicCssClass();
  const content = useContent_Based_Language();
  const language = useLanguage();
  // const res = Admin_Profile_Call();
  const adminProfileObj = useGetAdminProfile();
  const setAdminRole = useSetRecoilState(adminRole);

  function dynamicRole_based_language(role = "") {
    if (language === "fa") {
      if (role === "superAdmin") {
        return "مدیر کل";
      } else {
        return "مدیر";
      }
    }
    if (language === "en") {
      if (role === "superAdmin") {
        return "superAdmin";
      } else {
        return "admin";
      }
    }
    if (language === "tr") {
      if (role === "superAdmin") {
        return "Genel Müdür";
      } else {
        return "yönetici";
      }
    }
  }
  useEffect(() => {
    if (adminProfileObj) {
      setAdminRole(adminProfileObj.role);
    }
  }, [adminProfileObj]);
  if (adminProfileObj)
    return (
      <div className="w-100 p-1 mb-4  bg_info border-r-20 d-flex justify-content-center flex-column align-item-center box_shadow-v1">
        <section>
          <Typography.H7 className="my-2">
            {adminProfileObj.firstName} {adminProfileObj.lastName}
          </Typography.H7>
        </section>
        <section className="dir-ltr d-flex justify-content-center flex-column align-item-center">
          <Typography.H9 className=" disabled_gray2 mb-2 font-400">
            @{adminProfileObj.username}
          </Typography.H9>
          <section className="d-flex justify-content-between mb-2-0-5 align-item-center">
            <Typography.Body2 className={"disabled_gray2 margin-left-1_1rem "}>
              <span>{dynamicRole_based_language(adminProfileObj.role)}</span>
            </Typography.Body2>
          </section>
        </section>
      </div>
    );
}
