import { useState } from "react";
import { useRecoilState } from "recoil";
import {
  height_store,
  picture_store,
  width_store,
} from "../../../recoil/store/admin_add_product_label/add_label_store";
import { useLanguage } from "../../../recoil/readStore";

import pageTwo_validation from "../../../validation/admin/add_product_label/add_Label_pageTwo_validation";
export default function () {
  const [width, setWidth] = useRecoilState(width_store);
  const [height, setHeight] = useRecoilState(height_store);
  const [picture, setPicture] = useRecoilState(picture_store);
  const language = useLanguage();

  async function validate() {
    try {
      const body = {
        width: width.value,
        height: height.value,
        picture: picture.file,
      };

      await pageTwo_validation(body, language);
    } catch (error) {
      console.log(error);
      console.log(error.inner);

      error.inner.forEach((err) => {
        // console.log(err.path);
        const feild = err.path;
        if (feild === "width") {
          setWidth((draft) => ({ ...draft, validateErr: err.message }));
        }
        if (feild === "height") {
          console.log(err.path);
          setHeight((draft) => ({
            ...draft,
            validateErr: err.message,
          }));
        }
        if (feild === "picture") {
          setPicture((draft) => ({
            ...draft,
            validateErr: err.message,
          }));
        }
      });

      throw "error";
    }
  }

  return validate;
}
