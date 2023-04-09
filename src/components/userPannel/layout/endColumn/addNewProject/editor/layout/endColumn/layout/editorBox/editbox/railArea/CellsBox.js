import CellBox from "./cellBox";
import { useSelection } from "../../../../../../../../../../../../recoil/readStore/editor/ReadSelectionActionButton";
import useCellReducer from "../../../../../../../../../../../../recoil/reducer/useCellReducer";
export default function ({ children, key, cell }) {
  const setCell = useCellReducer();
  const isSelection = useSelection();
  function HandleOnClick(id) {
    const payload = {
      id,
    };
    if (isSelection) return setCell(payload, "SELECT");
  }

  return (
    <div key={key} className="edit-rail d-flex">
      {cell.map((c, index) => {
        // const childrenHandleChangeInputValue =
        //   "children" in c
        //     ? c.children?.map((child) => {
        //         if (child.split == "none" && isSelection) {
        //           return function HandleChangeInputValueC(value) {
        //             const payload = {
        //               id: child.id,
        //               content: value,
        //             };
        //             setCell(payload, "SETCONTENT");
        //           };
        //         } else {
        //           return child.children.map((childInchild) => {
        //             if (childInchild.split == "none" && isSelection) {
        //               return function HandleChangeInputValueC(value) {
        //                 const payload = {
        //                   id: childInchild.id,
        //                   content: value,
        //                 };
        //                 setCell(payload, "SETCONTENT");
        //               };
        //             }
        //           });
        //         }
        //       })
        //     : function HandleChangeInputValue(value) {
        //         const payload = {
        //           id: c.id,
        //           content: value,
        //         };
        //         if (isSelection) return setCell(payload, "SETCONTENT");
        //       };

        return (
          <CellBox
            key={index}
            cell={c}
            cellWidth={74}
            HandleSelect={() => HandleOnClick(c.id)}
            // HandleChangeInputValue={HandleChangeInputValue}
            // childrenHandleChangeInputValue={childrenHandleChangeInputValue}
          />
        );
      })}
    </div>
  );
}
