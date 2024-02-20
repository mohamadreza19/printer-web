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
import useSelectionReducer from "../recoil/reducer/editor/actionButtons/useSelectionReducer";
import { useDispatch } from "react-redux";
import { changeType } from "../redux/project/border_slice";
import { viewMode } from "../redux/project/edit_mode_slice";
//

export default function () {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const handleOnclickSelectionButton = useSelectionReducer();
  let { projectId } = useParams();
  const [allowClosePage, setAllowClosePage] = useState(false);
  const autoPrint = searchParams.get("autoPrint");
  const [railsWidth, setRailsWidth] = useRecoilState(railsWidth_store);
  const [allowReplaceInputToDiv, setAllowReplaceInputToDiv] = useRecoilState(
    allowReplaceInputToDiv_store
  );
  //
  const railDividers = document.getElementsByClassName("dashed-divider");
  const addRailBtns = document.getElementsByClassName("add-rail");
  const deleteRailBtns = document.getElementsByClassName("delete-rail");

  //

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
  function view_mode() {
    dispatch(viewMode());
  }
  async function screenShot(
    type = "PRODUCT",
    id = "",
    printRepetition = 1,
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
      dispatch(changeType("use"));
      view_mode();

      const rootElement = document.querySelector("#rails-box");
      forEach(addRailBtns, (item) => {
        item.style.display = "none";
      });
      forEach(railDividers, (item) => {
        item.style.display = "none";
      });
      forEach(deleteRailBtns, (item) => {
        item.style.display = "none";
      });

      const clonedRootElement = rootElement.cloneNode(true);

      clonedRootElement.classList.remove("rails-box-pt");

      document.body.appendChild(clonedRootElement);
      clonedRootElement.childNodes.forEach((child) => {
        child.style.border = "none";
      });
      clonedRootElement.style.padding = "0";
      const imgListener = new ImageListener({
        element: clonedRootElement,
      });
      const imgDataURL = await imgListener.getImageDataURLFromCanvas();

      const blob = imgListener.getB64toBlob(imgDataURL);

      const generatedForm = new FormCreator({
        elemetWidth: railsWidth,
        blobedFile: blob,
        printRepetition,
      });

      const form = generatedForm.imageInputFormGenerator();

      addPrint.mutate({
        projectId: Number(id),
      });

      form.submit();
      dispatch(changeType("none"));
      setTimeout(() => {
        document.body.removeChild(clonedRootElement);
      }, 10000);
      forEach(addRailBtns, (item) => {
        item.style.display = "block";
      });
      forEach(railDividers, (item) => {
        item.style.display = "block";
      });
      forEach(deleteRailBtns, (item) => {
        item.style.display = "block";
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
      addPrint.mutate({
        labelId: Number(id),
      });
      form.submit();
    }
    if (type === IMAGE) {
      dispatch(changeType("use"));
      view_mode();
      setTimeout(async () => {
        forEach(addRailBtns, (item) => {
          item.style.display = "none";
        });
        forEach(railDividers, (item) => {
          item.style.display = "none";
        });
        forEach(deleteRailBtns, (item) => {
          item.style.display = "none";
        });

        const rootElement = document.querySelector("#rails-box");
        const clonedRootElement = rootElement.cloneNode(true);

        clonedRootElement.classList.remove("rails-box-pt");

        document.body.appendChild(clonedRootElement);
        clonedRootElement.childNodes.forEach((child) => {
          child.style.border = "none";
        });
        clonedRootElement.style.padding = "0";

        const imgListener = new ImageListener({
          element: clonedRootElement,
        });
        const imgDataURL = await imgListener.getImageDataURLFromCanvas();

        const a_tag = new FormCreator().AtagdownloadLinkGenerator(imgDataURL);
        a_tag.click();
        dispatch(changeType("none"));

        document.body.removeChild(clonedRootElement);
        // handleShow_dashed_divider(true);
        forEach(addRailBtns, (item) => {
          item.style.display = "block";
        });
        forEach(railDividers, (item) => {
          item.style.display = "block";
        });
        forEach(deleteRailBtns, (item) => {
          item.style.display = "block";
        });
      }, 5000);
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
    });

    const url = canvas.toDataURL("image/png", 1.0);

    return url;
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
  printRepetition: Number,
};
class FormCreator {
  constructor(option = formCreator_interfaceObj) {
    this.width = option.elemetWidth;
    this.blob = option.blobedFile;
    this.printRepetition = option.printRepetition;
  }
  imageInputFormGenerator() {
    const form = document.createElement("form");

    const input = document.createElement("input");
    const input2 = document.createElement("input");

    form.appendChild(input);

    document.body.appendChild(form);

    form.method = "post";
    form.enctype = "multipart/form-data";
    form.action = `http://localhost:8888?width=${this.width}&quantity=${this.printRepetition} `;
    form.target = "_blank";
    input.type = "file";
    input2.value = "test";
    input2.name = "test";
    input.name = "fileupload";

    const dataTransfer = new DataTransfer();
    const myFile = new File([this.blob], "fileupload.png");
    dataTransfer.items.add(myFile);
    input.files = dataTransfer.files;
    form.style.display = "none";
    return form;
  }
  AtagdownloadLinkGenerator(DataURL) {
    // console.log({ DataURL });
    const a = document.createElement("a");
    a.href = DataURL;
    a.download = DataURL;
    return a;
  }
}

function handleShow_dashed_divider(show = false) {
  const dashed_dividers = document.getElementsByClassName("dashed-divider");

  // switch (show) {
  //   case true:
  //     dashed_dividers;
  //     break;

  //   default:
  //     break;
  // }

  // function maped(array = []) {
  for (let i = 0; i < dashed_dividers.length; i++) {
    if (show) {
      dashed_dividers[i].classList.remove("d-none");
      dashed_dividers[i].classList.add("d-block");
    } else {
      dashed_dividers[i].classList.remove("d-block");
      dashed_dividers[i].classList.add("d-none");
    }
  }
  // }
}
function forEach(items, callback) {
  for (let i = 0; i < items.length; i++) {
    callback(items[i]);
  }
}
