import { useRecoilState } from "recoil";
import {
  Barcode,
  Delete,
  Duplicate,
  OneTwo,
} from "../../../../../../../../../../../styles/__ready/EditorIcons";
import {
  ColumnFive_delete,
  ColumnFive_duplicate,
} from "../../../../../../../../../../../recoil/userEditorStore/EditorHeaderActionButton";

export default function () {
  const [deleteAction, setdeleteDeleteAction] =
    useRecoilState(ColumnFive_delete);
  const [duplicateAction, setDuplicateAction] =
    useRecoilState(ColumnFive_duplicate);
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
  return (
    <article className="">
      <header className="d-flex mb-2">
        <DeleteBox />
        <DuplicateBox />
      </header>
      <footer className="d-flex">
        <section className="editor-small-cell-box me-2 d-flex justify-content-center align-items-center">
          <OneTwo />
        </section>
        <section className="editor-small-cell-box  d-flex justify-content-center align-items-center">
          <Barcode />
        </section>
      </footer>
    </article>
  );
}
