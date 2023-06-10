import { useEffect, useState } from "react";
import { useRef } from "react";
import {
  useContent_Based_Language,
  useDynamicCssClass,
  useLanguage,
} from "../../../../../../recoil/readStore";
import Icons from "../../../../../../styles/__ready/Icons";
import Item from "./item";
import InfiniteScroll from "react-infinite-scroll-component";

export default function ({
  data = [],
  hasNextPage,
  fetchNextPage,
  setOrder,
  displayPriority,
}) {
  const cssClass = useDynamicCssClass();
  const language = useLanguage();

  function scrollToTop() {
    const infinite = document.getElementsByClassName(
      "infinite-scroll-component"
    )[0];
    infinite.scrollTo({ top: 0, behavior: "smooth" });
    // infinite.scrollTo(0, 0);
  }
  return (
    <div
      className="w-100 d-flex mt-3 px-4 position-relative "
      id="container-wrapp"
    >
      <InfiniteScroll
        height={238}
        dataLength={data.length}
        hasMore={hasNextPage}
        next={fetchNextPage}
        className={"w-100 scrollable-small  bg-white " + cssClass.pe_3}
      >
        {data.map((item, index) => (
          <Item item={item} key={index} displayPriority={displayPriority} />
        ))}
      </InfiniteScroll>
      <section
        onClick={() =>
          setOrder((draft) => {
            if (draft === "ASC") {
              return "DESC";
            } else {
              return "ASC";
            }
          })
        }
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
      >
        <Icons.Revers size="small" />
      </section>
      <section
        onClick={scrollToTop}
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
