import { useEffect } from "react";
import {
  AdminAddImage_Mutation,
  AdminAddProduct_Mutation,
} from "../../../../../reactQuery/admin/callPostService";
import Buttons from "../../../../../styles/__ready/Buttons";
import Icons from "../../../../../styles/__ready/Icons";
import Typography from "../../../../../styles/__ready/Typography";
import styles from "./Product.module.css";
import { useProductContext } from "./product.context";
import { AdminEditProduct_Mutation } from "../../../../../reactQuery/admin/callPutService";
import { useParams } from "react-router-dom";
const PageTwo = () => {
  const { state, distapch } = useProductContext();

  const product = state.productId
    ? AdminEditProduct_Mutation()
    : AdminAddProduct_Mutation();
  const addImage = AdminAddImage_Mutation();
  function handleAddFile(e) {
    const file = e.target.files[0];
    const action = {
      type: "ADD_FILE",
      payload: file,
    };
    distapch(action);
  }
  function handleDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const fileName = file.name;
    if (
      fileName.includes("jpeg") ||
      fileName.includes("png") ||
      fileName.includes("jpg")
    ) {
      const action = {
        type: "ADD_EXEL_FILE",
        payload: file,
      };
      distapch(action);
    }
  }
  function clearFile() {
    distapch({
      type: "CLEAR__FILE",
    });
    const hideInput = document.getElementById("upload-file");

    hideInput.remove();

    const newInput = document.createElement("input");

    newInput.type = "file";
    newInput.id = "upload-file";
    newInput.style.display = "none";
    newInput.accept = ".png,.jpeg,.jpg";
    newInput.onchange = handleAddFile;

    document.body.appendChild(newInput);
  }
  function handleChange_with(e) {
    const value = e.target.value;

    if (Number(value) > 0) {
      distapch({
        type: "CHANGE_WIDTH",
        payload: Number(value),
      });
    }
  }
  function handleChange_withOfPritingArea(e) {
    const value = e.target.value;
    if (Number(value) > 0) {
      distapch({
        type: "CHANGE_WIDTHOFPRITINGAREA",
        payload: Number(value),
      });
    }
  }
  function handleSubmit() {
    const {
      width,
      widthOfPrintingArea,
      file,
      name,
      link,
      description,
      productId,
    } = state;

    const mutatedName = { ...name };
    const mutatedDescription = { ...description };
    delete mutatedName.err;
    delete mutatedDescription.err;
    if (!file.file) {
      callErr("file", "لطفا تصویر محصول را وارد کنید");
    }

    const body = {
      width: width.value,
      widthOfPrintingArea: widthOfPrintingArea.value,
      name: mutatedName,
      link: link.value,
      description: mutatedDescription,
      productId: productId,
    };

    product.mutate(body);
    function callErr(target, value) {
      const action = {
        type: "ERROR",
        payload: {
          target,
          value,
        },
      };
      distapch(action);
    }
  }
  useEffect(() => {
    if (product.isSuccess) {
      const entityType = "product";
      const entityId = +product.data.id;

      //
      const picture = state.file.file;

      const payload = {
        entityType,
        entityId,
        file: picture,
      };
      addImage.mutate(payload);
      distapch({
        type: "NEXT_PAGE",
      });
    }
  }, [product?.isSuccess]);

  return (
    <div className={styles["page-2-container"]}>
      <article
        style={{
          columnGap: "15px",
        }}
        className="d-flex"
      >
        <section className={styles["input-box"] + " " + styles["input-small"]}>
          <label>
            <Typography.H8>عرض محصول</Typography.H8>
          </label>
          <input
            type="number"
            onChange={handleChange_with}
            value={state.width.value}
          />
          <div className={styles["err-message"]}>{state.width.err}</div>
          <span className={styles["measurement"]}>mn</span>
        </section>
        <section className={styles["input-box"] + " " + styles["input-small"]}>
          <label>
            <Typography.H8>عرض محل چاپ</Typography.H8>
          </label>
          <input
            type="number"
            onChange={handleChange_withOfPritingArea}
            value={state.widthOfPrintingArea.value}
          />
          <div className={styles["err-message"]}>
            {state.widthOfPrintingArea.err}
          </div>
          <span className={styles["measurement"]}>mn</span>
        </section>
      </article>
      <UploadArea
        file={state.file.file}
        clearFile={clearFile}
        onChange={handleAddFile}
        onDrop={handleDrop}
      />
      <input
        type="file"
        accept=".png,.jpeg,.jpg"
        className="d-none"
        id="upload-file"
        onChange={handleAddFile}
      />
      <div>
        <Buttons.Contained
          onClick={handleSubmit}
          className={styles["submit-btn"]}
        >
          ادامه
        </Buttons.Contained>
      </div>
    </div>
  );
};
const UploadArea = ({ file, clearFile, onChange, onDrop }) => {
  function handle_open_hidden_input() {
    document.getElementById("upload-file").click();
  }
  const File = () => {
    return (
      <div className="px-3 position-absolute d-flex align-item-center">
        <span
          style={{
            top: -10,
          }}
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
        <img
          className={styles["selected-file-preview"]}
          src={URL.createObjectURL(file)}
        />
        <section className="px-3">{file.name}</section>
      </div>
    );
  };
  return (
    <section
      style={{
        paddingTop: 10,
      }}
      className={styles["pop-up-section-2"]}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      {file ? (
        <File />
      ) : (
        <div className={styles["pop-up-section-2-upload-area"]}>
          <span onClick={handle_open_hidden_input}>
            <Icons.Download width="44" height="44" fill="#CBCBCB" />
          </span>
          <Typography.H7>
            تصویر محصول را بارگذاری کنید یا در این مکان بیاندازید
          </Typography.H7>
        </div>
      )}
    </section>
  );
};
export default PageTwo;
