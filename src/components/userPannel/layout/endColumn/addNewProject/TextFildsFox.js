import { useState } from "react";
import { atom, useRecoilState } from "recoil";
import { useImmer } from "use-immer";
import Textfields from "../../../../../styles/__ready/Textfields";
import Typography from "../../../../../styles/__ready/Typography";

export default function ({ ms_2 = " ", pe_1 = " " }) {
  const [input, setInput] = useState("");
  // const [inputTwo, setInputTwo] = useState("");
  const handleChange = (event) => {
    const value = event.target.value;
    console.log(value);
    setInput(value);
  };
  console.log("slm");
  const TextFildRow1 = () => {
    return (
      <div className="mt-4 w-60">
        <Typography.H8 className={"mb-2 font-400 " + ms_2}>
          نام پروژه
        </Typography.H8>
        <section className="w-100">
          <article>
            <div
              className={
                "w-100 bg-white border py-3 px-3 d-flex align-items-center border-r-20 "
              }
            >
              <input
                key={"slm"}
                className={"text-filed-input-v2 " + ms_2}
                value={input}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </article>

          <footer className={"w-100 d-flex justify-content-end px-2"}>
            <Typography.Button_v2
              className="font-400 disabled_gray2"
              // style={{
              //   fontFamily: "Vazirmatn",
              // }}
            >
              0/120
            </Typography.Button_v2>
          </footer>
        </section>
      </div>
    );
  };
  const TextFildRow2 = () => {
    return (
      <div className="mt-4 w-60">
        <Typography.H8 className={"mb-2 font-400 " + ms_2}>
          نام پروژه
        </Typography.H8>
        <section className="w-100">
          <Textfields.v2 className="" Input_marginStart_based_Language={ms_2} />
          s
        </section>
      </div>
    );
  };
  return (
    <div className="w-100 mt-10 px-5">
      <header>
        <Typography.H7>{"لطفا اطلاعات پروژه خود را وارد کنید"}</Typography.H7>
      </header>
      <TextFildRow1 />
      <TextFildRow2 />
    </div>
  );
}
