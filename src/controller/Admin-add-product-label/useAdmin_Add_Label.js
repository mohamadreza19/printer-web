import { useImmer } from "use-immer";
import add_Product_validation from "../../validation/add_Product_validation";
import { useLanguage } from "../../recoil/readStore/";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRef } from "react";
export default function () {
  const language = useLanguage();
  const [labelName, setLabelName] = useImmer({
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

  // setProductName

  function handleSetPersion(e) {
    setLabelName((draft) => {
      draft.persian.value = e.target.value;
    });
  }
  function handleSetEnglish(e) {
    setLabelName((draft) => {
      draft.english.value = e.target.value;
    });
  }
  function handleSetTurkish(e) {
    setLabelName((draft) => {
      draft.turkish.value = e.target.value;
    });
  }
  // onClick productName
  function handleSetLanguage_Of_LabelName_Header_Card(
    header_Card_Language = "fa"
  ) {
    if (header_Card_Language == "fa") {
      setLabelName((draft) => {
        draft.persian.isShow = true;
        draft.english.isShow = false;
        draft.turkish.isShow = false;
      });
    }
    if (header_Card_Language == "en") {
      console.log("hi");
      setLabelName((draft) => {
        draft.persian.isShow = false;
        draft.english.isShow = true;
        draft.turkish.isShow = false;
      });
    }
    if (header_Card_Language == "tr") {
      setLabelName((draft) => {
        draft.persian.isShow = false;
        draft.english.isShow = false;
        draft.turkish.isShow = true;
      });
    }
  }

  //show current value and handeler productName
  function showCurrentValue() {
    if (labelName.persian.isShow) return labelName.persian.value;
    if (labelName.english.isShow) return labelName.english.value;
    if (labelName.turkish.isShow) return labelName.turkish.value;
  }
  function SwitchCurrentHandler() {
    if (labelName.persian.isShow) return handleSetPersion;
    if (labelName.english.isShow) return handleSetEnglish;
    if (labelName.turkish.isShow) return handleSetTurkish;
  }

  //   const handleSubmit_FirstPage = async () => {
  //     console.log(productName.persian.value);
  //     try {
  //       const v = await add_Product_validation(
  //         {
  //           productName: {
  //             persian: productName.persian.value,
  //             english: productName.english.value,
  //             turkish: productName.turkish.value,
  //           },
  //           productLink: productLink,
  //         },
  //         language
  //       );
  //     } catch (error) {
  //       console.log(error.inner);
  //     }
  //   };

  return {
    labelName: {
      labelValue: showCurrentValue(),
      labelHandler: SwitchCurrentHandler(),
      handleSetLanguage_Of_LabelName_Header_Card,
      headerCardCurrentBackground: {
        persian: labelName.persian.isShow
          ? " bg_primary_g color-white "
          : " bg_primary_light color-primary ",
        english: labelName.english.isShow
          ? " bg_primary_g color-white "
          : " bg_primary_light color-primary ",
        turkish: labelName.turkish.isShow
          ? " bg_primary_g color-white "
          : " bg_primary_light color-primary ",
      },
    },
  };
}
