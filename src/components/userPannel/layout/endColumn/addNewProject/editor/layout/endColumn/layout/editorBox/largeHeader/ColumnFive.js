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
import { useDispatch, useSelector } from "react-redux";
import { addEditEvent } from "../../../../../../../../../../../redux/project/edit_event_slice";
import useSelectedCell from "../../../../../../../../../../../redux/project/selectedCell";
import { getSelectedCell } from "../../../../../../../../../../../redux/project/selectedCell_slice";

export default function ({ content }) {
  const dispatch = useDispatch();
  const Cell = useSelector(getSelectedCell);
  const [deleteAction, setdeleteDeleteAction] =
    useRecoilState(ColumnFive_delete);
  const [duplicateAction, setDuplicateAction] =
    useRecoilState(ColumnFive_duplicate);
  const [isBacodeWant, setIsBacodeWant] = useRecoilState(ColumnFive_barcode);
  const [isQrWant, setisQrWant] = useRecoilState(ColumnFive_qr);

  function handleDelete() {
    dispatch(
      addEditEvent({
        itemId: Cell.frontId,
        type: "DELETECELL",
      })
    );
  }
  function handleDuplicate() {
    dispatch(
      addEditEvent({
        itemId: Cell.rootId,
        type: "DUPLICATECELL",
      })
    );
  }
  function handleBarcode() {
    dispatch(
      addEditEvent({
        itemId: Cell.frontId,
        type: "ISBACODE",
      })
    );
  }
  function handleQRcode() {
    dispatch(
      addEditEvent({
        itemId: Cell.frontId,
        type: "QRCODE",
      })
    );
  }
  const DeleteBox = () => {
    return (
      <section
        onClick={handleDelete}
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
    return (
      <section
        onClick={handleDuplicate}
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
    return (
      <section
        onClick={handleBarcode}
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
    return (
      <section
        onClick={handleQRcode}
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
