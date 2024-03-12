import { Link } from "react-router-dom";
import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../../../../../../../../recoil/readStore";
import {
  Down,
  PlusPeoduct_Labels,
  StarOne,
  Up,
} from "../../../../../../../../../../styles/__ready/EditorIcons";
import Typography from "../../../../../../../../../../styles/__ready/Typography";
import { Draggable } from "react-beautiful-dnd";

import DragibleContainerNeedStyled from "./layout/DragibleContainerNeedStyled";
import { useEffect, useState } from "react";
import { Admin_User_Image } from "../../../../../../../../../../reactQuery/common/callGetService";
import userEditor_DnD from "../../../../../../../../../../helper/userEditor_DnD";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { useTranslation } from "react-i18next";
import { getProjectDimensions } from "../../../../../../../../../../redux/project/project._slice";
import { useSelector } from "react-redux";

const inital = {
  id: " ",
  link: "string",
  name: {
    persian: "",
    turkish: "",
    english: "",
  },
  description: {
    persian: "",
    turkish: "",
    english: "",
  },
  width: 300,
  widthOfPrintingArea: "",
  pictures: [],
  bookmarked: false,
  isDragDisabled: false,
};

export default function ({
  handleAdd_Bookmark = () => {},
  handleDeleteBookmark = () => {},
  product = inital,
  myKey,
  index,
  isDragDisabled = false,
  handleAddCustomLabelWithPlusButton = () => {},
  railsLength = 0,
}) {
  const contnet =
    useContent_Based_Language().userPannel.editor.endColumn.productsBox;

  const cssClass = useDynamicCssClass();
  const imageResonse = Admin_User_Image("user");
  const [copyNumber, setCopyNumber] = useState(1);
  const [selectedRail, setSelectedRail] = useState(0);
  const projectDimensions = useSelector(getProjectDimensions);

  const { t } = useTranslation();

  function incresment_copyNumber() {
    setCopyNumber(copyNumber + 1);
  }
  function decrement_copyNumber() {
    if (copyNumber > 1) {
      setCopyNumber(copyNumber - 1);
    }
  }
  function handle_Change_copyNumber(event) {
    const value = Number(event.target.value);
    if (value > 1) {
      setCopyNumber(value);
    }
  }
  function handle_click_plus_btn() {
    const option = {
      numberOfCopy: Number(copyNumber),
      selectedRail: Number(selectedRail),
    };
    handleAddCustomLabelWithPlusButton(product, option);
  }
  function handle_on_change_number_of_rail(value) {
    const valueNum = Number(value);

    setSelectedRail(valueNum);
  }

  const RenderedSelectNumberOfRail = () => {
    let options = [];

    options.push(
      <div
        style={{
          width: "100%",
        }}
        className="cur-pointer"
      >
        {t("editor.selectedRail")}
      </div>
    );
    for (let i = 0; i < railsLength; i++) {
      options.push(
        <div
          style={{
            width: "100%",
            height: "36px",
            // border: "1px solid black",
            backgroundColor: i === selectedRail ? "#CBCBCB" : "white",
          }}
          className="cur-pointer"
          key={i}
          onClick={() => {
            handle_on_change_number_of_rail(i);
          }}
        >
          {i + 1}
        </div>
      );
    }

    return (
      <>
        {/* {selectedRail} */}
        {options}
      </>
    );
  };

  useEffect(() => {
    if (product?.pictures?.length > 0) {
      const option = {
        fileId: product.pictures[product.pictures.length - 1].id,
      };
      imageResonse.mutate(option);
    }
  }, []);

  return (
    <Draggable
      isDragDisabled={isDragDisabled}
      key={myKey}
      draggableId={product.id.toString()}
      index={index}
    >
      {(provided, snapshot) => {
        return (
          <>
            <DragibleContainerNeedStyled
              {...provided.draggableProps}
              ref={provided.innerRef}
              {...provided.dragHandleProps}
              height={projectDimensions.width}
              isDragging={snapshot.isDragging}
              productWidth={product.width}
            />

            <article
              {...provided.draggableProps}
              ref={provided.innerRef}
              {...provided.dragHandleProps}
              className={`${
                snapshot.isDragging && "d-none"
              }  w-100 d-flex flex-column px-3 pb-4 mb-3 product-label-box `}
            >
              <div className="d-flex">
                <header className="d-flex  align-items-center justify-content-center">
                  <span className="product-label-picture d-flex justify-content-center align-items-center">
                    {imageResonse.data && (
                      <img
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        className="w-100 h-100 border-r-20"
                        src={URL.createObjectURL(imageResonse.data)}
                      />
                    )}
                  </span>
                </header>
                <footer className={"d-flex flex-column " + cssClass.ms_1}>
                  <Typography.H8 className="font-500 mb-1">
                    {product.name.persian}
                  </Typography.H8>
                  <Typography.H9 className="font-400">
                    {product.description.persian}
                  </Typography.H9>
                </footer>
              </div>
              <div
                className={
                  "d-flex align-items-center  bg-white   mt-3 " + cssClass.ps_4
                }
              >
                <ActionBtnBox>
                  <SelectNumberOfRailBox className="d-flex ">
                    <Typography.H10 className="flex flex-column ">
                      <RenderedSelectNumberOfRail />
                    </Typography.H10>
                  </SelectNumberOfRailBox>
                  <header className="product-label-plus-box  d-flex align-item-center justify-content-end ">
                    <header
                      onClick={handle_click_plus_btn}
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
                      <input
                        style={{
                          width: 20,
                          height: 20,
                          position: "relative",
                          left: 10,
                        }}
                        type="number"
                        onChange={handle_Change_copyNumber}
                        className="border-0"
                        value={copyNumber}
                      />
                    </section>

                    <footer className={"d-flex flex-column " + cssClass.me_1}>
                      <span
                        onClick={incresment_copyNumber}
                        className="c-pointer rotate-0 d-flex justify-content-center align-item-center mb-1"
                      >
                        <Up className_for_path={"fill_secondray_v2 "} />
                      </span>
                      <span
                        onClick={decrement_copyNumber}
                        className="c-pointer rotate-0 d-flex justify-content-center align-item-center "
                      >
                        <Down className_for_path={"fill_secondray_v2"} />
                      </span>
                    </footer>
                  </header>
                </ActionBtnBox>

                <footer className="w-100 d-flex align-items-center justify-content-between  ">
                  <span
                    className={
                      "d-flex justify-content-center align-items-center cur-pointer " +
                      cssClass.ms_2
                    }
                    onClick={() => {
                      handleAdd_Bookmark(product);
                      handleDeleteBookmark(product);
                    }}
                  >
                    <StarOne
                      isBookMark={product.bookmarked}
                      className="bookmark-secendary"
                      // className_for_path="fill_secondray_v2"
                    />
                  </span>
                  <section>
                    <Link to={product.link}>
                      <Typography.H9_5 className="font-400 see-in-site">
                        {t("showInSite")}
                      </Typography.H9_5>
                    </Link>
                  </section>
                </footer>
              </div>
            </article>
          </>
        );
      }}
    </Draggable>
  );
}

const ActionBtnBox = styled.div`
  z-index: 10;
  background-color: white;
  position: relative;
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
