import { createRef, useEffect, useState } from "react";
import { useScreenshot, createFileName } from "use-react-screenshot";

import allowRemoveCustomLabelsBorderToScreen_store from "../recoil/userEditorStore/allowReplaceInputToDiv_store";
import html2canvas from "html2canvas";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  AddImage_ToPrint_Local_Mutation,
  Add_Print,
} from "../reactQuery/user/callPostServices";
import allowReplaceInputToDiv_store from "../recoil/userEditorStore/allowReplaceInputToDiv_store";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { rails, railsWidth_store } from "../recoil/userEditorStore/cellsStore";
//

export default function () {
  const [searchParams, setSearchParams] = useSearchParams();
  let { projectId } = useParams();
  const [allowClosePage, setAllowClosePage] = useState(false);
  const autoPrint = searchParams.get("autoPrint");
  const [railsWidth, setRailsWidth] = useRecoilState(railsWidth_store);
  const [allowReplaceInputToDiv, setAllowReplaceInputToDiv] = useRecoilState(
    allowReplaceInputToDiv_store
  );

  const uploadFile = AddImage_ToPrint_Local_Mutation();
  const addPrint = Add_Print();

  useEffect(() => {
    if (autoPrint === "true" && document.readyState == "complete") {
      screenShot();

      setTimeout(screenShot, 1000);
    }
    if (allowClosePage) {
      setAllowClosePage(false);
      window.close();
    }
  }, [autoPrint, document.readyState, allowClosePage]);
  return screenShot;

  async function screenShot(
    type = "PRODUCT",
    labelOption = {
      width: "",
      labelImg: "",
    }
    // product label // image
  ) {
    const PRODUCT = "PRODUCT";
    const LABEL = "LABEL";
    const IMAGE = "IMAGE";

    if (type === PRODUCT) {
      const rootElement = document.querySelector("#test-screen");

      const rootElementChildren = document.querySelectorAll(
        "#test-screen div main"
      );
      doThingOnChild(rootElementChildren, (element) => {
        element.style.borderWidth = "0";
      });

      const imgListener = new ImageListener({
        element: rootElement,
      });
      const imgDataURL = await imgListener.getImageDataURLFromCanvas();

      const blob = imgListener.getB64toBlob(imgDataURL);

      const generatedForm = new FormCreator({
        elemetWidth: railsWidth,
        blobedFile: blob,
      });

      const form = generatedForm.imageInputFormGenerator();

      form.submit();
      doThingOnChild(rootElementChildren, (element) => {
        element.style.borderWidth = "1px";
      });
    }
    if (type === LABEL) {
      const blob = labelOption.labelImg;
      const width = labelOption.width;

      // const imgListener = new ImageListener();
      // const url = await imgListener.readAsDataURL(blob);
      const handler = new FormCreator({
        elemetWidth: width,
        blobedFile: blob,
      });
      const form = handler.imageInputFormGenerator();

      form.submit();
    }
    if (type === IMAGE) {
      const rootElement = document.querySelector("#test-screen");

      const rootElementChildren = document.querySelectorAll(
        "#test-screen div main"
      );
      doThingOnChild(rootElementChildren, (element) => {
        element.style.borderWidth = "0";
      });

      const imgListener = new ImageListener({
        element: rootElement,
      });
      const imgDataURL = await imgListener.getImageDataURLFromCanvas();

      const a_tag = new FormCreator().AtagdownloadLinkGenerator(imgDataURL);
      a_tag.click();
      doThingOnChild(rootElementChildren, (element) => {
        element.style.borderWidth = "1px";
      });
    }
  }
}

//////
function b64toBlob(dataURI) {
  var byteString = atob(dataURI.split(",")[1]);
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);

  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: "image/jpeg" });
}
function doThingOnChild(children = [], callback = () => {}) {
  children.forEach((element) => {
    callback(element);
  });
}

const interfaceObj_ = {
  element: HTMLElement,
  ChildrenElement: HTMLCollection,
  // image saveFunction //form_submit(form submitFunction)
};

class ImageListener {
  constructor(option = interfaceObj_) {
    this.element = option.element;
  }
  async getImageDataURLFromCanvas() {
    const canvas = await html2canvas(this.element, {
      allowTaint: true,
      scale: 2,
      // height: 50,
      // foreignObjectRendering: true,
    });

    return canvas.toDataURL("image/png", 1.0);
  }

  getB64toBlob(imgDataURL) {
    return b64toBlob(imgDataURL);
  }
  async readAsDataURL(blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => resolve(reader.result);
    });
  }
}
const formCreator_interfaceObj = {
  elemetWidth: String,
  blobedFile: Blob,
};
class FormCreator {
  constructor(option = formCreator_interfaceObj) {
    this.width = option.elemetWidth;
    this.blob = option.blobedFile;
  }
  imageInputFormGenerator() {
    const form = document.createElement("form");

    const input = document.createElement("input");

    form.appendChild(input);

    document.body.appendChild(form);

    form.method = "post";
    form.enctype = "multipart/form-data";
    form.action = `http://localhost:8888?width=${this.width}`;
    form.target = "_blank";
    input.type = "file";
    input.name = "fileupload";

    const dataTransfer = new DataTransfer();
    const myFile = new File([this.blob], "fileupload.png");
    dataTransfer.items.add(myFile);
    input.files = dataTransfer.files;
    form.style.display = "none";
    return form;
  }
  AtagdownloadLinkGenerator(DataURL) {
    console.log({ DataURL });
    const a = document.createElement("a");
    a.href = DataURL;
    a.download = DataURL;
    return a;
  }
}
