import Icons from "../../../../../../../styles/__ready/Icons";
import Typography from "../../../../../../../styles/__ready/Typography";

import { useState } from "react";
import { useDynamicCssClass } from "../../../../../../../recoil/readStore";

import use_PictureInput_Controller from "../../../../../../../helper/admin_add_product_label/control_label_dynamic_input/";

import { Admin_User_Image } from "../../../../../../../reactQuery/common/callGetService";

import { useParams } from "react-router-dom";
import { useEffect } from "react";
export default function ({ onLoadedMeta = null, res }) {
  //onLoadedMeta= {
  //   loaded_mb: loaded_mb,
  //   total_mb: total_mb,
  //   percentage: percentage,
  // }

  const image = Admin_User_Image("admin");

  const meta = use_PictureInput_Controller();
  const cssClass = useDynamicCssClass();
  useEffect(() => {
    if (res.isSuccess) {
      const option = {
        fileId: res.data.pictures[0].id,
      };

      image.mutate(option);
    }
  }, [res.isSuccess]);
  useEffect(() => {
    if (image.isSuccess) {
      // const copyFile = {
      //   ...image.data,
      //   name: res.data.pictures[0].name,
      //   lastModifiedDate: res.data.pictures[0].updatedAt,
      // };
      const namedImg = { ...image.data, name: res.data.pictures[0].name };
      meta.handeler.setPicture({
        file: image.data,
        previewUrl: URL.createObjectURL(image.data),
      });
    }
  }, [image.isSuccess]);

  const IconBox = () => {
    return (
      <article
        style={{
          width: "136.8px",
        }}
        className="product-label-upload-file upload-file-area border-r-20 border d-flex justify-content-center align-item-center"
      >
        <Icons.UploadFile_Black />
      </article>
    );
  };
  const ProgressBar = () => {
    if (!onLoadedMeta) return null;
    return (
      <progress
        className="file-progress mt-2"
        dir="ltr"
        id="file-progress"
        value={onLoadedMeta.percentage}
        max="100"
      />
    );
  };
  const Onloaded = () => {
    if (!onLoadedMeta) return null;

    return (
      <span className="">
        <Typography.H9 className="disabled_gray2 " language="en">
          <span id="file-progress-loaded"> {onLoadedMeta.loaded_mb}mb </span>/
          <span id="file-progress-total">{onLoadedMeta.total_mb}mb </span>
        </Typography.H9>
      </span>
    );
  };
  const ImageUploadedTickIcon = () => {
    if (onLoadedMeta?.percentage === 100) {
      return (
        <section className="position-relative">
          <span className="position-absolute cheched-box ">
            <Icons.ChekedBold />
          </span>
        </section>
      );
    }
    return null;
  };
  const File_ = () => {
    return !meta.picture.file ? (
      <div
        onClick={() => {
          document.getElementById("imgupload").click();
        }}
        className="height-190 d-flex justify-content-center align-item-center flex-column   "
      >
        <IconBox />
        <input
          type="file"
          id="imgupload"
          className="d-none"
          onChange={(e) => {
            e.preventDefault();

            const fetchedFile = e.target.files[0];

            const preview = URL.createObjectURL(fetchedFile);

            meta.handeler.setPicture({
              file: fetchedFile,
              previewUrl: preview,
            });
          }}
          accept=".jpg,.png,.jpeg"
        />
        <article className="d-flex mt-3 ">
          <Typography.H8>
            تصویر محصول را بارگذاری کنید یا در این مکان بیاندازید
          </Typography.H8>
        </article>
      </div>
    ) : (
      <div className="w-100 height-190 d-flex justify-content-start align-item-center px-4 ">
        <img
          className="upload-file-area-preview  img-fill"
          src={meta.picture.previewUrl}
        />
        <ImageUploadedTickIcon />
        <section className={"w-100 " + cssClass.ms_2}>
          <span>
            <Typography.H7 language="en" className="font-400">
              {meta.picture.file.name}
            </Typography.H7>
          </span>
          <Onloaded />
          <ProgressBar />
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

    meta.handeler.setPicture({
      file: fetchedFile,
      previewUrl: preview,
    });
  }
  console.log(meta.picture.file);
  if (image.isSuccess)
    return (
      <main className="w-100 px-4">
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className=" d-flex justify-content-center mt-5 flex-column align-items-center border-dashed-gray border-r-20 "
        >
          <File_ />
          <Typography.H10 className="color_danger">
            {meta.picture.validateErr}
          </Typography.H10>
        </div>
      </main>
    );
}
