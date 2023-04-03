import { useState } from "react";
import { atom, useRecoilState } from "recoil";
import { useImmer } from "use-immer";
import Icons from "../../../../../styles/__ready/Icons";
import Textfields, {
  TextFieldFUN_v5,
} from "../../../../../styles/__ready/Textfields";
import Typography from "../../../../../styles/__ready/Typography";
import Buttons from "../../../../../styles/__ready/Buttons";
import { Grid } from "@mui/material";

export default function ({
  ms_2 = " ",
  pe_1 = " ",
  content = {
    inputLabelOne: " ",
    inputLabelTwo: " ",
    rightToLeft: " ",
    leftToRight: " ",
    continueButton: " ",
  },
  isFa = false,
}) {
  const [projectNameInput, setProjectNameInput] = useState("");
  const [creatorNameInput, setCreatorNameInput] = useState("");
  const [isRightToleft, setIsRightToleft] = useState(true);

  const handleToggleiSRightToleft = () => {
    setIsRightToleft(!isRightToleft);
  };
  // const [inputTwo, setInputTwo] = useState("");
  const handleChange = (event) => {
    const value = event.target.value;

    setProjectNameInput(value);
  };
  const handleChangeCreatorNameInput = (event) => {
    const value = event.target.value;

    setCreatorNameInput(value);
  };

  return (
    <div className="w-100 mt-7 px-5">
      <header className="px-3">
        <Typography.H8 className="font-500">{content.header}</Typography.H8>
      </header>
      <article className="mt-4 w-60">
        <Typography.H8 className={"mb-2 font-400 " + ms_2}>
          {content.inputLabelOne}
        </Typography.H8>
        <section className="w-100">
          <TextFieldFUN_v5
            ImputclassName={ms_2}
            value={projectNameInput}
            onChange={handleChange}
          />
        </section>
      </article>

      <article className="mt-4 w-60">
        <Typography.H8 className={"mb-2 font-400 " + ms_2}>
          {content.inputLabelTwo}
        </Typography.H8>
        <section className="w-100">
          <TextFieldFUN_v5
            ImputclassName={ms_2}
            value={creatorNameInput}
            onChange={handleChangeCreatorNameInput}
          />
        </section>
      </article>

      <article className="d-flex align-item-center mt-4">
        <div
          style={{
            width: "80px",
            height: "45px",
            minWidth: "80px",
          }}
          className={`
          border-r-20 border d-flex dir-rtl ${
            isRightToleft ? "justify-content-start" : "justify-content-end"
          }`}
          onClick={handleToggleiSRightToleft}
        >
          <section
            className={`d-flex justify-content-center align-item-center border-r-circle 
          cur-pointer transition-all-v1  
          
          ${!isRightToleft && "rotate-180"}
          `}
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: "#F36523",
            }}
          >
            <Icons.Direction svgClassName="icon" />
          </section>
        </div>
        <section className={ms_2}>
          <Typography.H8 className="font-400">
            {isRightToleft ? content.rightToLeft : content.leftToRight}
          </Typography.H8>
        </section>
      </article>

      <article className="w-100 mt-6 ">
        <Grid container className={"d-flex justify-content-end "}>
          <Grid item lg={3} md={5} sm={10} xs={10}>
            <Buttons.Contained className="w-100 button_large ">
              <Typography.H6 className=" font-200 ">
                {/* {login.enterButton} */}
                {content.continueButton}
              </Typography.H6>
            </Buttons.Contained>
          </Grid>
        </Grid>
      </article>
    </div>
  );
}
