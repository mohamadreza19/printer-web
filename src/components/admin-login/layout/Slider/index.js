import { Admin_UserSlider } from "../../../../reactQuery/common/callGetService";
import FooterSlider from "./FooterSlider";
import RootImage from "./RootImage";

export default function () {
  const { isSuccess, data } = Admin_UserSlider();

  if (isSuccess) {
    return (
      <div
        style={{
          display: "flex",
          paddingTop: "48px",
          flexDirection: "column",
          rowGap: "50px",
        }}
        className="w-100 h-100 "
      >
        {data.length > 0 ? <RootImage id={data[0].id} /> : null}
        {data.length > 0 ? <FooterSlider data={data} /> : null}
      </div>
    );
  }
}
