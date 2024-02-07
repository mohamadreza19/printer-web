import { createSlice, current } from "@reduxjs/toolkit";

const product_slice = createSlice({
  name: "product",
  initialState: {
    name: {
      english: "",
      persian: "",
      turkish: "",
      validateErr: null,
    },
    link: { value: "", validateErr: null },
    description: {
      english: "",
      persian: "",
      turkish: "",
      validaeErr: null,
    },
    width: { value: 0, validateErr: null },
    widthOfPrintingArea: { value: 0, validateErr: null },
    picture: {
      preview: "",
      file: "",
      validateErr: null,
    },
  },
  reducers: {
    addProduct(state, action) {
      const { type, value, lan } = action.payload;

      if (type === "ADD/NAME") {
        switch (lan) {
          case "persian":
            state.name.persian = value;
            break;
          case "turkish":
            state.name.turkish = value;
            break;
          case "english":
            state.name.english = value;
            break;
        }
      }
      if (type === "ADD/DESCRIPTION") {
        switch (lan) {
          case "persian":
            state.description.persian = value;
            break;
          case "turkish":
            state.description.turkish = value;
            break;
          case "english":
            state.description.english = value;
            break;
        }
      }
      if (type === "ADD/LINK") {
        state.link.value = value;
      }
      if (type === "ADD/WIDTH") {
        state.width.value = value;
      }
      if (type === "ADD/WIDTHOFPRINTINGAREA") {
        state.widthOfPrintingArea.value = value;
      }
      if (type === "ADD/PICTURE") {
        const { file, preview } = value;

        state.picture = {
          file,
          preview,
        };
      }
    },
    validate(state) {
      // const state = current(stateProxy);
      var urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
      if (!state.name.persian) {
        console.log("!state.name.persian");
        state.name.validateErr = "لطفا نام فارسی محصول را وارد کنید";
      }
      if (!state.name.english) {
        console.log("!state.name.english");
        state.name.validateErr = "لطفا نام انگلیسی محصول را وارد کنید";
      }
      if (!state.name.turkish) {
        console.log("!state.name.turkish");
        state.name.validateErr = "لطفا نام ترکی محصول را وارد کنید";
      }

      if (!urlPattern.test(state.link.value)) {
        state.link.validateErr = "لینک وارد شده نامعتبر میباشد";
      }
      if (!state.width.value) {
        state.width.validaeErr = "لطفا عرض محصول را وارد کنید";
      }
      if (!state.widthOfPrintingArea.value) {
        state.width.validateErr = "لطفا عرض محل چاپ را وارد کنید";
      }
    },
    clearErr(state, action) {
      const { type } = action.payload;
      if (type === "NAME") {
        state.name.validateErr = "";
      }
      if (type === "LINK") {
        state.link.validateErr = "";
      }
      if (type === "WIDTH") {
        state.width.validateErr = "";
      }
      if (type === "WIDTHOFPRITINGAREA") {
        state.widthOfPrintingArea.validateErr = "";
      }
      if (type === "PICTURE") {
        state.picture.validateErr = "";
      }
    },
  },
});

export const { addProduct, validate, clearErr } = product_slice.actions;
//
export const getProductName = (state) => state.product.name;
export const getProductLink = (state) => state.product.link;
export const getProductDescription = (state) => state.product.description;
export const getProductWidth = (state) => state.product.width;
export const getProductWidthOfPrintingArea = (state) =>
  state.product.widthOfPrintingArea;
export const getProductPicture = (state) => state.product.picture;
export const getProduct = (state) => {
  const product = { ...state.product };

  delete product.picture;
  return product;
};

export const getPageOneProductErrorValidate = (state) => {
  let erros = [];

  const nameValidateErr = state.product.name.validateErr;
  const linkValidateErr = state.product.link.validateErr;

  // if (!nameValidateErr === null && !linkValidateErr === null) {
  if (nameValidateErr) {
    erros.push("nameValidateErr");
  }
  if (linkValidateErr) {
    erros.push("linkValidateErr");
  }
  // } else {
  //   erros.push("ValidateErrors is inital");
  // }

  return erros;
};

//

export default product_slice.reducer;
