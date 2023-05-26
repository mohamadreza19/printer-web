//utilis
import useFormValue from "../../../../../../helper/admin_add_product_label/control_product_dynamic_input/index";

//validate
import validatePage2 from "../../../../../../helper/admin_add_product_label/validate_product/page2_wdiths_validate";
//
import useAdd_product from "../../../../../../helper/admin_add_product_label/control_product_dynamic_input/";
//
import {
  useContent_Based_Language,
  useDynamicCssClass,
  useLanguage,
} from "../../../../../../recoil/readStore";

import {
  TextFieldFUN_v5,
  TextFieldFUN_v4,
  TextField_small_Custom,
} from "../../../../../../styles/__ready/Textfields";
import Typography from "../../../../../../styles/__ready/Typography";
import UploadAera from "./UploadAera";
import Header from "./Header";
import TextFieldsBox from "./TextFieldsBox";
import Buttons from "../../../../../../styles/__ready/Buttons";
import Icons from "../../../../../../styles/__ready/Icons";
import SuccessBox from "./SuccessBox";
import {
  AdminAddImage_Mutation,
  AdminAddProduct_Mutation,
} from "../../../../../../helper/AdminApiQueries";
import { useEffect } from "react";

export default function () {
  const content =
    useContent_Based_Language().AdminPannel.end_col.addNew_Project_Or_Label;
  const cssClass = useDynamicCssClass();
  const language = useLanguage();
  //
  const meta = useAdd_product("none", false, true, false);

  //

  const mutate = AdminAddProduct_Mutation();
  const AddImagemutate = AdminAddImage_Mutation();
  //
  const validateFn = validatePage2();
  async function submit() {
    try {
      await validateFn();
      mutate.mutateAsync();
    } catch (error) {}
  }

  useEffect(() => {
    if (mutate.isSuccess) {
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
  }, [mutate.data]);

  // console.log({ addImageData: AddImagemutate });
  console.log(AddImagemutate.onLoadedMeta);
  const continue_ = false;
  return (
    <div className="w-100 ">
      <Header />
      {!AddImagemutate.isSuccess ? (
        <>
          <TextFieldsBox />
          <UploadAera onLoadedMeta={AddImagemutate.onLoadedMeta} />
          <footer className=" d-flex justify-content-end mt-6 pb-5 ">
            <Buttons.Contained onClick={submit} className="button_large">
              <Typography.H7 className="font-400">ادامه</Typography.H7>
            </Buttons.Contained>
          </footer>
        </>
      ) : (
        <SuccessBox
          info={{
            picture: meta.picture,
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
            id: mutate.data.id,
          }}
        />
      )}
    </div>
  );
}
