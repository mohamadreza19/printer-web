import { createRef, useEffect, useState } from "react";
import { useScreenshot, createFileName } from "use-react-screenshot";

import allowRemoveCustomLabelsBorderToScreen_store from "../recoil/userEditorStore/allowReplaceInputToDiv_store";
import html2canvas from "html2canvas";
import { useRecoilState } from "recoil";
import { AddImage_ToPrint_Local_Mutation } from "../reactQuery/user/callPostServices";
import allowReplaceInputToDiv_store from "../recoil/userEditorStore/allowReplaceInputToDiv_store";
import { useLocation } from "react-router-dom";
import { rails, railsWidth_store } from "../recoil/userEditorStore/cellsStore";
export default function (elementRef = "") {
  const [imageSate, setImageSate] = useState("");

  const [railsWidth, setRailsWidth] = useRecoilState(railsWidth_store);
  console.log({ railsWidth });
  const [allowReplaceInputToDiv, setAllowReplaceInputToDiv] = useRecoilState(
    allowReplaceInputToDiv_store
  );

  const uploadFile = AddImage_ToPrint_Local_Mutation();

  function downloadScreen() {
    setAllowReplaceInputToDiv(true);

    const rootElement = document.querySelector("#test-screen");

    const rootElementChildren = document.querySelectorAll(
      "#test-screen div main"
    );

    rootElementChildren.forEach((elemnet) => {
      elemnet.style.border = "";
    });

    async function doScreen() {
      try {
        const canvas = await html2canvas(rootElement, {
          allowTaint: true,
          scale: 2,
          height: 51,
          // foreignObjectRendering: true,
        });

        const image = canvas.toDataURL("image/png", 1.0);
        setImageSate(image);

        const a = document.createElement("a");

        const blobedImage = b64toBlob(image);

        uploadFile.mutateAsync({ file: blobedImage, width: railsWidth });

        rootElementChildren.forEach((elemnet) => {
          elemnet.style.border = "1px solid black";
        });
        setAllowReplaceInputToDiv(false);
        // a.href = image;
        // a.download = image;
        // a.click();
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
