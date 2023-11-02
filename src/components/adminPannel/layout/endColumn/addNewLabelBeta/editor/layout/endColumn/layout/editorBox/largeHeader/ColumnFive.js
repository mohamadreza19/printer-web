import { useRecoilState } from "recoil";
import {
  Barcode,
  Delete,
  Duplicate,
  OneTwo,
} from "../../../../../../../../../../../styles/__ready/EditorIcons";
import {
  ColumnFive_barcode,
  ColumnFive_delete,
  ColumnFive_duplicate,
  ColumnFive_qr,
} from "../../../../../../../../../../../recoil/userEditorStore/EditorHeaderActionButton";
import Typography from "../../../../../../../../../../../styles/__ready/Typography";

export default function ({
  deleteContent,
  copyContent,
  barcodeContent,
  qrcodeContent,
}) {
  const [deleteAction, setdeleteDeleteAction] =
    useRecoilState(ColumnFive_delete);
  const [duplicateAction, setDuplicateAction] =
    useRecoilState(ColumnFive_duplicate);
  const [isBacodeWant, setIsBacodeWant] = useRecoilState(ColumnFive_barcode);
  const [isQrWant, setisQrWant] = useRecoilState(ColumnFive_qr);
  const DeleteBox = () => {
    function onClick() {
      setdeleteDeleteAction(true);
    }
    return (
      <section
        onClick={onClick}
        className="editor-small-cell-box d-flex justify-content-center align-items-center ms-2"
      >
        <Delete />
      </section>
    );
  };
  const DuplicateBox = () => {
    function onClick() {
      setDuplicateAction(true);
    }
    return (
      <section
        onClick={onClick}
        className="editor-small-cell-box d-flex justify-content-center align-items-center  "
      >
        <Duplicate />
      </section>
    );
  };
  const BarcodeBox = () => {
    function onClick() {
      setIsBacodeWant(true);
    }
    return (
      <section
        onClick={onClick}
        className="editor-small-cell-box  d-flex justify-content-center align-items-center"
      >
        <OneTwo />
      </section>
    );
  };
  const QrcodeBox = () => {
    function onClick() {
      setisQrWant(true);
    }
    return (
      <section
        onClick={onClick}
        className="editor-small-cell-box  d-flex justify-content-center align-items-center"
      >
        <Barcode />
      </section>
    );
  };
  return (
    <article className="">
      <header className="d-flex justify-content-between align-items-center mb-2 ">
        <section
          style={{
            width: "108px",
          }}
          className="d-flex justify-content-end align-items-center"
        >
          <Typography.H9_5>{deleteContent}</Typography.H9_5>
          <DeleteBox />
        </section>
        <section
          style={{
            width: "144px",
          }}
          className="d-flex justify-content-end align-items-center"
        >
          <Typography.H9_5 className="me-2">{copyContent}</Typography.H9_5>
          <DuplicateBox />
        </section>
      </header>
      <footer className="d-flex justify-content-end align-items-center">
        <section
          style={{
            width: "108px",
          }}
          className="d-flex justify-content-end align-items-center "
        >
          <Typography.H9_5 className="me-2">{barcodeContent}</Typography.H9_5>
          <BarcodeBox />
        </section>
        <section
          style={{
            width: "144px",
          }}
          className="d-flex justify-content-end align-items-center"
        >
          <Typography.H9_5 className="me-2">{qrcodeContent}</Typography.H9_5>
          <QrcodeBox />
        </section>
      </footer>
    </article>
  );
}
