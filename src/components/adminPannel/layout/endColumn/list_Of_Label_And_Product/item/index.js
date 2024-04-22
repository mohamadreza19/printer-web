import { useEffect } from "react";

import {
  AdminDelete_Product_Mutation,
  AdminDelete_Label_Mutation,
  AdminDelete_Project_template_Mutation,
} from "../../../../../../reactQuery/admin/callDeleteService";

import { Admin_User_Image } from "../../../../../../reactQuery/common/callGetService";

import {
  useContent_Based_Language,
  useDynamicCssClass,
  useLanguage,
} from "../../../../../../recoil/readStore";
import Icons from "../../../../../../styles/__ready/Icons";
import Typography from "../../../../../../styles/__ready/Typography";
import LabelColumnTwo from "./LabelColumnTwo";
import ProductColumnTwo from "./ProductColumnTwo";
import useFormetDate from "../../../../../../utility/useFormetDate";
import { Link } from "react-router-dom";
import useDeleteAlert from "../../../../../../recoil/reducer/useDeleteAlert";

// item.pictures[0].id
export default function ({
  item = {
    id: "",
    creator: "",
    type: "",
    widthOfPrintingArea: "",
    width: "",
    height: "",
    link: "",
    updatedAt: "",
  },
  currentList = "",

  navigate_edit_product_label = () => {},
}) {
  const cssClass = useDynamicCssClass();
  //

  const deleteProduct_mutate = AdminDelete_Product_Mutation();
  const deleteLabel_mutate = AdminDelete_Project_template_Mutation();
  const imageRes = Admin_User_Image("admin");
  const language = useLanguage();
  const iamgeId =
    'pictures' in item && item.pictures.length > 0
      ? item.pictures[0]?.id
      : undefined;
  //
  const content =
    useContent_Based_Language().AdminPannel.end_col.label_Product_List.item;

  const setDeleteAlert = useDeleteAlert();

  useEffect(() => {
    if (currentList === "Product")
      if (iamgeId) {
        const option = {
          fileId: iamgeId,
        };
        imageRes.mutate(option);
      }
  }, [iamgeId]);

  function delete_product() {
    const option = {
      id: item.id,
    };

    setDeleteAlert({
      isShow: true,
      message: "ایا از حذف محصول مطمعا هستید",
      deleteFn: () => deleteProduct_mutate.mutate(option),
    });
  }
  function delete_Label() {
    const option = {
      id: item.id,
    };

    setDeleteAlert({
      isShow: true,
      message: "ایا از حذف لیبل مطمعا هستید",
      deleteFn: () => deleteLabel_mutate.mutate(option),
    });
  }
  function nameController() {
    if (language === "fa") {
      return item.name.persian || item.name.english;
    }
    if (language === "en") {
      return item.name.english;
    }
    if (language === "tr") {
      return item.name.turkish || item.name.english;
    }
  }
  function lanelNameController() {
    if (language === "fa") {
      return item.name.persian;
    }
    if (language === "en") {
      return item.name.english;
    }
    if (language === "tr") {
      return item.name.turkish;
    }
  }
  function avatarControler() {
    switch (currentList) {
      case "Product":
        return imageRes.data && URL.createObjectURL(imageRes.data);
      case "Label":
        return "/image/image-placeholder.png";

      default:
        break;
    }
  }
  // function go_edit_product() {}
  // function go_edit_label() {}
  // if (imageRes.data)

  return (
    <div className="w-100 border border-r-25 p-2 d-flex justify-content-between my-2">
      <article className="d-flex">
        <div className="d-flex">
          <section
            style={{
              width: "72px",
              height: "72px",
            }}
            className=""
          >
            <img
              className="w-100 h-100 img-fill border-r-20"
              src={avatarControler()}
            />
          </section>
          <section
            style={{
              width: "170px",
            }}
            className={
              "d-flex justify-content-center flex-column " + cssClass.ms_2
            }
          >
            <Typography.H8 className="mb-2 position-relative ">
              {nameController()}
            </Typography.H8>
            <footer className="d-flex align-item-center">
              <span>
                <Icons.Persion />
              </span>
              <span>
                <Typography.H9_5 className={"font-400 " + cssClass.ms_1}>
                  {currentList === "Product" ? item.creator : item.createdBy}
                </Typography.H9_5>
              </span>
            </footer>
          </section>
        </div>
        {item.type === "label" ? (
          <LabelColumnTwo
            height={currentList === "Product" ? item.height : item.railWidth}
            width={currentList === "Product" ? item.width : item.railWidth}
          />
        ) : (
          <ProductColumnTwo
            width={item.width}
            widthOfPrintingArea={
              currentList === "Product"
                ? item.widthOfPrintingArea
                : item.railWidth
            }
          />
        )}
      </article>
      <article className="d-flex justify-content-between align-items-center">
        <div
          className={
            cssClass.me_5 +
            " d-flex flex-column justy-content-between px-2 py-2 h-100   "
          }
        >
          <header className="mb-2 ">
            <span
              className={`w-fit-content border_bottom_primary ${
                !item.link && "invisible"
              }`}
            >
              <Link to={item?.link}>
                <Typography.H9_5 className="color-primary font-400">
                  {content.colTwo.Product_link_on_the_site}
                </Typography.H9_5>
              </Link>
            </span>
          </header>
          <footer className="d-flex py-">
            <span>
              <Typography.H9_5 className="font-500 white-space-nowrap">
                {content.colTwo.latestUpdate}
              </Typography.H9_5>
            </span>
            <span className={cssClass.ms_1}>
              <Typography.H9_5
                className="font-400 white-space-nowrap"
                language={language}
              >
                {useFormetDate(item.updatedAt, language)}
              </Typography.H9_5>
            </span>
          </footer>
        </div>
        <div>
          <section className={"d-flex " + cssClass.pe_2}>
            <span
              className="cur-pointer"
              onClick={() => {
                if (currentList === "Product") {
                  delete_product();
                }
                if (currentList === "Label") {
                  delete_Label();
                }
              }}
            >
              <Icons.Trash />
            </span>
            <span className="mx-2 cur-pointer">
              <Icons.Trade />
            </span>
            <span className="cur-pointer" onClick={navigate_edit_product_label}>
              <Icons.Edit />
            </span>
          </section>
        </div>
      </article>
    </div>
  );
}
