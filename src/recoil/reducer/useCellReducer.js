import { useRecoilState, useSetRecoilState } from "recoil";
import { rails, selectedCellForReadStyle } from "../userEditorStore/cellsStore";
import selectionAction from "../actions/editor/actionButton/selectionbuttons";
import cellAction from "../actions/editor/cell/cell";

import shortid from "shortid";

import {
  ColumnFour_redo,
  ColumnFour_undo,
} from "../userEditorStore/EditorHeaderActionButton";
import { useEffect } from "react";

export default function () {
  // const [state, setState] = useRecoilState(rails);
  const setSelectedCellForReadStyle = useSetRecoilState(
    selectedCellForReadStyle
  );
  const [state, setState] = useRecoilState(rails);
  const setCanUseUndo = useSetRecoilState(ColumnFour_undo);
  const setCanUseRedo = useSetRecoilState(ColumnFour_redo);
  const { future, past, present } = state;

  const isUndoPossible = past && past.length > 0;
  const isRedoPossible = future && future.length > 0;

  useEffect(() => {
    if (isUndoPossible) {
      setCanUseUndo(true);
    } else {
      setCanUseUndo(false);
    }
    if (isRedoPossible) {
      setCanUseRedo(true);
    } else {
      setCanUseRedo(false);
    }
  }, [isUndoPossible, isRedoPossible]);

  const HistoryChanger = (newState) => {
    const { type = "", value = "" } = newState;
    if (type === "SET_HISTORY") {
      setState(() => {
        return {
          past: [...past, present],
          present: value,
          future: [],
        };
      });
    }
    if (type === "UNDO") {
      setState(() => {
        return {
          past: past.slice(0, past.length - 1),
          present: past[past.length - 1],
          future: [present, ...future],
        };
      });
    }

    if (type === "REDO") {
      setState(() => {
        return {
          past: [...past, present],
          present: future[0],
          future: future.slice(1),
        };
      });
    }
  };

  function setCell(
    payload = {
      cellId: "",
      parentId: "",
      railId: "",
      structure: {
        value: "",
        style: {
          fontSize: "14",
          angle: "14",
          textAlign: "center",
          fontStyle: "bold",
        },
      },
    },
    action
  ) {
    if (!action) throw new Error("need action");

    if (action == selectionAction.SELECT) {
      //requirement
      // payload.frontId

      function cellSplitController(cell) {
        function fullCellChecker(cellForCheck) {
          if (payload.cellId == cellForCheck.frontId) {
            const a = { ...cellForCheck, isSelected: true };

            setSelectedCellForReadStyle(a.structure?.style || null);
            return a;
          }
          return { ...cellForCheck, isSelected: false };
        }
        function verticalCellChecker(cellForCheck) {
          const mapedChildren = cellForCheck.children.map((child) => {
            if (child.split == "none") {
              return fullCellChecker(child);
            }
            if (child.split == "vertical") {
              return verticalCellChecker(child);
            }
            if (child.split == "horizontal") {
              return horizontalCellChecker(child);
            }
            return child;
          });

          return { ...cellForCheck, children: mapedChildren };
        }
        function horizontalCellChecker(cellForCheck) {
          const mapedChildren = cellForCheck.children.map((child) => {
            if (child.split == "none") {
              return fullCellChecker(child);
            }
            if (child.split == "vertical") {
              return verticalCellChecker(child);
            }
            if (child.split == "horizontal") {
              return horizontalCellChecker(child);
            }
            return child;
          });

          return { ...cellForCheck, children: mapedChildren };
        }

        if (cell.split == "none") {
          return fullCellChecker(cell);
        }
        if (cell.split == "vertical") {
          return verticalCellChecker(cell);
        }
        if (cell.split == "horizontal") {
          return horizontalCellChecker(cell);
        }
      }
      function railController(rail) {
        if (rail.frontId == payload.railId) {
          const newCells = rail.customLabels.map((item) => {
            return cellSplitController(item);
          });
          return { ...rail, customLabels: newCells };
        } else {
          const newCells = rail.customLabels.map((item) => {
            return cellSplitController(item);
          });
          return { ...rail, customLabels: newCells };
        }
      }

      const newRails = state.present.map((rail) => {
        return railController(rail);
      });

      return setState((draft) => {
        return {
          ...draft,
          present: newRails,
        };
      });
    }
    if (action == selectionAction.VIEW) {
      function cellSplitController(cell) {
        function fullCellChecker(cellForCheck) {
          const a = { ...cellForCheck, isSelected: false };
          return a;
        }
        function verticalCellChecker(cellForCheck) {
          const mapedChildren = cellForCheck.children.map((child) => {
            if (child.split == "none") {
              return fullCellChecker(child);
            }
            if (child.split == "vertical") {
              return verticalCellChecker(child);
            }
            if (child.split == "horizontal") {
              return horizontalCellChecker(child);
            }
            return child;
          });

          return { ...cellForCheck, children: mapedChildren };
        }
        function horizontalCellChecker(cellForCheck) {
          const mapedChildren = cellForCheck.children.map((child) => {
            if (child.split == "none") {
              return fullCellChecker(child);
            }
            if (child.split == "vertical") {
              return verticalCellChecker(child);
            }
            if (child.split == "horizontal") {
              return horizontalCellChecker(child);
            }
            return child;
          });

          return { ...cellForCheck, children: mapedChildren };
        }

        if (cell.split == "none") {
          return fullCellChecker(cell);
        }
        if (cell.split == "vertical") {
          return verticalCellChecker(cell);
        }
        if (cell.split == "horizontal") {
          return horizontalCellChecker(cell);
        }
      }

      const newRails = present.map((rail) => {
        const newCells = rail.customLabels.map((c) => cellSplitController(c));

        return { ...rail, customLabels: newCells };
      });

      return setState((draft) => {
        return {
          ...draft,
          present: newRails,
        };
      });
    }
    if (action == cellAction.NEWSETCONTENT) {
      function cellSplitController(cell) {
        function fullCellChecker(cellForcheck) {
          if (cellForcheck.frontId == payload.cellId) {
            //  add new structure

            let newContent = {
              values: "",
              style: "",
            };

            newContent = {
              values: payload.structure.value,
              style: cellForcheck.structure.style,
            };

            const a = { ...cellForcheck, structure: newContent };

            return a;
          }
          return cellForcheck;
        }
        function verticalCellChecker(cellForcheck) {
          const newChilren = cellForcheck.children.map((child) => {
            if (child.split == "none") {
              return fullCellChecker(child);
            }
            if (child.split == "vertical") {
              return { ...child, children: verticalCellChecker(child) };
            }
            if (child.split == "horizontal") {
              return { ...child, children: verticalCellChecker(child) };
            }
            return child;
          });
          return newChilren;
        }

        if (cell.split == "none") {
          return fullCellChecker(cell);
        }
        if (cell.split == "vertical") {
          return {
            ...cell,
            children: verticalCellChecker(cell),
          };
        }
        if (cell.split == "horizontal") {
          return {
            ...cell,
            children: verticalCellChecker(cell),
          };
        }
        return cell;
      }
      const findedRail = state.present.find(
        (rail) => rail.frontId === payload.railId
      );

      console.log(state.present);
      const newCells = findedRail.customLabels.map((item) => {
        return cellSplitController(item);
      });
      const newRails = present.map((rail) => {
        if (rail.frontId == payload.railId) {
          return { ...rail, customLabels: newCells };
        }
        return rail;
      });

      const NewHistory = {
        type: "SET_HISTORY",
        value: newRails,
      };
      return HistoryChanger(NewHistory);
    }
    if (action == cellAction.DELETECONTENT) {
      function cellSplitController(cell) {
        function fullCellChecker(cellForcheck) {
          if (cellForcheck.frontId == payload.cellId) {
            const copy = [...cellForcheck.contents];
            copy.pop();
            return { ...cellForcheck, contents: copy };
          }

          return cellForcheck;
        }
        function verticalCellChecker(cellForcheck) {
          const newChilren = cellForcheck.children.map((child) => {
            if (child.split == "none") {
              return fullCellChecker(child);
            }
            if (child.split == "vertical") {
              return verticalCellChecker(child);
            }
            if (child.split == "horizontal") {
              return horizontalCellChecker(child);
            }
            return child;
          });
          return { ...cellForcheck, children: newChilren };
        }
        function horizontalCellChecker(cellForcheck) {
          console.log(cellForcheck);
          const newChilren = cellForcheck.children.map((child) => {
            if (child.split == "none") {
              return fullCellChecker(child);
            }
            if (child.split == "vertical") {
              return verticalCellChecker(child);
            }
            if (child.split == "horizontal") {
              return horizontalCellChecker(child);
            }
            return child;
          });
          return { ...cellForcheck, children: newChilren };
        }

        if (cell.split == "none") {
          return fullCellChecker(cell);
        }
        if (cell.split == "vertical") {
          return verticalCellChecker(cell);
        }
        if (cell.split == "horizontal") {
          return horizontalCellChecker(cell);
        }
        return cell;
      }
      const findedRail = present.find(
        (rail) => rail.frontId === payload.railId
      );

      const newCells = findedRail.customLabels.map((item) => {
        return cellSplitController(item);
      });
      const newRails = present.map((rail) => {
        if (rail.frontId == payload.railId) {
          return { ...rail, customLabels: newCells };
        }
        return rail;
      });

      const NewHistory = {
        type: "SET_HISTORY",
        value: newRails,
      };
      return HistoryChanger(NewHistory);
    }
    if (action == cellAction.SPLITCOLUMN) {
      //requirement
      //action
      //payload.cellId
      function splitColumnController(cellForSplit) {
        function fullCellChecker(cellforSplit) {
          if (cellforSplit.frontId == payload.cellId) {
            const a = {
              ...cellforSplit,
              structure: {
                values: " ",
                style: cellforSplit.structure.style,
              },
              split: "vertical",
              children: [
                {
                  // parentId: newParentId,
                  parentId: cellforSplit.frontId,
                  frontId: shortid.generate(),
                  split: "none",
                  structure: {
                    values: " ",
                    style: cellforSplit.structure?.style,
                  },

                  isSelected: false,
                },
                {
                  // parentId: newParentId,
                  parentId: cellforSplit.frontId,
                  frontId: shortid.generate(),
                  split: "none",
                  structure: {
                    values: null,
                    style: cellforSplit.structure?.style,
                  },

                  isSelected: false,
                },
              ],
            };

            return a;
          }
          return cellforSplit;
        }

        function verticalCellChecker(cellforSplit) {
          const mapedChildren = cellforSplit.children.map((child) => {
            if (child.split == "none") {
              return fullCellChecker(child);
            }
            if (child.split == "vertical") {
              return { ...child, children: verticalCellChecker(child) };
            }
            if (child.split == "horizontal") {
              return { ...child, children: verticalCellChecker(child) };
            }
            return child;
          });

          // return { ...cellForSplit, children: mapedChildren };
          return mapedChildren;
        }
        if (cellForSplit.split == "none") {
          return fullCellChecker(cellForSplit);
        }
        if (cellForSplit.split == "vertical") {
          return {
            ...cellForSplit,
            children: verticalCellChecker(cellForSplit),
          };
        }
        if (cellForSplit.split == "horizontal") {
          return {
            ...cellForSplit,
            children: verticalCellChecker(cellForSplit),
          };
        }

        return cellForSplit;
      }

      const findedRail = present.find(
        (rail) => rail.frontId === payload.railId
      );

      const newCells = findedRail.customLabels.map((item) => {
        return splitColumnController(item);
      });
      const newRails = present.map((rail) => {
        if (rail.frontId == payload.railId) {
          return { ...rail, customLabels: newCells };
        }
        return rail;
      });

      const NewHistory = {
        type: "SET_HISTORY",
        value: newRails,
      };
      return HistoryChanger(NewHistory);
    }
    if (action == cellAction.SPLITROW) {
      //requirement
      //action
      //payload.cellId
      function splitRowController(cellForSplit) {
        function fullCellChecker(cellforSplit) {
          if (cellforSplit.frontId == payload.cellId) {
            const a = {
              ...cellforSplit,
              structure: {
                values: null,
                style: cellforSplit.structure?.style,
              },
              split: "horizontal",
              children: [
                {
                  // parentId: newParentId,
                  parentId: cellforSplit.frontId,
                  frontId: shortid.generate(),
                  split: "none",
                  structure: {
                    values: null,
                    style: cellforSplit.structure?.style,
                  },

                  isSelected: false,
                },
                {
                  // parentId: newParentId,
                  parentId: cellforSplit.frontId,
                  frontId: shortid.generate(),
                  split: "none",
                  structure: {
                    values: null,
                    style: cellforSplit.structure?.style,
                  },

                  isSelected: false,
                },
              ],
            };

            return a;
          }
          return cellforSplit;
        }
        function horizontalCellChecker(cellforSplit) {
          const mapedChildren = cellforSplit.children.map((child) => {
            if (child.split == "none") {
              return fullCellChecker(child);
            }
            if (child.split == "vertical") {
              return { ...child, children: horizontalCellChecker(child) };
            }
            if (child.split == "horizontal") {
              return { ...child, children: horizontalCellChecker(child) };
            }
            return child;
          });

          // return { ...cellForSplit, children: mapedChildren };
          return mapedChildren;
        }

        if (cellForSplit.split == "none") {
          return fullCellChecker(cellForSplit);
        }
        if (cellForSplit.split == "vertical") {
          return {
            ...cellForSplit,
            children: horizontalCellChecker(cellForSplit),
          };
        }
        if (cellForSplit.split == "horizontal") {
          return {
            ...cellForSplit,
            children: horizontalCellChecker(cellForSplit),
          };
        }

        return cellForSplit;
      }
      const findedRail = present.find(
        (rail) => rail.frontId === payload.railId
      );

      const newCells = findedRail.customLabels.map((item) => {
        return splitRowController(item);
      });
      const newRails = present.map((rail) => {
        if (rail.frontId == payload.railId) {
          return { ...rail, customLabels: newCells };
        }
        return rail;
      });

      const NewHistory = {
        type: "SET_HISTORY",
        value: newRails,
      };
      return HistoryChanger(NewHistory);
    }
    if (action == cellAction.JOINROW) {
      //requirement
      //payload.cellId
      //action

      function JoinRowController(cellForJoin) {
        function fullCellChecker(cellForJoin) {
          if (cellForJoin.frontId == payload.cellId) {
            const a = {
              ...cellForJoin,
              split: "none",
              children: null,
              contents: cellForJoin.children[0].contents,
            };

            return a;
          }
          if (cellForJoin.frontId == payload.parentId) {
            console.log({ cellForJoin });
            const a = {
              ...cellForJoin,
              split: "none",
              children: null,
              contents: cellForJoin.children[0].contents,
            };
            // delete a.parentId;
            return a;
          }

          return cellForJoin;
        }
        function horizontalCellChecker(cellForJoin) {
          const mapedChild = cellForJoin.children.map((child) => {
            let letIt = false;
            child.children?.map((c) => {
              if (c.children) letIt = true;
            });
            if (!letIt) {
              return fullCellChecker(child);
            } else {
              return { ...child, children: horizontalCellChecker(child) };
            }
          });
          return mapedChild;
        }

        if (cellForJoin.frontId == payload.parentId) {
          return fullCellChecker(cellForJoin);
        }
        if (cellForJoin.split == "vertical") {
          return {
            ...cellForJoin,
            children: horizontalCellChecker(cellForJoin),
          };
        }
        if (cellForJoin.split == "horizontal") {
          return {
            ...cellForJoin,
            children: horizontalCellChecker(cellForJoin),
          };
        }

        return cellForJoin;
      }

      const findedRail = present.find(
        (rail) => rail.frontId === payload.railId
      );

      const newCells = findedRail.customLabels.map((item) => {
        return JoinRowController(item);
      });
      const newRails = present.map((rail) => {
        if (rail.frontId == payload.railId) {
          return { ...rail, customLabels: newCells };
        }
        return rail;
      });

      const NewHistory = {
        type: "SET_HISTORY",
        value: newRails,
      };
      return HistoryChanger(NewHistory);
    }
    if (action == cellAction.JOINCOLUMN) {
      //requirement
      //payload.cellId
      //action

      function JoinColumnController(cellForJoin) {
        function fullCellChecker(cellForJoin) {
          if (cellForJoin.frontId == payload.cellId) {
            const a = {
              ...cellForJoin,
              split: "none",
              children: null,
              contents: cellForJoin.children[0].contents,
            };

            return a;
          }
          if (cellForJoin.frontId == payload.parentId) {
            const a = {
              ...cellForJoin,
              split: "none",
              children: null,
              contents: cellForJoin.children[0].contents,
            };
            // delete a.parentId;
            return a;
          }

          return cellForJoin;
        }
        function verticalCellChecker(cellForJoin) {
          const mapedChild = cellForJoin.children.map((child) => {
            let letIt = false;
            child.children?.map((c) => {
              if (c.children) letIt = true;
            });
            if (!letIt) {
              return fullCellChecker(child);
            } else {
              return { ...child, children: verticalCellChecker(child) };
            }
          });
          return mapedChild;
        }

        if (cellForJoin.frontId == payload.parentId) {
          return fullCellChecker(cellForJoin);
        }
        if (cellForJoin.split == "vertical") {
          return {
            ...cellForJoin,
            children: verticalCellChecker(cellForJoin),
          };
        }
        if (cellForJoin.split == "horizontal") {
          return {
            ...cellForJoin,
            children: verticalCellChecker(cellForJoin),
          };
        }

        return cellForJoin;
      }

      const findedRail = present.find(
        (rail) => rail.frontId === payload.railId
      );

      const newCells = findedRail.customLabels.map((item) => {
        return JoinColumnController(item);
      });
      const newRails = present.map((rail) => {
        if (rail.frontId == payload.railId) {
          return { ...rail, customLabels: newCells };
        }
        return rail;
      });

      const NewHistory = {
        type: "SET_HISTORY",
        value: newRails,
      };
      return HistoryChanger(NewHistory);
    }
    if (action == cellAction.SETFONT) {
      //requirement
      //payload.cellId == parentId
      //action
      function setFountForRoot(cellForSetFont) {
        function fullCellChecker(cell) {
          if (cell.frontId == payload.cellId) {
            console.log(payload);
            const a = {
              ...cell,
              structure: {
                ...cell.structure,
                style: {
                  ...cell.structure.style,
                  fontFamily: payload.structure,
                },
              },
            };
            setSelectedCellForReadStyle(a.structure.style);
            return a;
          }
          return cell;
        }
        function checker(cellforSplit) {
          const mapedChildren = cellforSplit.children.map((child) => {
            if (child.split == "none") {
              return fullCellChecker(child);
            }
            if (child.split == "vertical") {
              return { ...child, children: checker(child) };
            }
            if (child.split == "horizontal") {
              return { ...child, children: checker(child) };
            }
            return child;
          });

          // return { ...cellForSplit, children: mapedChildren };
          return mapedChildren;
        }
        if (cellForSetFont.split == "none") {
          return fullCellChecker(cellForSetFont);
        }
        if (cellForSetFont.split == "vertical") {
          return {
            ...cellForSetFont,
            children: checker(cellForSetFont),
          };
        }
        if (cellForSetFont.split == "horizontal") {
          return {
            ...cellForSetFont,
            children: checker(cellForSetFont),
          };
        }
      }

      const findedRail = present.find(
        (rail) => rail.frontId === payload.railId
      );

      const newCells = findedRail.customLabels.map((item) => {
        return setFountForRoot(item);
      });
      const newRails = present.map((rail) => {
        if (rail.frontId == payload.railId) {
          return { ...rail, customLabels: newCells };
        }
        return rail;
      });

      const NewHistory = {
        type: "SET_HISTORY",
        value: newRails,
      };
      return HistoryChanger(NewHistory);
    }
    if (action == cellAction.FONTSTYLE) {
      //requirement
      //payload.cellId == parentId
      //action

      function setTextFontStyle(cellForSetFontStyle) {
        function fullCellChecker(cell) {
          if (cell.frontId == payload.cellId) {
            const a = {
              ...cell,
              structure: {
                ...cell.structure,
                style: {
                  ...cell.structure.style,
                  fontStyle: payload.structure,
                },
              },
            };
            setSelectedCellForReadStyle(a.structure.style);
            return a;
          }
          return cell;
        }
        function checker(cellforSplit) {
          const mapedChildren = cellforSplit.children.map((child) => {
            if (child.split == "none") {
              return fullCellChecker(child);
            }
            if (child.split == "vertical") {
              return { ...child, children: checker(child) };
            }
            if (child.split == "horizontal") {
              return { ...child, children: checker(child) };
            }
            return child;
          });

          // return { ...cellForSplit, children: mapedChildren };
          return mapedChildren;
        }
        if (cellForSetFontStyle.split == "none") {
          return fullCellChecker(cellForSetFontStyle);
        }
        if (cellForSetFontStyle.split == "vertical") {
          return {
            ...cellForSetFontStyle,
            children: checker(cellForSetFontStyle),
          };
        }
        if (cellForSetFontStyle.split == "horizontal") {
          return {
            ...cellForSetFontStyle,
            children: checker(cellForSetFontStyle),
          };
        }
      }

      const findedRail = present.find(
        (rail) => rail.frontId === payload.railId
      );

      const newCells = findedRail.customLabels.map((item) => {
        return setTextFontStyle(item);
      });
      const newRails = present.map((rail) => {
        if (rail.frontId == payload.railId) {
          return { ...rail, customLabels: newCells };
        }
        return rail;
      });

      const NewHistory = {
        type: "SET_HISTORY",
        value: newRails,
      };
      return HistoryChanger(NewHistory);
    }
    if (action == cellAction.TEXTALIGN) {
      //requirement
      //payload.cellId == parentId
      //action

      function setTextAlign(cellTextAlign) {
        function fullCellChecker(cell) {
          if (cell.frontId == payload.cellId) {
            console.log(payload);
            const a = {
              ...cell,
              structure: {
                ...cell.structure,
                style: {
                  ...cell.structure.style,
                  textAlign: payload.structure,
                },
              },
            };
            setSelectedCellForReadStyle(a.structure.style);
            return a;
          }
          return cell;
        }
        function checker(cellforSplit) {
          const mapedChildren = cellforSplit.children.map((child) => {
            if (child.split == "none") {
              return fullCellChecker(child);
            }
            if (child.split == "vertical") {
              return { ...child, children: checker(child) };
            }
            if (child.split == "horizontal") {
              return { ...child, children: checker(child) };
            }
            return child;
          });

          // return { ...cellForSplit, children: mapedChildren };
          return mapedChildren;
        }
        if (cellTextAlign.split == "none") {
          return fullCellChecker(cellTextAlign);
        }
        if (cellTextAlign.split == "vertical") {
          return {
            ...cellTextAlign,
            children: checker(cellTextAlign),
          };
        }
        if (cellTextAlign.split == "horizontal") {
          return {
            ...cellTextAlign,
            children: checker(cellTextAlign),
          };
        }
      }

      const findedRail = present.find(
        (rail) => rail.frontId === payload.railId
      );

      const newCells = findedRail.customLabels.map((item) => {
        return setTextAlign(item);
      });
      const newRails = present.map((rail) => {
        if (rail.frontId == payload.railId) {
          return { ...rail, customLabels: newCells };
        }
        return rail;
      });

      const NewHistory = {
        type: "SET_HISTORY",
        value: newRails,
      };
      return HistoryChanger(NewHistory);
    }
    if (action == cellAction.CHANGEFONTSIZE) {
      //requirement
      //payload.cellId == parentId
      //action

      function cellSplitController(cellTextAlign) {
        function fullCellChecker(cell) {
          if (cell.frontId == payload.cellId) {
            let fontSizeValue;
            let cellFontSize = cell.structure.style.fontSize;
            if (payload.structure == "increment") {
              fontSizeValue = +cellFontSize + 1;
            }
            if (payload.structure == "decrement") {
              if (cell.structure.style.fontSize > 1) {
                fontSizeValue = cellFontSize - 1;
              } else {
                fontSizeValue = 1;
              }
            }

            const a = {
              ...cell,
              structure: {
                ...cell.structure,
                style: {
                  ...cell.structure.style,
                  fontSize: fontSizeValue,
                },
              },
            };
            setSelectedCellForReadStyle(a.structure.style);
            return a;
          }
          return cell;
        }
        function checker(cellforSplit) {
          const mapedChildren = cellforSplit.children.map((child) => {
            if (child.split == "none") {
              return fullCellChecker(child);
            }
            if (child.split == "vertical") {
              return { ...child, children: checker(child) };
            }
            if (child.split == "horizontal") {
              return { ...child, children: checker(child) };
            }
            return child;
          });

          // return { ...cellForSplit, children: mapedChildren };
          return mapedChildren;
        }
        if (cellTextAlign.split == "none") {
          return fullCellChecker(cellTextAlign);
        }
        if (cellTextAlign.split == "vertical") {
          return {
            ...cellTextAlign,
            children: checker(cellTextAlign),
          };
        }
        if (cellTextAlign.split == "horizontal") {
          return {
            ...cellTextAlign,
            children: checker(cellTextAlign),
          };
        }
      }

      const findedRail = present.find(
        (rail) => rail.frontId === payload.railId
      );

      const newCells = findedRail.customLabels.map((item) => {
        return cellSplitController(item);
      });
      const newRails = present.map((rail) => {
        if (rail.frontId == payload.railId) {
          return { ...rail, customLabels: newCells };
        }
        return rail;
      });

      const NewHistory = {
        type: "SET_HISTORY",
        value: newRails,
      };
      return HistoryChanger(NewHistory);
    }
    if (action == cellAction.CHANGEFONTANGLE) {
      //requirement
      //payload.cellId == parentId
      //action

      function cellSplitController(cellTextAlign) {
        function fullCellChecker(cell) {
          if (cell.frontId == payload.cellId) {
            let fontAngleValue;
            let cellFontAngle = cell.structure.style.angle;
            if (payload.structure == "increment") {
              fontAngleValue = +cellFontAngle + 1;
            }
            if (payload.structure == "decrement") {
              // if (cell.structure.style.fontSize > 1) {
              fontAngleValue = cellFontAngle - 1;
              // } else {
              //   fontAngleValue = 1;
              // }
            }

            const a = {
              ...cell,
              structure: {
                ...cell.structure,
                style: {
                  ...cell.structure.style,
                  angle: fontAngleValue,
                },
              },
            };
            setSelectedCellForReadStyle(a.structure.style);
            return a;
          }
          return cell;
        }
        function checker(cellforSplit) {
          const mapedChildren = cellforSplit.children.map((child) => {
            if (child.split == "none") {
              return fullCellChecker(child);
            }
            if (child.split == "vertical") {
              return { ...child, children: checker(child) };
            }
            if (child.split == "horizontal") {
              return { ...child, children: checker(child) };
            }
            return child;
          });

          // return { ...cellForSplit, children: mapedChildren };
          return mapedChildren;
        }
        if (cellTextAlign.split == "none") {
          return fullCellChecker(cellTextAlign);
        }
        if (cellTextAlign.split == "vertical") {
          return {
            ...cellTextAlign,
            children: checker(cellTextAlign),
          };
        }
        if (cellTextAlign.split == "horizontal") {
          return {
            ...cellTextAlign,
            children: checker(cellTextAlign),
          };
        }
      }

      const findedRail = present.find(
        (rail) => rail.frontId === payload.railId
      );

      const newCells = findedRail.customLabels.map((item) => {
        return cellSplitController(item);
      });
      const newRails = present.map((rail) => {
        if (rail.frontId == payload.railId) {
          return { ...rail, customLabels: newCells };
        }
        return rail;
      });

      const NewHistory = {
        type: "SET_HISTORY",
        value: newRails,
      };
      return HistoryChanger(NewHistory);
    }
    if (action == cellAction.CHANGECELLMARGIN) {
      //requirement
      //payload.cellId == parentId
      //action

      function cellSplitController(cell) {
        function fullCellChecker(cellFotCheck) {
          if (cellFotCheck.frontId == payload.cellId) {
            let newMargin;
            let cellMargin = cellFotCheck.structure.style.margin;
            if (payload.structure == "increment") {
              newMargin = +cellMargin + 1;
            }

            if (payload.structure == "decrement") {
              if (cellFotCheck.structure.style.margin > 0) {
                newMargin = cellMargin - 1;
              } else {
                newMargin = 0;
              }
            }

            console.log(cellFotCheck.structure.style.margin);
            const a = {
              ...cellFotCheck,
              structure: {
                ...cellFotCheck.structure,
                style: {
                  ...cellFotCheck.structure.style,
                  margin: newMargin,
                },
              },
            };

            setSelectedCellForReadStyle(a.structure.style);
            return a;
          }
          return cellFotCheck;
        }
        function checker(cellforSplit) {
          const mapedChildren = cellforSplit.children.map((child) => {
            if (child.split == "none") {
              return fullCellChecker(child);
            }
            if (child.split == "vertical") {
              return { ...child, children: checker(child) };
            }
            if (child.split == "horizontal") {
              return { ...child, children: checker(child) };
            }
            return child;
          });

          // return { ...cellForSplit, children: mapedChildren };
          return mapedChildren;
        }
        if (cell.split == "none") {
          return fullCellChecker(cell);
        }
        if (cell.split == "vertical") {
          return {
            ...cell,
            children: checker(cell),
          };
        }
        if (cell.split == "horizontal") {
          return {
            ...cell,
            children: checker(cell),
          };
        }
      }

      const findedRail = present.find(
        (rail) => rail.frontId === payload.railId
      );

      const newCells = findedRail.customLabels.map((item) => {
        return cellSplitController(item);
      });
      const newRails = present.map((rail) => {
        if (rail.frontId == payload.railId) {
          return { ...rail, customLabels: newCells };
        }
        return rail;
      });

      const NewHistory = {
        type: "SET_HISTORY",
        value: newRails,
      };
      return HistoryChanger(NewHistory);
    }
    if (action == cellAction.CHANGECELLPADDING) {
      //requirement
      //payload.cellId == parentId
      //action

      function cellSplitController(cellTextAlign) {
        function fullCellChecker(cell) {
          if (cell.frontId == payload.cellId) {
            let newPadding;
            let cellPadding = cell.structure.style.padding;
            if (payload.structure == "increment") {
              newPadding = +cellPadding + 1;
            }
            if (payload.structure == "decrement") {
              if (cell.structure.style.padding > 0) {
                newPadding = cellPadding - 1;
              } else {
                newPadding = 0;
              }
            }

            const a = {
              ...cell,
              structure: {
                ...cell.structure,
                style: {
                  ...cell.structure.style,
                  padding: newPadding,
                },
              },
            };

            setSelectedCellForReadStyle(a.structure.style);
            return a;
          }
          return cell;
        }
        function checker(cellforSplit) {
          const mapedChildren = cellforSplit.children.map((child) => {
            if (child.split == "none") {
              return fullCellChecker(child);
            }
            if (child.split == "vertical") {
              return { ...child, children: checker(child) };
            }
            if (child.split == "horizontal") {
              return { ...child, children: checker(child) };
            }
            return child;
          });

          // return { ...cellForSplit, children: mapedChildren };
          return mapedChildren;
        }
        if (cellTextAlign.split == "none") {
          return fullCellChecker(cellTextAlign);
        }
        if (cellTextAlign.split == "vertical") {
          return {
            ...cellTextAlign,
            children: checker(cellTextAlign),
          };
        }
        if (cellTextAlign.split == "horizontal") {
          return {
            ...cellTextAlign,
            children: checker(cellTextAlign),
          };
        }
      }

      const findedRail = present.find(
        (rail) => rail.frontId === payload.railId
      );

      const newCells = findedRail.customLabels.map((item) => {
        return cellSplitController(item);
      });
      const newRails = present.map((rail) => {
        if (rail.frontId == payload.railId) {
          return { ...rail, customLabels: newCells };
        }
        return rail;
      });

      const NewHistory = {
        type: "SET_HISTORY",
        value: newRails,
      };
      return HistoryChanger(NewHistory);
    }
    if (action == cellAction.DELETECELL) {
      const findedRail = state.present.find(
        (rail) => rail.frontId === payload.railId
      );

      const newCells = findedRail.customLabels.filter(
        (cell) => cell.frontId !== payload.cellId
      );
      const newRails = present.map((rail) => {
        if (rail.frontId == payload.railId) {
          return { ...rail, customLabels: newCells };
        }
        return rail;
      });

      const NewHistory = {
        type: "SET_HISTORY",
        value: newRails,
      };
      return HistoryChanger(NewHistory);
    }
    if (action == cellAction.DUPLICATECELL) {
      function cellSplitController(cell) {
        function fullCellChecker(cellForCheck) {
          return { ...cellForCheck, frontId: shortid.generate() };
        }
        function verticalCellChecker(cellForCheck) {
          const mapedChildren = cellForCheck.children.map((child) => {
            if (child.split == "none") {
              return fullCellChecker(child);
            }
            if (child.split == "vertical") {
              return verticalCellChecker(child);
            }
            if (child.split == "horizontal") {
              return horizontalCellChecker(child);
            }
            return child;
          });

          return {
            ...cellForCheck,
            frontId: shortid.generate(),
            children: mapedChildren,
          };
        }
        function horizontalCellChecker(cellForCheck) {
          const mapedChildren = cellForCheck.children.map((child) => {
            if (child.split == "none") {
              return fullCellChecker(child);
            }
            if (child.split == "vertical") {
              return verticalCellChecker(child);
            }
            if (child.split == "horizontal") {
              return horizontalCellChecker(child);
            }
            return child;
          });

          return {
            ...cellForCheck,
            frontId: shortid.generate(),
            children: mapedChildren,
          };
        }

        if (cell.split == "none") {
          return fullCellChecker(cell);
        }
        if (cell.split == "vertical") {
          return verticalCellChecker(cell);
        }
        if (cell.split == "horizontal") {
          return horizontalCellChecker(cell);
        }
      }
      let findedRail = state.present.find(
        (rail) => rail.frontId === payload.railId
      );

      const findedCellIndex = findedRail.customLabels.findIndex(
        (cell) => cell.frontId === payload.cellId
      );
      let newCell = findedRail.customLabels[findedCellIndex];

      newCell = cellSplitController(newCell);

      const copyCells = [...findedRail.customLabels];
      console.log({ newCell });
      copyCells.splice(findedCellIndex, 0, newCell);

      // const newRail = { ...findedRail, customLabels: copyCells };
      const newRails = present.map((rail) => {
        if (rail.frontId == payload.railId) {
          return { ...rail, customLabels: copyCells };
        }
        return rail;
      });
      console.log({ newRails });
      const NewHistory = {
        type: "SET_HISTORY",
        value: newRails,
      };
      return HistoryChanger(NewHistory);
    }
    if (action == cellAction.ISBACODE) {
      //requirement
      //payload.cellId == parentId
      //action
      console.log(payload);
      function cellSplitController(cell) {
        function fullCellChecker(cell) {
          if (cell.frontId == payload.cellId) {
            const a = {
              ...cell,
              isBarcode: !cell.isBarcode,
            };

            setSelectedCellForReadStyle(a.structure.style);
            return a;
          }
          return cell;
        }
        function checker(cellforSplit) {
          const mapedChildren = cellforSplit.children.map((child) => {
            if (child.split == "none") {
              return fullCellChecker(child);
            }
            if (child.split == "vertical") {
              return { ...child, children: checker(child) };
            }
            if (child.split == "horizontal") {
              return { ...child, children: checker(child) };
            }
            return child;
          });

          // return { ...cellForSplit, children: mapedChildren };
          return mapedChildren;
        }
        if (cell.split == "none") {
          return fullCellChecker(cell);
        }
        if (cell.split == "vertical") {
          return {
            ...cell,
            children: checker(cell),
          };
        }
        if (cell.split == "horizontal") {
          return {
            ...cell,
            children: checker(cell),
          };
        }
      }

      const findedRail = present.find(
        (rail) => rail.frontId === payload.railId
      );

      const newCells = findedRail.customLabels.map((item) => {
        return cellSplitController(item);
      });
      const newRails = present.map((rail) => {
        if (rail.frontId == payload.railId) {
          return { ...rail, customLabels: newCells };
        }
        return rail;
      });

      const NewHistory = {
        type: "SET_HISTORY",
        value: newRails,
      };
      return HistoryChanger(NewHistory);
    }
    if (action == cellAction.QRCODE) {
      //requirement
      //payload.cellId == parentId
      //action

      function cellSplitController(cell) {
        function fullCellChecker(cell) {
          if (cell.frontId == payload.cellId) {
            const a = {
              ...cell,
              isQrcode: !cell.isQrcode,
            };

            setSelectedCellForReadStyle(a.structure.style);
            return a;
          }
          return cell;
        }
        function checker(cellforSplit) {
          const mapedChildren = cellforSplit.children.map((child) => {
            if (child.split == "none") {
              return fullCellChecker(child);
            }
            if (child.split == "vertical") {
              return { ...child, children: checker(child) };
            }
            if (child.split == "horizontal") {
              return { ...child, children: checker(child) };
            }
            return child;
          });

          // return { ...cellForSplit, children: mapedChildren };
          return mapedChildren;
        }
        if (cell.split == "none") {
          return fullCellChecker(cell);
        }
        if (cell.split == "vertical") {
          return {
            ...cell,
            children: checker(cell),
          };
        }
        if (cell.split == "horizontal") {
          return {
            ...cell,
            children: checker(cell),
          };
        }
      }

      const findedRail = present.find(
        (rail) => rail.frontId === payload.railId
      );

      const newCells = findedRail.customLabels.map((item) => {
        return cellSplitController(item);
      });
      const newRails = present.map((rail) => {
        if (rail.frontId == payload.railId) {
          return { ...rail, customLabels: newCells };
        }
        return rail;
      });

      const NewHistory = {
        type: "SET_HISTORY",
        value: newRails,
      };
      return HistoryChanger(NewHistory);
    }
    if (action == cellAction.UNDO) {
      const historyPayload = {
        type: "UNDO",
      };
      if (isUndoPossible) {
        HistoryChanger(historyPayload);
      } else {
      }
    }
    if (action == cellAction.REDO) {
      const historyPayload = {
        type: "REDO",
      };
      if (isRedoPossible) {
        HistoryChanger(historyPayload);
      } else {
      }
    }
  }

  return setCell;
}
