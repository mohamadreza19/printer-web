//utilis
import useFormValue from "../../../../../../../helper/admin_add_product_label/control_product_dynamic_input/index";

//validate
import validatePage2 from "../../../../../../../helper/admin_add_product_label/validate_product/page2_wdiths_validate";
//
import useAdd_product from "../../../../../../../helper/admin_add_product_label/control_product_dynamic_input/";
//
import {
  useContent_Based_Language,
  useDynamicCssClass,
  useLanguage,
} from "../../../../../../../recoil/readStore";

import Typography from "../../../../../../../styles/__ready/Typography";
import UploadAera from "./UploadAera";
import Header from "./Header";
import TextFieldsBox from "./TextFieldsBox";
import Buttons from "../../../../../../../styles/__ready/Buttons";

import SuccessBox from "./SuccessBox";

import { Admin_User_Image } from "../../../../../../../reactQuery/common/callGetService";
import { AdminLabel_findOne } from "../../../../../../../reactQuery/admin/callGetService";
import {
  AdminEditImage_Mutation,
  AdminEditProduct_Mutation,
} from "../../../../../../../reactQuery/admin/callPutService";
import { useEffect } from "react";
import { AdminAddImage_Mutation } from "../../../../../../../reactQuery/admin/callPostService";

export default function ({ res }) {
  const content =
    useContent_Based_Language().AdminPannel.end_col.addNew_Project_Or_Label;
  const cssClass = useDynamicCssClass();
  const language = useLanguage();
  //
  const meta = useAdd_product("none", false, true, false);

  //
  const imageForFirstShow = Admin_User_Image("admin");
  const mutate = AdminEditProduct_Mutation();

  const editImagemutate = AdminEditImage_Mutation();
  const AddImagemutate = AdminAddImage_Mutation();
  //
  const validateFn = validatePage2();
  async function submit() {
    try {
      await validateFn();
      const option = {
        id: res.data.id,
      };
      mutate.mutateAsync(option);
    } catch (error) {}
  }

  useEffect(() => {
    if (mutate.isSuccess) {
      if (res.data.pictures.length > 0) {
        const perviusFileId = +res.data.pictures[0].id;

        //
        const picture = meta.picture;
        const payload = {
          perviusFileId,
          file: picture,
        };
        editImagemutate.mutate(payload);
      } else {
        const entityType = "product";
        const entityId = +mutate.data.id;

        //
        const picture = meta.picture;
        const payload = {
          entityType,
          entityId,
          file: picture,
        };
        AddImagemutate.mutate(payload);
      }
    }
  }, [mutate.data]);
  const canShowSuccess =
    Boolean(editImagemutate.isSuccess) || Boolean(AddImagemutate.isSuccess);
  console.log({ meta });
  if (res.data)
    return (
      <div className="w-100 ">
        <Header />
        {!canShowSuccess ? (
          <>
            <TextFieldsBox res={res} />
            <UploadAera
              imageForFirstShow={imageForFirstShow}
              onLoadedMeta={
                editImagemutate.onLoadedMeta || AddImagemutate.onLoadedMeta
              }
              res={res}
            />
            <footer className=" d-flex justify-content-end mt-6 pb-5 ">
              <Buttons.Contained onClick={submit} className="button_large">
                <Typography.H7 className="font-400">ادامه</Typography.H7>
              </Buttons.Contained>
            </footer>
          </>
        ) : (
          <SuccessBox
            info={{
              picture: meta.picture || imageForFirstShow.data,
              description: () => {
                if (language == "fa") {
                  return mutate.data.description.persian;
                }
                if (language == "en") {
                  return mutate.data.description.english;
                }
                if (language == "tr") {
                  return mutate.data.description.turkish;
                }
              },
              width: mutate.data.width,
              widthOfPrintingArea: mutate.data.widthOfPrintingArea,
              isLink: mutate.data.link ? true : false,
              name: () => {
                if (language == "fa") {
                  return mutate.data.name.persian;
                }
                if (language == "en") {
                  return mutate.data.name.english;
                }
                if (language == "tr") {
                  return mutate.data.name.turkish;
                }
              },
              id: mutate.data?.id,
            }}
          />
        )}
      </div>
    );
}
