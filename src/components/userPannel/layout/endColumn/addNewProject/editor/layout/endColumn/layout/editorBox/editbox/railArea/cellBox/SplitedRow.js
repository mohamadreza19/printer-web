import { Editor_Cell_Input } from "../../../../../../../../../../../../../styles/__ready/Textfields";
import CellSplitController from "./CellSplitController";

export default function ({
  children,
  HandleChangeInputValue = () => {},
  setCell = () => {},
  isSelected = false,
  childrenHandleChangeInputValue = [() => {}, () => {}],
}) {
  return (
    <main className="w-100 h-100 d-flex flex-column  ">
      {children.map((child, index) => {
        function HandleChangeInputValue(value) {
          const payload = {
            id: child.id,
            content: value,
          };
          setCell(payload, "SETCONTENT");
        }
        return (
          <div
            key={child + index}
            className={`w-100 h-50 d-flex justify-content-center align-items-center
          ${index > 0 ? "splitedColumn-border-left" : " "}
          `}
          >
            {child.split == "none" ? (
              <Editor_Cell_Input
                value={child.content || undefined}
                disabled={isSelected}
                // onChange={childrenHandleChangeInputValue[index]}
                onChange={HandleChangeInputValue}
              />
            ) : (
              <CellSplitController cellForCheck={child} />
            )}
          </div>
        );
      })}
    </main>
  );
}
