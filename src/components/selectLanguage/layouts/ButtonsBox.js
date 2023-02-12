import { Navigate, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { refresh } from "../../../recoil/recoilStore";
import { flexClass } from "../../../styles/cssClass";
import Buttons from "../../../styles/__ready/Buttons";
import Typography from "../../../styles/__ready/Typography";
import useCachedLanguage from "../../../utility/useCachedLanguage";
export default function ({ startButtonText, endButtonText }) {
  const { set } = useCachedLanguage();
  const navigate = useNavigate();
  const startButton_OnClick = () => {
    set("en");
    navigate(0);
  };
  const endButton_OnClick = () => {
    set("fa");
    navigate(0);
  };
  return (
    <article
      className={
        flexClass.dispalyFlex + "  " + "justify-content-between mb-lg-4 "
      }
    >
      <Buttons.Contained onClick={startButton_OnClick}>
        {/* <Typography.H6> */}
        {startButtonText}
        {/* </Typography.H6> */}
      </Buttons.Contained>

      <Buttons.Outlined onClick={endButton_OnClick}>
        {/* <Typography.H6> */}
        {endButtonText}
        {/* </Typography.H6> */}
      </Buttons.Outlined>
    </article>
  );
}
