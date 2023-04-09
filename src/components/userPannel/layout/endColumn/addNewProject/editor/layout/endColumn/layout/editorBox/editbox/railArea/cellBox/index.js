import CellSplitController from "./CellSplitController";
import Full from "./Full";
import SplitedColumn from "./SplitedColumn";

export default function ({
  children,
  description = "Miniator circle braker F21",
  cellWidth = 71.23,
  cell,
  HandleSelect,
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
      onClick={HandleSelect}
      style={{
        width: `${cellWidth}px`,
        background: cell.isSelected && "#f36523",
        opacity: cell.isSelected && "0.6",
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
