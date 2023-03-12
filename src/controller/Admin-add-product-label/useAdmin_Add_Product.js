import { useImmer } from "use-immer";
import add_Product_validation from "../../validation/add_Product_validation";
import { useLanguage } from "../../recoil/readStore/";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRef } from "react";
export default function () {
  const language = useLanguage();
  const [productName, setProductName] = useImmer({
    persian: {
      value: "",
      isShow: true,
    },
    english: {
      value: "",
      isShow: false,
    },
    turkish: {
      value: "",
      isShow: false,
    },
  });
  const [additionalInfo, setAdditionalInfo] = useImmer({
    persian: {
      value: "",
      isShow: true,
    },
    english: {
      value: "",
      isShow: false,
    },
    turkish: {
      value: "",
      isShow: false,
    },
  });
  const [productLink, SetProductLink] = useImmer("");

  // SetProductLink
  function handleSetProductLink(e) {
    SetProductLink(e.target.value);
  }

  // setAdditionalInfo

  function handleSetAdditionalInfo_Persion(e) {
    setAdditionalInfo((draft) => {
      draft.persian.value = e.target.value;
    });
  }
  function handleSetAdditionalInfo_English(e) {
    setAdditionalInfo((draft) => {
      draft.english.value = e.target.value;
    });
  }
  function handleSetAdditionalInfo_Turkish(e) {
    setAdditionalInfo((draft) => {
      draft.turkish.value = e.target.value;
    });
  }
  // onClick handleler additionalInfo
  function handleSetLanguage_Of__AdditionalInfo_Header_Card(
    header_Card_Language = "fa"
  ) {
    console.log(header_Card_Language);
    if (header_Card_Language == "fa") {
      setAdditionalInfo((draft) => {
        draft.persian.isShow = true;
        draft.english.isShow = false;
        draft.turkish.isShow = false;
      });
    }
    if (header_Card_Language == "en") {
      setAdditionalInfo((draft) => {
        draft.persian.isShow = false;
        draft.english.isShow = true;
        draft.turkish.isShow = false;
      });
    }
    if (header_Card_Language == "tr") {
      setAdditionalInfo((draft) => {
        draft.persian.isShow = false;
        draft.english.isShow = false;
        draft.turkish.isShow = true;
      });
    }
  }

  // show current value and handeler additionalInfo
  function showCurrent_AdditionalInfo_Value() {
    if (additionalInfo.persian.isShow) return additionalInfo.persian.value;
    if (additionalInfo.english.isShow) return additionalInfo.english.value;
    if (additionalInfo.turkish.isShow) return additionalInfo.turkish.value;
  }
  function SwitchCurrent_AdditionalInfo_Handler() {
    if (additionalInfo.persian.isShow) return handleSetAdditionalInfo_Persion;
    if (additionalInfo.english.isShow) return handleSetAdditionalInfo_English;
    if (additionalInfo.turkish.isShow) return handleSetAdditionalInfo_Turkish;
  }
  // setProductName

  function handleSetPersion(e) {
    setProductName((draft) => {
      draft.persian.value = e.target.value;
    });
  }
  function handleSetEnglish(e) {
    setProductName((draft) => {
      draft.english.value = e.target.value;
    });
  }
  function handleSetTurkish(e) {
    setProductName((draft) => {
      draft.turkish.value = e.target.value;
    });
  }
  // onClick productName
  function handleSetLanguage_Of_ProductName_Header_Card(
    header_Card_Language = "fa"
  ) {
    if (header_Card_Language == "fa") {
      setProductName((draft) => {
        draft.persian.isShow = true;
        draft.english.isShow = false;
        draft.turkish.isShow = false;
      });
    }
    if (header_Card_Language == "en") {
      console.log("hi");
      setProductName((draft) => {
        draft.persian.isShow = false;
        draft.english.isShow = true;
        draft.turkish.isShow = false;
      });
    }
    if (header_Card_Language == "tr") {
      setProductName((draft) => {
        draft.persian.isShow = false;
        draft.english.isShow = false;
        draft.turkish.isShow = true;
      });
    }
  }

  //show current value and handeler productName
  function showCurrentValue() {
    if (productName.persian.isShow) return productName.persian.value;
    if (productName.english.isShow) return productName.english.value;
    if (productName.turkish.isShow) return productName.turkish.value;
  }
  function SwitchCurrentHandler() {
    if (productName.persian.isShow) return handleSetPersion;
    if (productName.english.isShow) return handleSetEnglish;
    if (productName.turkish.isShow) return handleSetTurkish;
  }

  const handleSubmit_FirstPage = async () => {
    console.log(productName.persian.value);
    try {
      const v = await add_Product_validation(
        {
          productName: {
            persian: productName.persian.value,
            english: productName.english.value,
            turkish: productName.turkish.value,
          },
          productLink: productLink,
        },
        language
      );
    } catch (error) {
      console.log(error.inner);
    }
  };

  return {
    produnctName: {
      productValue: showCurrentValue(),
      productHandler: SwitchCurrentHandler(),
      handleSetLanguage_Of_ProductName_Header_Card,
      headerCardCurrentBackground: {
        persian: productName.persian.isShow
          ? " bg_primary_g color-white "
          : " bg_primary_light color-primary ",
        english: productName.english.isShow
          ? " bg_primary_g color-white "
          : " bg_primary_light color-primary ",
        turkish: productName.turkish.isShow
          ? " bg_primary_g color-white "
          : " bg_primary_light color-primary ",
      },
    },
    additionalInfo: {
      additionalInfoValue: showCurrent_AdditionalInfo_Value(),
      additionalInfoHandeler: SwitchCurrent_AdditionalInfo_Handler(),
      handleSetLanguage_Of__AdditionalInfo_Header_Card,
      AdditionalInfo_headerCardCurrentBackground: {
        persian: additionalInfo.persian.isShow
          ? " bg_primary_g color-white "
          : " bg_primary_light color-primary ",
        english: additionalInfo.english.isShow
          ? " bg_primary_g color-white "
          : " bg_primary_light color-primary ",
        turkish: additionalInfo.turkish.isShow
          ? " bg_primary_g color-white "
          : " bg_primary_light color-primary ",
      },
    },
    productLink: {
      productLinkValue: productLink,
      handeler: handleSetProductLink,
    },
    handleSubmit_FirstPage,
  };
}
