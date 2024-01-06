import { useState } from "react";
import Typography from "../Typography";
import styled from "styled-components";
import { Down, PlusPeoduct_Labels, Up } from "../EditorIcons";
import { useDynamicCssClass } from "../../../recoil/readStore";

const SelectNumberPlusBtn = ({
  listLength = 0,
  selectedItem = 0,
  mutateValue = 1,
  setItemInList = () => {},
  incresment = () => {},
  decrement = () => {},
  submit = () => {},
}) => {
  const cssClass = useDynamicCssClass();

  const RenderedSelectNumberOfRail = () => {
    let options = [];

    for (let i = 0; i < listLength; i++) {
      options.push(
        <div
          style={{
            width: "100%",
            height: "36px",
            // border: "1px solid black",
            backgroundColor: i === selectedItem ? "#CBCBCB" : "white",
          }}
          className="cur-pointer"
          key={i}
          onClick={() => {
            setItemInList(i);
          }}
        >
          <Typography.H10>{i + 1}</Typography.H10>
        </div>
      );
    }

    return <>{options}</>;
  };
  return (
    <ActionBtnBox>
      <SelectNumberOfRailBox className="d-flex flex-column ">
        <RenderedSelectNumberOfRail />
      </SelectNumberOfRailBox>
      <header className="product-label-plus-box  d-flex align-item-center justify-content-end ">
        <header
          onClick={submit}
          className="c-pointer product-label-icon-plus-box d-flex justify-content-center align-items-center"
        >
          <PlusPeoduct_Labels />
        </header>
        <section
          style={{
            width: "20px",
            maxWidth: "20px",
            textAlign: "center",
          }}
          className={cssClass.pe_3}
        >
          <Typography.H8>{mutateValue}</Typography.H8>
        </section>

        <footer className={"d-flex flex-column " + cssClass.me_1}>
          <span
            onClick={incresment}
            className="c-pointer d-flex justify-content-center align-item-center mb-1"
          >
            <Up className_for_path={"fill_secondray_v2 "} />
          </span>
          <span
            onClick={decrement}
            className="c-pointer d-flex justify-content-center align-item-center "
          >
            <Down className_for_path={"fill_secondray_v2"} />
          </span>
        </footer>
      </header>
    </ActionBtnBox>
  );
};

export default SelectNumberPlusBtn;
const ActionBtnBox = styled.div`
  z-index: 10;
  background-color: white;
  position: relative;
  width: fit-content;
`;
const SelectNumberOfRailBox = styled.div`
  text-align: center;
  width: 100%;
  background-color: white;
  border: 1px solid #cbcbcb;
  position: absolute;
  top: -19px;
  left: 50%;
  transform: translate(-50%, -50%);
  // border-bottom-right-radius: 20px;
  // border-bottom-left-radius: 20px;
  height: 60px;
  max-height: 60px;
  overflow-y: scroll;
  // min-height: 99px;
  visibility: hidden;
  transition: visibility 0.2s;

  ${ActionBtnBox}:hover & {
    visibility: visible;
  }
`;
