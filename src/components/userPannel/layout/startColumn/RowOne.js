import Typography from "../../../../styles/__ready/Typography";
import TypographyTest from "@mui/material/Typography";
import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../../recoil/readStore/";
export default function () {
  const cssClass = useDynamicCssClass();
  const content = useContent_Based_Language();
  return (
    <div className="w-100 p-1 bg_info border-r-20 d-flex justify-content-center flex-column align-item-center box_shadow-v1">
      <section>
        <Typography.H7 className="my-2">
          {"شرکت تجهیز صنعت پاسارگاد"}
        </Typography.H7>
      </section>
      <section className="dir-ltr d-flex justify-content-center flex-column align-item-center">
        <Typography.H9 className=" disabled_gray2 mb-2 font-400">
          {"@taghizsandatpsgad"}
        </Typography.H9>
        <section className="d-flex justify-content-between mb-2-0-5 align-item-center">
          <Typography.Body2 className={"disabled_gray2 "}>
            {/* <span>{"۱٤۰۲/۰٥/۰۳"}</span> */}
            <span>{"2023/02/04"}</span>
          </Typography.Body2>
          <Typography.Body2 className={"disabled_gray2 margin-left-1_1rem "}>
            <span>{content.userPannel.start_col.row1.epirationOfCredit}</span>
          </Typography.Body2>
        </section>
      </section>
    </div>
  );
}
