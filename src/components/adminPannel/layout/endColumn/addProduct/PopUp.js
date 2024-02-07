import React, { Component, useEffect, useState } from "react";
import styles from "./Product.module.css";
import { useProductContext } from "./product.context";
import Typography from "../../../../../styles/__ready/Typography";
import Buttons from "../../../../../styles/__ready/Buttons";
import Icons from "../../../../../styles/__ready/Icons";
import { AdminAddExcelFile_Mutation as send_excel_file } from "../../../../../reactQuery/admin/callPostService";
import { ButtonSpinnerLoading } from "../../../../../styles/__ready/common/ButtonSpinnerLoading";
import { Check } from "@mui/icons-material";

export default function PopUpContainer() {
  const { state, distapch } = useProductContext();
  const [status, setStatus] = useState("idle");

  const excel = send_excel_file();
  function toggleShowPopup() {
    distapch({
      type: "CHANGE_POPUP__OPEN_STATUS",
    });
  }
  function handleAddExelFile(e) {
    const file = e.target.files[0];
    const action = {
      type: "ADD_EXEL_FILE",
      payload: file,
    };
    distapch(action);
  }
  function handleDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const fileName = file.name;
    if (fileName.includes("xlsx") || fileName.includes("xls")) {
      const action = {
        type: "ADD_EXEL_FILE",
        payload: file,
      };
      distapch(action);
    }
  }
  function clearFile() {
    distapch({
      type: "CLEAR__EXELFILE",
    });
    const hideInput = document.getElementById("upload-excel-file");

    hideInput.remove();

    const newInput = document.createElement("input");

    newInput.type = "file";
    newInput.id = "upload-excel-file";
    newInput.style.display = "none";
    newInput.accept = ".xls,.xlsx";
    newInput.onchange = handleAddExelFile;

    document.body.appendChild(newInput);
  }

  function submit() {
    if (!excel.isLoading) excel.mutate({ file: state.exel_file.file });
  }

  useEffect(() => {
    if (excel.isLoading) {
      setStatus("loading");
    }
    if (excel.isSuccess) {
      setStatus("success");
      setTimeout(() => setStatus("idle"), [1500]);
    }
  }, [excel.isSuccess, excel.isLoading]);

  if (state.is_popup_open)
    return (
      <div
        className={styles["pop-up-container"]}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <header className="d-flex">
          <CloseBtn onClick={toggleShowPopup} />
          <Typography.H5>افزودن محصول با فایل اکسل</Typography.H5>
        </header>
        <section className={styles["pop-up-section-1"]}>
          <Typography.H9 className={styles["text-limit-width"]}>
            لطفا اطلاعات محصول خود را با توجه به این فایل راهنما وارد کرده و در
            انتها فایل خود را بارگذاری کنید.
          </Typography.H9>
          <DownloadBtn />
        </section>
        <UploadArea exelFile={state.exel_file.file} clearFile={clearFile} />

        <Buttons.Contained
          onClick={submit}
          className={styles["pop-up-submit"]}
          disabled={!state.exel_file.file}
        >
          {status === "loading" ? <ButtonSpinnerLoading /> : null}
          {status === "success" ? <Check color="white" /> : null}
          {status === "idle" ? (
            <Typography.H6> تایید اطلاعات</Typography.H6>
          ) : null}
        </Buttons.Contained>
        <input
          id="upload-excel-file"
          type="file"
          className="d-none"
          accept=".xls,.xlsx"
          onChange={handleAddExelFile}
        />
      </div>
    );
}

