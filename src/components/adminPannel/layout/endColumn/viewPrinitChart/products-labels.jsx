import React from "react";

import _ from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";
import useFormetDate, {
  FormateDateWithExpire,
} from "../../../../../utility/useFormetDate";
import { t } from "i18next";

export class ProductsLabels extends React.Component {
  state = {
    data: [],
    page: 0,
    language: "",
  };

  constructor(props) {
    super();
    this.scrollContainerRef = React.createRef(); // Ensure it's initialized
    this.state = {
      ...this.state,
      language: props.language,
    };
  }
  componentDidUpdate(prevProps, prevState) {
    // Compare current props/state with previous props/state
    if (this.props.data && "pages" in this.props.data) {
      const newPageCount = this.props.data.pages.length;
      if (prevState.page !== newPageCount) {
        let mapedData = [];

        for (let item of this.props.data.pages) {
          if ("prodcuts" in item) {
            mapedData = mapedData.concat(
              this.readProducts(item.prodcuts.items)
            );
          }

          if ("labels" in item) {
            mapedData = mapedData.concat(this.readLabels(item.labels.items));
          }
        }

        // Correctly update state using setState
        this.setState((prevState) => ({
          ...prevState,
          data: mapedData,
          page: newPageCount,
          // lang,
        }));
      }
    }
  }

  readProducts(products = []) {
    return products.map((product) => ({
      type: "product",
      ...product,
    }));
  }
  readLabels(labels = []) {
    return labels.map((label) => ({
      type: "label",
      ...label,
    }));
  }
  loopData() {
    const language = this.state.language;
    return this.state.data.map((item, index) => {
      return item.type === "product" ? (
        <ProductCard item={item} key={index} language={language} />
      ) : (
        <LabelCard item={item} key={index} language={language} />
      );
    });
  }
  render() {
    const { data, indexPage, limit, language } = this.state;
    const { hasMore, next, show } = this.props;
    if (show)
      return (
        <div id="products-labels" className="w-100 py-4 position-relative">
          <SortBox
            scroll={this.scrollToTop}
            reverseArr={this.reverseArr}
            language={this.state.language}
          />
          <InfiniteScroll
            ref={this.scrollContainerRef}
            className="w-100 px-4 "
            pullDownToRefreshThreshold={300}
            next={next}
            dataLength={data.length}
            hasMore={hasMore}
            threshold={100}
            height={500}
            scrollableTarget
          >
            {this.loopData()}
          </InfiniteScroll>
        </div>
      );
  }
  scrollToTop = () => {
    if (this.scrollContainerRef.current) {
      this.scrollContainerRef.current.el.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } else {
      console.warn("Scroll container ref is not defined yet.");
    }
  };
  reverseArr = () => {
    this.setState({
      ...this.state,
      data: this.state.data.reverse(),
    });
  };
}

const ProductCard = ({ item, language }) => {
  const dateObj = item.printedAt
    ? FormateDateWithExpire(item.printedAt, language, false)
    : null;

  return (
    <section
      style={{
        minHeight: "62px",
        borderRadius: "25px",
        border: `1px solid ${
          item.type === "product" ? "rgb(255 204 180)" : "#CBCBCB"
        }`,
        columnGap: "70px",
        paddingInlineStart: "30px",
      }}
      className=" w-100 mb-2 d-flex justify-content-start align-items-center"
    >
      <span className="">{handleName(item.name) || "null"}</span>
      <span className="">
        {t("createBy")}: {item.creator}{" "}
      </span>
      <span>
        {t("lastPrint")}:‌{dateObj ? dateObj.date : "null"}
      </span>
      <span>
        {t("print")} :{item.printsCount || null}
      </span>
      <span>
        <svg
          width="23"
          height="17"
          viewBox="0 0 23 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.0807 1.15316C12.5338 1.22973 12.1525 1.7352 12.229 2.28214C12.3056 2.82909 12.8111 3.21041 13.358 3.13384L18.1088 2.46873L12.5758 9.76928L9.01486 6.08971C8.81163 5.8797 8.52669 5.76911 8.23499 5.78702C7.94329 5.80492 7.67402 5.94954 7.498 6.18282L0.869766 14.9673C0.537116 15.4082 0.624845 16.0352 1.06572 16.3679C1.50659 16.7005 2.13365 16.6128 2.4663 16.1719L8.39051 8.32049L11.9497 11.9982C12.1527 12.208 12.4372 12.3186 12.7285 12.301C13.0199 12.2834 13.289 12.1394 13.4653 11.9068L19.4833 3.96634L20.0803 8.23052C20.1569 8.77747 20.6624 9.15878 21.2093 9.08221C21.7563 9.00564 22.1376 8.50017 22.061 7.95322L21.0933 1.04116C21.0168 0.494212 20.5113 0.112897 19.9643 0.189469L13.0807 1.15316Z"
            fill="#F36523"
          />
        </svg>
      </span>
    </section>
  );
};
const LabelCard = ({ item, language }) => {
  const dateObj = item.printedAt
    ? FormateDateWithExpire(item.printedAt, language, false)
    : null;
  return (
    <section
      style={{
        minHeight: "62px",
        borderRadius: "25px",
        border: `1px solid ${
          item.type === "product" ? "rgb(255 204 180)" : "#CBCBCB"
        }`,

        columnGap: "70px",
        paddingInlineStart: "30px",
      }}
      className=" w-100 mb-2 d-flex justify-content-start align-items-center"
    >
      <span className="me-2">{handleName(item.name) || "null"}</span>
      <span className="mx-3">
        {t("createBy")} : {item.creator || "null"}{" "}
      </span>
      <span>
        {t("lastPrint")} :‌{dateObj ? dateObj.date : "null"}
      </span>
      <span>
        {t("print")} :{item.printsCount}
      </span>
      <span>
        <svg
          width="23"
          height="17"
          viewBox="0 0 23 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.0807 1.15316C12.5338 1.22973 12.1525 1.7352 12.229 2.28214C12.3056 2.82909 12.8111 3.21041 13.358 3.13384L18.1088 2.46873L12.5758 9.76928L9.01486 6.08971C8.81163 5.8797 8.52669 5.76911 8.23499 5.78702C7.94329 5.80492 7.67402 5.94954 7.498 6.18282L0.869766 14.9673C0.537116 15.4082 0.624845 16.0352 1.06572 16.3679C1.50659 16.7005 2.13365 16.6128 2.4663 16.1719L8.39051 8.32049L11.9497 11.9982C12.1527 12.208 12.4372 12.3186 12.7285 12.301C13.0199 12.2834 13.289 12.1394 13.4653 11.9068L19.4833 3.96634L20.0803 8.23052C20.1569 8.77747 20.6624 9.15878 21.2093 9.08221C21.7563 9.00564 22.1376 8.50017 22.061 7.95322L21.0933 1.04116C21.0168 0.494212 20.5113 0.112897 19.9643 0.189469L13.0807 1.15316Z"
            fill="#F36523"
          />
        </svg>
      </span>
    </section>
  );
};

