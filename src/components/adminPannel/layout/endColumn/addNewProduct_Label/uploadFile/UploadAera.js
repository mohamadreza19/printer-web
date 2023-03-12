import ProgressBar from "@ramonak/react-progress-bar";

import Icons from "../../../../../../styles/__ready/Icons";
import Typography from "../../../../../../styles/__ready/Typography";

import { FileUploader } from "react-drag-drop-files";
import { useState } from "react";
import { useDynamicCssClass } from "../../../../../../recoil/readStore";
export default function () {
  const cssClass = useDynamicCssClass();
  const [files, setFiles] = useState({
    file: "",
    previewUrl: "",
  });
  const handleChange = (file) => {
    setFiles(file);
  };
  const File = () => {
    return !files.file ? (
      <div
        onClick={() => {
          document.getElementById("imgupload").click();
        }}
        className="height-190 d-flex justify-content-center align-item-center flex-column   "
      >
        <article className="upload-file-area border-r-20 border d-flex justify-content-center align-item-center">
          <Icons.UploadFile_Black />
        </article>
        <input
          type="file"
          id="imgupload"
          className="d-none"
          onChange={(e) => {
            e.preventDefault();

            const fetchedFile = e.target.files[0];
            const preview = URL.createObjectURL(fetchedFile);

            setFiles({
              file: fetchedFile,
              previewUrl: preview,
            });
          }}
        />
        <article className="d-flex mt-3">
          <Typography.H8>
            تصویر محصول را بارگذاری کنید یا در این مکان بیاندازید
          </Typography.H8>
        </article>
      </div>
    ) : (
      <div className="w-100 height-190 d-flex justify-content-start align-item-center px-4 ">
        <img
          className="upload-file-area-preview  img-fill"
          src={files.previewUrl}
        />
        <section className="position-relative">
          <span className="position-absolute cheched-box ">
            <Icons.ChekedBold />
          </span>
        </section>
        <section className={"w-100 " + cssClass.ms_2}>
          <span>
            <Typography.H7 language="en" className="font-400">
              {files.file.name}
            </Typography.H7>
          </span>
          <span className="">
            <Typography.H9 className="disabled_gray2" language="en">
              1.0mb / 1.2mb
            </Typography.H9>
          </span>
          <progress
            className="upload-file-area-progress-bar mt-2"
            dir="ltr"
            id="file"
            value="80"
            max="100"
          />
        </section>
      </div>
    );
  };

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const fetchedFile = event.dataTransfer.files[0];
    const preview = URL.createObjectURL(fetchedFile);

    setFiles({
      file: fetchedFile,
      previewUrl: preview,
    });
  }
  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="w-100 d-flex justify-content-center  mt-5 flex-column align-items-center border-dashed-gray border-r-20 "
    >
      <File />
    </div>
  );
}