const CloseBtn = (props) => {
  return (
    <button {...props} className={styles["pop-up-close-btn"]}>
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1.24663 0.964117C0.994339 0.711831 0.585301 0.711831 0.333014 0.964117C0.0807271 1.2164 0.0807271 1.62544 0.333014 1.87773L6.23038 7.77509L0.333396 13.6721C0.0811083 13.9244 0.0811083 14.3334 0.333396 14.5857C0.585683 14.838 0.994721 14.838 1.24701 14.5857L7.144 8.6887L13.041 14.5857C13.2933 14.838 13.7023 14.838 13.9546 14.5857C14.2069 14.3334 14.2069 13.9244 13.9546 13.6721L8.05761 7.77509L13.955 1.87773C14.2073 1.62544 14.2073 1.2164 13.955 0.964117C13.7027 0.711831 13.2937 0.711831 13.0414 0.964117L7.144 6.86148L1.24663 0.964117Z"
          fill="#454545"
        />
      </svg>
    </button>
  );
};
const DownloadBtn = () => {
  return (
    <Buttons.Outlined
      onClick={downloadTemplateFile}
      className={styles["limit-width-btn"]}
    >
      <div
        style={{
          width: "26px",
          height: "22px",
        }}
      >
        <Icons.Download />
      </div>
      <Typography.H9 className={styles["text-limit-width"]}>
        دانلود فایل راهنما
      </Typography.H9>
    </Buttons.Outlined>
  );
};
const UploadArea = ({ exelFile, clearFile }) => {
  function handle_open_hidden_input() {
    document.getElementById("upload-excel-file").click();
  }
  const File = () => {
    return (
      <div className="px-3 position-absolute">
        <span
          onClick={clearFile}
          className={styles["pop-up-delete-file-icon"] + " cur-pointer"}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.24663 0.964117C0.994339 0.711831 0.585301 0.711831 0.333014 0.964117C0.0807271 1.2164 0.0807271 1.62544 0.333014 1.87773L6.23038 7.77509L0.333396 13.6721C0.0811083 13.9244 0.0811083 14.3334 0.333396 14.5857C0.585683 14.838 0.994721 14.838 1.24701 14.5857L7.144 8.6887L13.041 14.5857C13.2933 14.838 13.7023 14.838 13.9546 14.5857C14.2069 14.3334 14.2069 13.9244 13.9546 13.6721L8.05761 7.77509L13.955 1.87773C14.2073 1.62544 14.2073 1.2164 13.955 0.964117C13.7027 0.711831 13.2937 0.711831 13.0414 0.964117L7.144 6.86148L1.24663 0.964117Z"
              fill="#454545"
            />
          </svg>
        </span>
        <svg
          height="56"
          viewBox="0 0 20 20"
          width="56"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m15.5336935 1.36078656-1.2245001-1.36078656h-9.64754479c-.69577602 0-.96419839.51624065-.96419839.91894088v3.63096407h1.35277125v-2.89759304c0-.15466882.12950495-.28399685.2799043-.28399685h6.90257343c.1521674 0 .2280283.02704571.2280283.15119677v4.82023752h4.9136085c.1930933 0 .267854.09935624.267854.24674856v11.76863999c0 .2466993-.0994251.2839969-.2498244.2839969h-12.06223983c-.15171156 0-.2799043-.1320294-.2799043-.2839969v-1.075385h-1.34436952v1.6948983c-.01754838.599425.30244277 1.0253488.95579666 1.0253488h13.39914779c.699952 0 .9392036-.507105.9392036-.968947v-12.58708742-1.2572951l-.3495043-.37946981zm-1.6975669.15872527.3864907.43401545 2.5961264 2.85367339.1430237.17283806h-2.652574c-.2003171 0-.3270546-.03306996-.3802125-.09920987-.0531578-.06613992-.0841093-.170658-.0928543-.31355425zm-1.0909716 9.14787687h4.5777173v1.333414h-4.5777173zm0-2.66685359h4.5777173v1.33341395h-4.5777173zm0 5.33370719h4.5777173v1.333414h-4.5777173zm-11.745155-7.7085115v10.6673887h10.4647417v-10.6673887zm5.23301435 6.2044011-.64091322.9773823h.64091322v1.1921231h-3.21748634l2.33595938-3.5082705-2.0691267-3.15753866h1.72777568l1.22421543 1.83613905 1.22290321-1.83613905h1.72643824l-2.07175112 3.15622656 2.33727159 3.5095826h-1.79315902z"
            fill="#555"
          />
        </svg>
        <section>{exelFile.name}</section>
      </div>
    );
  };
  return (
    <section className={styles["pop-up-section-2"]}>
      {exelFile ? (
        <File />
      ) : (
        <div className={styles["pop-up-section-2-upload-area"]}>
          <span onClick={handle_open_hidden_input}>
            <Icons.Download width="44" height="44" fill="#CBCBCB" />
          </span>
          <Typography.H7>
            فایل خود را بارگذاری کنید و یا در این مکان بکشید (فایل xlsx)
          </Typography.H7>
        </div>
      )}
    </section>
  );
};

function downloadTemplateFile() {
  const a = document.createElement("a");

  a.href = "/file/product-template.xlsx";
  a.click();
}