function handleName(nameObj) {
  if (!nameObj) return null;

  if (!nameObj.english) return null;

  return nameObj.english;
}

const SortBox = ({ scroll, reverseArr, language }) => {
  const right = {
    right: "-12px",
  };
  const left = {
    left: "-12px",
  };

  return (
    <div
      style={{
        [language == "fa" ? "left" : "right"]: "-12px",
        top: 0,
      }}
      className="position-absolute h-100 d-flex  flex-column"
    >
      <section
        onClick={reverseArr}
        style={{
          width: 32,
          height: 32,
          borderRadius: "8px",
          background: "#F36523",
        }}
        className="border d-flex justify-content-center align-item-center cur-pointer"
      >
        <svg
          width="19"
          height="14"
          viewBox="0 0 19 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.9957 0.631836C5.35469 0.631836 5.6457 0.922852 5.6457 1.28184V11.0915L8.4189 8.31834C8.67274 8.0645 9.0843 8.0645 9.33814 8.31834C9.59198 8.57218 9.59198 8.98374 9.33814 9.23758L5.45532 13.1204C5.33096 13.2448 5.16874 13.3082 5.00575 13.3107L4.9957 13.3108L4.98566 13.3107C4.90149 13.3094 4.82121 13.2922 4.7477 13.2618C4.67074 13.2301 4.59862 13.183 4.53608 13.1204L0.653271 9.23758C0.39943 8.98374 0.39943 8.57218 0.653271 8.31834C0.907112 8.0645 1.31867 8.0645 1.57251 8.31834L4.3457 11.0915V1.28184C4.3457 0.922852 4.63672 0.631836 4.9957 0.631836ZM9.45552 5.62429C9.70936 5.87813 10.1209 5.87813 10.3748 5.62429L13.148 2.85108V12.6608C13.148 13.0198 13.439 13.3108 13.798 13.3108C14.1569 13.3108 14.448 13.0198 14.448 12.6608V2.85108L17.2211 5.62429C17.475 5.87813 17.8865 5.87813 18.1404 5.62429C18.3942 5.37045 18.3942 4.95889 18.1404 4.70504L14.2576 0.822217C14.1951 0.759723 14.123 0.712615 14.0461 0.680892C13.9714 0.649999 13.8897 0.632638 13.804 0.631863L13.798 0.631836L13.792 0.631863C13.6276 0.633371 13.4637 0.696822 13.3383 0.822217L9.45552 4.70504C9.20168 4.95889 9.20168 5.37045 9.45552 5.62429Z"
            fill="white"
          />
        </svg>
      </section>
      <section
        onClick={scroll}
        style={{
          width: 32,
          height: 32,
          borderRadius: "8px",
          background: "#F36523",
        }}
        className="border mt-auto d-flex justify-content-center align-item-center cur-pointer"
      >
        <svg
          width="15"
          height="9"
          viewBox="0 0 15 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.68273 0.358662C7.07462 -0.0401432 7.71737 -0.0401435 8.10926 0.358662L14.0867 6.4416C14.7082 7.07405 14.2602 8.1425 13.3735 8.1425L1.41853 8.1425C0.531834 8.1425 0.0837843 7.07405 0.705265 6.4416L6.68273 0.358662Z"
            fill="white"
          />
        </svg>
      </section>
    </div>
  );
};
