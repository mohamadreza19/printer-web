import { createRef, useEffect, useState } from "react";
import { useScreenshot, createFileName } from "use-react-screenshot";

import allowRemoveCustomLabelsBorderToScreen_store from "../recoil/userEditorStore/allowRemoveCustomLabelsBorderToScreen_store";
import html2canvas from "html2canvas";
import { useRecoilState } from "recoil";
import { AddImage_ToPrint_Local_Mutation } from "../reactQuery/user/callPostServices";
export default function (elementRef = "") {
  const [imageSate, setImageSate] = useState("");
  const [
    allowRemoveCustomLabelsBorderToScreen,
    setAllowRemoveCustomLabelsBorderToScreen,
  ] = useRecoilState(allowRemoveCustomLabelsBorderToScreen_store);
  const uploadFile = AddImage_ToPrint_Local_Mutation();
  useEffect(() => {}, [uploadFile]);
  async function downloadScreen() {
    // setAllowRemoveCustomLabelsBorderToScreen(true);

    try {
      if (!allowRemoveCustomLabelsBorderToScreen) {
        const rootElement = document.querySelector("#test-screen");

        // const childElement = document.querySelectorAll("#test-screen div main");
        // childElement.forEach((element) => {
        //   console.log(element.style);
        //   element.style.border = "";
        // });
        // console.log(elementToSreenShot);
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

        // uploadFile.mutateAsync({ file: blobedImage });

        a.href = image;
        a.download = image;
        a.click();
      }
    } catch (error) {
      console.log(error);
    }
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
