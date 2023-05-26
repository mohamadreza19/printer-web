import { useImmer } from "use-immer";

import { useLanguage } from "../../../recoil/readStore";
import { useRecoilState } from "recoil";
import {
  additionalInfo_store,
  picture_store,
  productLink_store,
  productName_store,
  widthOfPrintingArea_store,
  width_store,
} from "../../../recoil/store/admin_add_product_label/add_product_store";
import productName_contoller from "./productName._contoller";
import additionalInfo_controller from "./additionalInfo_controller";

export default function (
  inputNameForHandle = "",
  all = false,
  safeState = false,
  allSetState = false
) {
  const language = useLanguage();
  const [productName, setProductName] = useRecoilState(productName_store);
  const [productLink, SetProductLink] = useRecoilState(productLink_store);
  const [additionalInfo, setAdditionalInfo] =
    useRecoilState(additionalInfo_store);
  //page 2
  const [width, SetWidth] = useRecoilState(width_store);
  const [widthOfPrintingArea, SetWidthOfPrintingArea] = useRecoilState(
    widthOfPrintingArea_store
  );
  const [picture, SetPicture] = useRecoilState(picture_store);
  // SetProductLink
  function handleSetProductLink(e) {
    SetProductLink({
      value: e.target.value,
      validateErr: "",
    });
  }

  function showproductAllLan() {
    let product_without_isShow = {};

    for (const key in productName) {
      const value = productName[key].value;

      product_without_isShow = { ...product_without_isShow, [key]: value };
    }
    let additionalInfo_without_isShow = {};
    for (const key in additionalInfo) {
      const value = additionalInfo[key].value;
      additionalInfo_without_isShow = {
        ...additionalInfo_without_isShow,
        [key]: value,
      };
    }
    const allState = {
      productName: product_without_isShow,
      additionalInfo: additionalInfo_without_isShow,
      productLink: productLink.value,
    };

    return allState;
  }
  //
  function handleSetWidth(e) {
    console.log(e);
    SetWidth({
      value: e.target.value,
      validateErr: "",
    });
  }
  function handleSetWidthOfPrintingArea(e) {
    SetWidthOfPrintingArea({
      value: e.target.value,
      validateErr: "",
    });
  }
  function handleSetPicture(e) {
    const file = e.file;
    const previewUrl = e.previewUrl;
    SetPicture((draft) => ({ file, previewUrl, validateErr: "" }));
  }
  //
  if (safeState) {
    return {
      name: {
        persian: productName.persian.value,
        english: productName.english.value,
        turkish: productName.turkish.value,
      },
      link: productLink.value,
      description: {
        persian: additionalInfo.persian.value,
        english: additionalInfo.english.value,
        turkish: additionalInfo.turkish.value,
      },
      width: +width.value,
      widthOfPrintingArea: +widthOfPrintingArea.value,
      picture: picture.file,
    };
  }
  if (all) {
    return {
      state: {
        productName,
        productLink,
        additionalInfo,
        width,
        widthOfPrintingArea,
        picture,
      },
      handeler: {
        setProductName,
        SetProductLink,
        setAdditionalInfo,
        SetWidth,
        SetWidthOfPrintingArea,
      },
    };
  }
  if (allSetState) {
    return {
      setProductName,
      SetProductLink,
      setAdditionalInfo,
      SetWidth,
      SetWidthOfPrintingArea,
      SetPicture,
    };
  }
  if (inputNameForHandle === "productName") {
    return productName_contoller(productName, setProductName);
  }
  if (inputNameForHandle === "productLink") {
    return {
      productLinkValue: productLink.value,
      validateErr: productLink.validateErr,
      handeler: handleSetProductLink,
    };
  }
  if (inputNameForHandle === "additionalInfo") {
    return additionalInfo_controller(additionalInfo, setAdditionalInfo);
  }
  if (inputNameForHandle === "widths") {
    return {
      state: {
        width,
        widthOfPrintingArea,
      },
      handler: {
        handleonChangeWidth: handleSetWidth,
        handleonChangWidthOfPrintingArea: handleSetWidthOfPrintingArea,
      },
    };
  }
  if (inputNameForHandle === "uploadImage") {
    return {
      state: {
        width,
        widthOfPrintingArea,
      },
      handler: {
        handleonChangeWidth: handleSetWidth,
        handleonChangWidthOfPrintingArea: handleSetWidthOfPrintingArea,
      },
    };
  }
  if (inputNameForHandle === "picture") {
    return {
      state: picture,
      handeler: handleSetPicture,
    };
  }
  return showproductAllLan();
}
