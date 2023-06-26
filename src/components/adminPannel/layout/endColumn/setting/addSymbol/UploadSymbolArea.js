import { useEffect, useState } from "react";
import Icons from "../../../../../../styles/__ready/Icons";
import Typography from "../../../../../../styles/__ready/Typography";
import { AdminAddSymbol_Mutation } from "../../../../../../reactQuery/admin/callPostService";

function UploadSymbolArea() {
  const [file, setFile] = useState("");
  const upload = AdminAddSymbol_Mutation();

  useEffect(() => {
    const uploadFile = async () => {
      try {
        if (typeof file !== "string") await upload.mutateAsync({ file });

        setFile("");
        document.getElementById("upload-file").value = null;
      } catch {}
    };
    uploadFile();
  }, [typeof file]);
  function handleDragOver(event) {
    event.preventDefault();
  }
  function handleDrop(event) {
    event.preventDefault();
    const fetchedFile = event.dataTransfer.files[0];
    const preview = URL.createObjectURL(fetchedFile);
    const size = fetchedFile.size;

    const testFormData = new FormData();
    testFormData.append("test", fetchedFile);
    if (size <= 1000000) {
      setFile(fetchedFile);
    }
  }
  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        width: "920px",
        height: "180px",
        border: "2px dashed #D9D9D9",
        borderRadius: "30px",
        rowGap: "29px",
      }}
      className="d-flex flex-column justify-content-center align-item-center"
    >
      <FileInput setFile={setFile} file={file} />
      <footer>
        <Typography.H7 className="font-300 disabled_gray2">
          آپلود فایل SVG حداکثر حجم 1 مگابایت
        </Typography.H7>
      </footer>
    </div>
  );
}

export default UploadSymbolArea;

const FileInput = ({ setFile, file }) => {
  function onChange(e) {
    const fetchedFile = e.target.files[0];
    const preview = URL.createObjectURL(fetchedFile);
    const size = fetchedFile.size;

    if (size <= 1000000) {
      setFile(fetchedFile);
    }
  }
  return (
    <>
      <span onClick={() => document.getElementById("upload-file").click()}>
        <Icons.Big_UploadFile />
      </span>
      <input
        id="upload-file"
        type="file"
        className="d-none"
        onChange={onChange}
        accept=".svg"
      />
    </>
  );
};
