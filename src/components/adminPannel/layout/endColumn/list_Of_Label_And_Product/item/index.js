import { useEffect } from "react";

import {
  AdminDelete_Product_Mutation,
  AdminDelete_Label_Mutation,
} from "../../../../../../reactQuery/admin/callDeleteService";

import { Admin_User_Image } from "../../../../../../reactQuery/common/callGetService";

import {
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
  navigate_edit_product_label = () => {},
}) {
  const cssClass = useDynamicCssClass();
  //
  console.log({ item });
  const deleteProduct_mutate = AdminDelete_Product_Mutation();
  const deleteLabel_mutate = AdminDelete_Label_Mutation();
  const imageRes = Admin_User_Image("admin");
  const language = useLanguage();
  //
  const setDeleteAlert = useDeleteAlert();

  useEffect(() => {
    if (item.pictures[0]?.id) {
      const option = {
        fileId: item.pictures[0]?.id,
      };
      imageRes.mutate(option);
    }
  }, []);

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
      return item.name.persian;
    }
    if (language === "en") {
      return item.name.english;
    }
    if (language === "tr") {
      return item.name.turkish;
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
              src={imageRes.data && URL.createObjectURL(imageRes.data)}
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
                  {item.creator}
                </Typography.H9_5>
              </span>
            </footer>
          </section>
        </div>
        {item.type === "label" ? (
          <LabelColumnTwo height={item.height} width={item.width} />
        ) : (
          <ProductColumnTwo
            width={item.width}
            widthOfPrintingArea={item.widthOfPrintingArea}
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
                  لینک محصول در سایت
                </Typography.H9_5>
              </Link>
            </span>
          </header>
          <footer className="d-flex py-">
            <span>
              <Typography.H9_5 className="font-500 white-space-nowrap">
                آخرین به روز رسانی
              </Typography.H9_5>
            </span>
            <span className={cssClass.ms_1}>
              <Typography.H9_5 className="font-400 white-space-nowrap">
                {useFormetDate(item.updatedAt, language)}
              </Typography.H9_5>
            </span>
          </footer>
        </div>
        <div>
          <section className={"d-flex " + cssClass.pe_2}>
            <span
              onClick={() => {
                console.log("on click");
                if (item.type === "product") {
                  console.log("product");
                  delete_product();
                }
                if (item.type === "label") {
                  console.log("is label");
                  delete_Label();
                }
              }}
            >
              <Icons.Trash />
            </span>
            <span className="mx-2">
              <Icons.Trade />
            </span>
            <span onClick={navigate_edit_product_label}>
              <Icons.Edit />
            </span>
          </section>
        </div>
      </article>
    </div>
  );
}
