export default function (
  additionalInfo = {
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
  },
  setAdditionalInfo = () => {}
) {
  function showCurrent_AdditionalInfo_Value() {
    for (let key in additionalInfo) {
      if (additionalInfo[key].isShow) return additionalInfo[key].value;
    }
  }
  function SwitchCurrent_AdditionalInfo_Handler() {
    if (additionalInfo.persian.isShow) return handleSetAdditionalInfo_persian;
    if (additionalInfo.english.isShow) return handleSetAdditionalInfo_English;
    if (additionalInfo.turkish.isShow) return handleSetAdditionalInfo_Turkish;
  }
  //
  function handleSetAdditionalInfo_persian(e) {
    setAdditionalInfo((draft) => ({
      ...draft,
      persian: {
        ...draft.persian,
        value: e.target.value,
      },
    }));
  }
  function handleSetAdditionalInfo_English(e) {
    setAdditionalInfo((draft) => ({
      ...draft,
      english: {
        ...draft.english,
        value: e.target.value,
      },
    }));
  }
  function handleSetAdditionalInfo_Turkish(e) {
    setAdditionalInfo((draft) => ({
      ...draft,
      turkish: {
        ...draft.turkish,
        value: e.target.value,
      },
    }));
  }
  // onClick handleler additionalInfo
  function handleSetLanguage_Of__AdditionalInfo_Header_Card(
    header_Card_Language = "fa"
  ) {
    if (header_Card_Language == "fa") {
      const persian = {
        ...additionalInfo.persian,
        isShow: true,
      };
      const english = {
        ...additionalInfo.english,
        isShow: false,
      };
      const turkish = {
        ...additionalInfo.turkish,
        isShow: false,
      };
      setAdditionalInfo((draft) => ({ ...draft, persian, english, turkish }));
    }
    if (header_Card_Language == "en") {
      const persian = {
        ...additionalInfo.persian,
        isShow: false,
      };
      const english = {
        ...additionalInfo.english,
        isShow: true,
      };
      const turkish = {
        ...additionalInfo.turkish,
        isShow: false,
      };
      setAdditionalInfo((draft) => ({ ...draft, persian, english, turkish }));
    }
    if (header_Card_Language == "tr") {
      const persian = {
        ...additionalInfo.persian,
        isShow: false,
      };
      const english = {
        ...additionalInfo.english,
        isShow: false,
      };
      const turkish = {
        ...additionalInfo.turkish,
        isShow: true,
      };
      setAdditionalInfo((draft) => ({ ...draft, persian, english, turkish }));
    }
  }

  return {
    handleSetAdditionalInfo_persian,
    handleSetAdditionalInfo_English,
    handleSetAdditionalInfo_Turkish,
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
  };
}
