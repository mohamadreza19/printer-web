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

export default function ({ content }) {
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
        className="editor-small-cell-box me-2 d-flex justify-content-center align-items-center"
      >
        <Delete />
        <div className="editor-small-info-cell-box">
          <Typography.H9>{content.delete}</Typography.H9>
        </div>
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
        className="editor-small-cell-box d-flex justify-content-center align-items-center"
      >
        <Duplicate />
        <div className="editor-small-info-cell-box">
          <Typography.H9>{content.copy}</Typography.H9>
        </div>
      </section>
    );
  };
  const BarcodeBox = () => {
    function onClick() {
      setisQrWant(false);
      setIsBacodeWant(true);
    }
    return (
      <section
        onClick={onClick}
        className="editor-small-cell-box me-2 d-flex justify-content-center align-items-center"
      >
        <OneTwo />
        <div className="editor-small-info-cell-box">
          <Typography.H9>{content.barcode}</Typography.H9>
        </div>
      </section>
    );
  };
  const QrcodeBox = () => {
    function onClick() {
      setIsBacodeWant(false);
      setisQrWant(true);
    }
    return (
      <section
        onClick={onClick}
        className="editor-small-cell-box  d-flex justify-content-center align-items-center"
      >
        <Barcode />
        <div className="editor-small-info-cell-box">
          <Typography.H9>{content.QRCode}</Typography.H9>
        </div>
      </section>
    );
  };
  return (
    <article className="">
      <header className="d-flex mb-2">
        <DeleteBox />
        <DuplicateBox />
      </header>
      <footer className="d-flex">
        <BarcodeBox />
        <QrcodeBox />
      </footer>
    </article>
  );
}
