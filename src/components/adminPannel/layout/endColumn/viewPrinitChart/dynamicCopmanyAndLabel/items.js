import { useEffect, useState } from "react";
import { useRef } from "react";
import Icons from "../../../../../../styles/__ready/Icons";
import Item from "./item";

export default function () {
  const scrollContainer = useRef(null);
  const scrollContentWrapper = useRef(null);
  const [IsDrag, setIsDrag] = useState(false);

  useEffect(() => {}, []);

  return (
    <div className="w-100 d-flex mt-2 px-4">
      <article id="container-wrapp" className="w-95 scrollable-small  bg-white">
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </article>
      <article className="w-5 d-flex flex-column align-items-center justify-content-center">
        <section
          style={{
            width: " 32px",
            height: " 32px",
            backgroundColor: "#F36523",
          }}
          className="d-flex justify-content-center align-items-center border-r-8"
        >
          <Icons.Revers size="small" />
        </section>
        <main
          style={{
            width: "10px",
            height: "180px",
            backgroundColor: "#ECECEC",
          }}
          ref={scrollContainer}
          className="position-relative"
          onMouseDown={(e) => {
            const child = document.getElementById("child");
            console.log({ e: e.target });
            child.style.top = "-30px";
          }}
        >
          <section
            id="child"
            className="w-100 position-absolute"
            style={{
              height: "90px",
              background: "#CBCBCB",
            }}
          ></section>
        </main>
        <section
          style={{
            width: " 32px",
            height: " 32px",
            backgroundColor: "#F36523",
          }}
          className="d-flex justify-content-center align-items-center border-r-8"
        >
          <Icons.UpArrow size="small" />
        </section>
      </article>
    </div>
  );
}
