//utilis
import useFormValue from "../../../../../../../helper/admin_add_product_label/control_label_dynamic_input";

//validate
import validatePage2 from "../../../../../../../helper/admin_add_product_label/validate_label/validatePageTwo";
//

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
  AdminEditLabel_Mutation,
} from "../../../../../../../reactQuery/admin/callPutService";

import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function () {
  const content =
    useContent_Based_Language().AdminPannel.end_col.addNew_Project_Or_Label;
  const cssClass = useDynamicCssClass();
  const language = useLanguage();
  //
  const { labelid } = useParams();
  const res = AdminLabel_findOne(labelid);
  const image = Admin_User_Image("admin");
  //
  const meta = useFormValue();
  const mutate = AdminEditLabel_Mutation();
  const editImagemutate = AdminEditImage_Mutation();
  //
  const validateFn = validatePage2();
  async function submit() {
    try {
      await validateFn();

      const option = {
        id: res.data.id,
      };
      if (meta.picture.file) {
        mutate.mutateAsync(option);
      }
    } catch (error) {}
  }

  useEffect(() => {
    if (mutate.isSuccess) {
      const perviusFileId = +res.data.pictures[0].id;

      //
      const picture = meta.picture.file;
      const payload = {
        perviusFileId,
        file: picture,
      };
      editImagemutate.mutate(payload);
    }
  }, [mutate.data]);
  useEffect(() => {
    return () => {
      meta.clear();
    };
  }, []);

  if (res.data)
    return (
      <div className="w-100 ">
        <Header />
        {!editImagemutate.isSuccess ? (
          <>
            <TextFieldsBox
              param={{
                width: res.data.width,
                height: res.data.height,
              }}
            />
            <UploadAera
              onLoadedMeta={editImagemutate.onLoadedMeta}
              res={res}
              image={image}
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
              picture: meta.picture.file || image.data,
              width: mutate.data.width,
              height: mutate.data.height,
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
