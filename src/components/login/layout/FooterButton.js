import { Grid } from "@mui/material";
import { useContent_Based_Language } from "../../../recoil/readStore";
import Buttons from "../../../styles/__ready/Buttons";
import Typography from "../../../styles/__ready/Typography";

export default function ({ onClick }) {
  const { login } = useContent_Based_Language();

  return (
    <div
      onClick={onClick}
      className="w-100 mt-8 d-flex justify-content-center align-item-center"
    >
      <Buttons.Contained className=" button_large " form="login-box">
        <Typography.H6 className=" font-200 ">
          {login.enterButton}
        </Typography.H6>
      </Buttons.Contained>
    </div>
  );
}
