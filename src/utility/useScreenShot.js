import { createRef, useState } from "react";
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
  async function downloadScreen() {
    setAllowRemoveCustomLabelsBorderToScreen(true);

    try {
      const elementToSreenShot = document.querySelector("#test-screen");

      const canvas = await html2canvas(elementToSreenShot, {
        scale: 2,
      });

      const image = canvas.toDataURL("image/png", 1.0);
      setImageSate(image);

      const a = document.createElement("a");
      console.log({ image });
      a.href = image;
      // a.onclick((e) => {
      //   console.log({ e });
      // });

      a.addEventListener("", (e) => console.log(e));

      a.download = "img";
      uploadFile.mutateAsync({ file: image });
      // a.click();
    } catch (error) {}

    // setAllowRemoveCustomLabelsBorderToScreen(false);
  }
  return downloadScreen;
}
