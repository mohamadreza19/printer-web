import Typography from "../../../../styles/__ready/Typography";
import TypographyTest from "@mui/material/Typography";
import {
  useContent_Based_Language,
  useDynamicCssClass,
  useLanguage,
} from "../../../../recoil/readStore/";
import useCachedLanguage from "../../../../utility/useCachedLanguage";
import { User_Profile_Call } from "../../../../reactQuery/user/callGetService";
import formatData from "../../../../utility/useFormetDate";
import { memo } from "react";
import { useGetUserProfile } from "../../../../recoil/store/user/profile_store";
// const user_profile_data = {
//   companyName: "",
//   email: "",
//   expiresIn: "",
// };
const RowOne = memo(function () {
  const cssClass = useDynamicCssClass();
  const content = useContent_Based_Language();
  const { value } = useCachedLanguage();
  const user_profile = useGetUserProfile();
  const language = useLanguage();
  if (user_profile)
    return (
      <div className="w-100 p-1 bg_info border-r-20 d-flex justify-content-center flex-column align-item-center box_shadow-v1">
        <section>
          <Typography.H7 className="my-2">
            {user_profile.companyName}
          </Typography.H7>
        </section>
        <section className=" d-flex justify-content-center flex-column align-item-center">
          <header>
            <Typography.H9 className=" disabled_gray2 mb-2 font-400">
              {user_profile.email}
            </Typography.H9>
          </header>
          <footer className="w-100 d-flex justify-content-start  align-item-center">
            <Typography.Body2 className={"disabled_gray2  "}>
              <span>{content.userPannel.start_col.row1.epirationOfCredit}</span>
            </Typography.Body2>
            <Typography.Body2
              isFa={value == "fa"}
              className={"disabled_gray2 " + cssClass.ms_2}
            >
              {formatData(user_profile.expiresIn, language, false)}
            </Typography.Body2>
          </footer>
        </section>
      </div>
    );
});
export default RowOne;
