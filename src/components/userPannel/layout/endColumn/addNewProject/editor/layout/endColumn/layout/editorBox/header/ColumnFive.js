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

export default function () {
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
        className="editor-small-cell-box me-2 d-flex justify-content-center align-items-center"
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
