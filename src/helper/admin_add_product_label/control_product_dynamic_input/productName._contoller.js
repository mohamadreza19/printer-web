//this function return all product info and handler needed
export default function (
  productName = {
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
  },
  setProductName = () => {}
) {
  function showCurrentValue() {
    for (let key in productName) {
      if (productName[key].isShow) return productName[key].value;
    }
  }
  function SwitchCurrentHandler() {
    if (productName.persian.isShow) return handleSetPersian;
    if (productName.english.isShow) return handleSetEnglish;
    if (productName.turkish.isShow) return handleSetTurkish;
  }
  function handleSetLanguage_Of_ProductName_Header_Card(
    header_Card_Language = "fa"
  ) {
    if (header_Card_Language == "fa") {
      const persian = {
        ...productName.persian,
        isShow: true,
      };
      const english = {
        ...productName.english,
        isShow: false,
      };
      const turkish = {
        ...productName.turkish,
        isShow: false,
      };
      setProductName((draft) => ({ ...draft, persian, english, turkish }));
    }
    if (header_Card_Language == "en") {
      // setProductName((draft) => {
      //   draft.persian.isShow = false;
      //   draft.english.isShow = true;
      //   draft.turkish.isShow = false;
      // });
      const persian = {
        ...productName.persian,
        isShow: false,
      };
      const english = {
        ...productName.english,
        isShow: true,
      };
      const turkish = {
        ...productName.turkish,
        isShow: false,
      };
      setProductName((draft) => ({ ...draft, persian, english, turkish }));
    }
    if (header_Card_Language == "tr") {
      // setProductName((draft) => {
      //   draft.persian.isShow = false;
      //   draft.english.isShow = false;
      //   draft.turkish.isShow = true;
      // });
      const persian = {
        ...productName.persian,
        isShow: false,
      };
      const english = {
        ...productName.english,
        isShow: false,
      };
      const turkish = {
        ...productName.turkish,
        isShow: true,
      };
      setProductName((draft) => ({ ...draft, persian, english, turkish }));
    }
  }

  function handleSetPersian(e) {
    console.log(e);
    setProductName((draft) => ({
      ...draft,
      persian: {
        ...draft.persian,
        value: e.target.value,
      },
      validateErr: "",
    }));
  }
  function handleSetEnglish(e) {
    setProductName((draft) => ({
      ...draft,
      english: {
        ...draft.english,
        value: e.target.value,
      },
      validateErr: "",
    }));
  }
  function handleSetTurkish(e) {
    setProductName((draft) => ({
      ...draft,
      turkish: {
        ...draft.turkish,
        value: e.target.value,
      },
      validateErr: "",
    }));
  }

  return {
    handleSetPersian,
    handleSetEnglish,
    handleSetTurkish,
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
    validateErr: productName.validateErr,
  };
}
