import { useEffect, useState } from "react";
import { useRef } from "react";
import {
  useDynamicCssClass,
  useLanguage,
} from "../../../../../../recoil/readStore";
import Icons from "../../../../../../styles/__ready/Icons";
import Item from "./item";

export default function () {
  const scrollContainer = useRef(null);
  const scrollContentWrapper = useRef(null);
  const [IsDrag, setIsDrag] = useState(false);

  const cssClass = useDynamicCssClass();
  const language = useLanguage();
  console.log(language);

  return (
    <div className="w-100 d-flex mt-3 px-4 position-relative ">
      <article
        id="container-wrapp"
        className={"w-100 scrollable-small  bg-white " + cssClass.pe_3}
      >
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </article>
      <section
        style={{
          width: " 32px",
          height: " 32px",
          backgroundColor: "#F36523",
          zIndex: "2",
        }}
        className={`d-flex justify-content-center align-items-center border-r-8 position-absolute ${
          language == "fa"
            ? "action-botton-positon-rtl"
            : "action-botton-positon-ltr"
        } `}
        // className={`d-flex justify-content-center align-items-center border-r-8 position-absolute action-botton-positon `}
      >
        <Icons.Revers size="small" />
      </section>
      <section
        style={{
          width: " 32px",
          height: " 32px",
          top: "12.9rem",
          backgroundColor: "#F36523",
        }}
        className={`d-flex justify-content-center align-items-center border-r-8 position-absolute ${
          language == "fa"
            ? "action-botton-positon-rtl"
            : "action-botton-positon-ltr"
        } `}
        // className={`d-flex justify-content-center align-items-center border-r-8 position-absolute action-botton-positon `}
      >
        <Icons.UpArrow size="small" />
      </section>
    </div>
  );
}
