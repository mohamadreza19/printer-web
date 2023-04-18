import CellSplitController from "./CellSplitController";
import Full from "./Full";
import SplitedColumn from "./SplitedColumn";

export default function ({
  children,
  description = "Miniator circle braker F21",
  cellWidth = 100,
  cell,

  HandleChangeInputValue,
  childrenHandleChangeInputValue,
}) {
  const Description = () => {
    return (
      <>
        <div className="edit-cell-caption-border"></div>
        <div className="edit-cell-caption-text-box">
          <p className="edit-cell-caption-text">{description}</p>
        </div>
      </>
    );
  };

  return (
    <section
      style={{
        width: `${100}px`,
        background: cell.isSelected && "#f36523",
        opacity: cell.isSelected && "0.6",
        fontFamily: `'${cell.content.style.fontFamily}', sans-serif`,
        fontWeight: cell.content.style.fontStyle == "bold" ? 600 : 400,
      }}
      className="h-100  edit-rail-child-border position-relative"
    >
      <Description />
      <CellSplitController
        cellForCheck={cell}
        HandleChangeInputValue={HandleChangeInputValue}
        childrenHandleChangeInputValue={childrenHandleChangeInputValue}
      />
    </section>
  );
}
