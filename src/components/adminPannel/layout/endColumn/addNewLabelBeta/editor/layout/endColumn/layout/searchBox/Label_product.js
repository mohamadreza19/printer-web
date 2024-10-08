import { Link } from "react-router-dom";
import { useDynamicCssClass } from "../../../../../../../../../../recoil/readStore";
import {
  Down,
  PlusPeoduct_Labels,
  StarOne,
  Up,
} from "../../../../../../../../../../styles/__ready/EditorIcons";
import Typography from "../../../../../../../../../../styles/__ready/Typography";
import { Draggable } from "react-beautiful-dnd";

import DragibleContainerNeedStyled from "./layout/DragibleContainerNeedStyled";
import { useEffect } from "react";
import { Admin_User_Image } from "../../../../../../../../../../reactQuery/common/callGetService";

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
}) {
  const cssClass = useDynamicCssClass();
  const imageResonse = Admin_User_Image("user");

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
          <DragibleContainerNeedStyled
            {...provided.draggableProps}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            isDragging={snapshot.isDragging}
            productWidth={product.width}
          >
            <article
              className={`${
                snapshot.isDragging && "d-none"
              } w-100 d-flex flex-column px-3 pb-4 mb-3 product-label-box `}
            >
              <div className="d-flex">
                <header className="d-flex  align-items-center justify-content-center">
                  <span className="product-label-picture d-flex justify-content-center align-items-center">
                    {imageResonse.data && (
                      <img
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
                className={"d-flex align-items-center   mt-3 " + cssClass.ps_4}
              >
                <header className="product-label-plus-box  d-flex align-item-center justify-content-end ">
                  <header className="product-label-icon-plus-box d-flex justify-content-center align-items-center">
                    <PlusPeoduct_Labels />
                  </header>
                  <Typography.H8 className={cssClass.me_3}>1</Typography.H8>
                  <footer className={"d-flex flex-column " + cssClass.me_1}>
                    <span className="d-flex justify-content-center align-item-center mb-1">
                      <Up className_for_path={"fill_secondray_v2 "} />
                    </span>
                    <span className="d-flex justify-content-center align-item-center ">
                      <Down className_for_path={"fill_secondray_v2"} />
                    </span>
                  </footer>
                </header>
                <footer className="w-100 d-flex align-items-center justify-content-between  ">
                  <span
                    className={
                      "d-flex justify-content-center align-items-center cur-pointer " +
                      cssClass.ms_2
                    }
                    onClick={() => {
                      console.log({ imCliced: product });

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
                        مشاهده در سایت
                      </Typography.H9_5>
                    </Link>
                  </section>
                </footer>
              </div>
            </article>
          </DragibleContainerNeedStyled>
        );
      }}
    </Draggable>
  );
}
