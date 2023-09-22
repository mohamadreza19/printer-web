import { createRef, useEffect, useState } from "react";
import { useScreenshot, createFileName } from "use-react-screenshot";

import allowRemoveCustomLabelsBorderToScreen_store from "../recoil/userEditorStore/allowReplaceInputToDiv_store";
import html2canvas from "html2canvas";
import { useRecoilState } from "recoil";
import {
  AddImage_ToPrint_Local_Mutation,
  Add_Print,
} from "../reactQuery/user/callPostServices";
import allowReplaceInputToDiv_store from "../recoil/userEditorStore/allowReplaceInputToDiv_store";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { rails, railsWidth_store } from "../recoil/userEditorStore/cellsStore";

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
      // downloadScreen();
      setTimeout(downloadScreen, 1000);
    }
    if (allowClosePage) {
      setAllowClosePage(false);
      window.close();
    }
  }, [autoPrint, document.readyState, allowClosePage]);
  function downloadScreen() {
    setAllowReplaceInputToDiv(true);

    const rootElement = document.querySelector("#test-screen");

    const rootElementChildren = document.querySelectorAll(
      "#test-screen div main"
    );

    doThingOnChild(rootElementChildren, (element) => {
      // element.style.border = "";
    });

    async function doScreen() {
      try {
        const canvas = await html2canvas(rootElement, {
          allowTaint: true,
          scale: 2,

          // height: 50,
          // foreignObjectRendering: true,
        });

        const image = canvas.toDataURL("image/png", 1.0);

        const blobedImage = b64toBlob(image);

        const form = document.createElement("form");

        const input = document.createElement("input");

        form.appendChild(input);

        document.body.appendChild(form);
        // form.attributes.onsubmit.value = "return false";
        form.method = "post";
        form.enctype = "multipart/form-data";
        form.action = `http://localhost:8888?width=${railsWidth}`;
        form.target = "_blank";
        input.type = "file";
        input.name = "fileupload";

        const dataTransfer = new DataTransfer();
        const myFile = new File([blobedImage], "fileupload.png");
        dataTransfer.items.add(myFile);
        input.files = dataTransfer.files;

        doThingOnChild(rootElementChildren, (element) => {
          element.style.border = "1px solid black";
        });
        setAllowReplaceInputToDiv(false);
        const a = document.createElement("a");
        a.href = image;
        a.download = image;
        // a.click();
        // window.open(
        //   `chrome://flags/#block-insecure-private-network-request`,
        //   "_blank"
        // );
        form.style.display = "none";
        form.addEventListener(
          "submit",
          addPrint.mutate({
            projectId,
          })
        );
        // d
        form.submit();

        // uploadFile.mutateAsync({ file: blobedImage, width: railsWidth });
        form.addEventListener("submit", () => {
          setAllowClosePage(true);
        });
      } catch (error) {
        console.log({ error });
        setAllowReplaceInputToDiv(false);
      }
    }

    setTimeout(doScreen, 200);
  }

  return downloadScreen;
}

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
