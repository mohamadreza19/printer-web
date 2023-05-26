import { useImmer } from "use-immer";

import { useLanguage } from "../../../recoil/readStore";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRef } from "react";
import { useRecoilState } from "recoil";
import {
  height_store,
  labelName_store,
  picture_store,
  width_store,
} from "../../../recoil/store/admin_add_product_label/add_label_store";
export default function () {
  const language = useLanguage();
  const [labelName, setLabelName] = useRecoilState(labelName_store);
  const [width, setWidth] = useRecoilState(width_store);
  const [height, setHeight] = useRecoilState(height_store);
  const [picture, setPicture] = useRecoilState(picture_store);

  // setProductName

  function handleSetPersian(e) {
    console.log(e);
    setLabelName((draft) => ({
      ...draft,
      persian: {
        ...draft.persian,
        value: e.target.value,
      },
      validateErr: "",
    }));
  }
  function handleSetEnglish(e) {
    setLabelName((draft) => ({
      ...draft,
      english: {
        ...draft.english,
        value: e.target.value,
      },
      validateErr: "",
    }));
  }
  function handleSetTurkish(e) {
    setLabelName((draft) => ({
      ...draft,
      turkish: {
        ...draft.turkish,
        value: e.target.value,
      },
      validateErr: "",
    }));
  }
  // onClick productName
  function handleSetLanguage_Of_LabelName_Header_Card(
    header_Card_Language = "fa"
  ) {
    if (header_Card_Language == "fa") {
      setLabelName((draft) => ({
        ...draft,
        persian: {
          ...draft.persian,
          isShow: true,
        },
        english: {
          ...draft.english,
          isShow: false,
        },
        turkish: {
          ...draft.turkish,
          isShow: false,
        },
      }));
    }
    if (header_Card_Language == "en") {
      setLabelName((draft) => ({
        ...draft,
        persian: {
          ...draft.persian,
          isShow: false,
        },
        english: {
          ...draft.english,
          isShow: true,
        },
        turkish: {
          ...draft.turkish,
          isShow: false,
        },
      }));
    }
    if (header_Card_Language == "tr") {
      setLabelName((draft) => ({
        ...draft,
        persian: {
          ...draft.persian,
          isShow: false,
        },
        english: {
          ...draft.english,
          isShow: false,
        },
        turkish: {
          ...draft.turkish,
          isShow: true,
        },
      }));
    }
  }

  function showCurrentValue() {
    for (let key in labelName) {
      if (labelName[key].isShow) {
        return labelName[key].value;
      }
    }
  }
  function SwitchCurrentHandler() {
    if (labelName.persian.isShow) return handleSetPersian;
    if (labelName.english.isShow) return handleSetEnglish;
    if (labelName.turkish.isShow) return handleSetTurkish;
  }
  function showState() {
    let copy = { ...labelName };

    delete copy["validateErr"];

    for (let key in copy) {
      copy = { ...copy, [key]: copy[key].value };
    }

    return copy;
  }
  function clear() {
    setLabelName({
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
      validateErr: "",
    });
    setWidth({
      value: 0,
      validateErr: "",
    });
    setHeight({
      value: 0,
      validateErr: "",
    });
    setPicture({
      file: "",
      validateErr: "",
    });
  }
  return {
    labelName: {
      handleSetPersian,
      handleSetEnglish,
      handleSetTurkish,
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
      showState,
      validateErr: labelName.validateErr,
    },
    safeState: {
      width: +width.value,
      height: +height.value,
      picture: picture.file,
      name: {
        persian: labelName.persian.value,
        turkish: labelName.turkish.value,
        english: labelName.english.value,
      },
    },
    width,
    height,
    picture,
    handeler: {
      setWidth,
      setHeight,
      setPicture,
    },
    clear,
  };
}
