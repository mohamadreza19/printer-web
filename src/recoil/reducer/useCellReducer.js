import { useRecoilState, useSetRecoilState } from "recoil";
import { rails, selectedCellForReadStyle } from "../userEditorStore/cellsStore";
import selectionAction from "../actions/editor/actionButton/selectionbuttons";
import cellAction from "../actions/editor/cell/cell";

import shortid from "shortid";

import {
  ColumnFour_redo,
  ColumnFour_undo,
} from "../userEditorStore/EditorHeaderActionButton";
import React, { useEffect } from "react";
import { cellSplitContoller_ } from "./cellReducer_dependency";
import { railController_ } from "./cellReducer_dependency/railContoller";
import { memo } from "react";
import { useMemo } from "react";

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
    const { type = "", value = {} } = newState;

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
    if (type === "PRESENT") {
      setState((draft) => {
        return {
          ...draft,
          present: value,
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
        content: {
          text: "",

          style: {
            fontSize: "14",
            angle: "14",
            textAlign: "center",
            fontStyle: "bold",
          },
        },
      },
    },
    action
  ) {
    // if (!action) throw new Error("need action");

    if (action == selectionAction.SELECT) {
      // const railController = new RailController({
      //   railsArr: state.present,
      //   railId: payload.railId,
      //   cellId: payload.cellId,
      //   actionOnCustomLabel: action,
      //   payload: {} || "",
      //   historyChanger: HistoryChanger,
      // });
      //requirement
      // payload.frontId
      // railController.type = "EDIT_UNSAVE";
      // return railController.save();
      const newRails = state.present.map((rail) => {
        return railController_(
          rail,
          payload,
          setSelectedCellForReadStyle,
          (cell) => ({ ...cell, isSelected: true }),

          (cell) => ({ ...cell, isSelected: false })
        );
      });
      HistoryChanger({
        type: "PRESENT",
        value: newRails,
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
        const newCells = rail.customLabels.map((item) => {
          return {
            ...item,
            structure: cellSplitController(item.structure),
          };
        });
        return { ...rail, customLabels: newCells };
      }

      const newRails = state.present.map((rail) => {
        return railController(rail);
      });

      // const newRails = state.present.map((rail) => {
      //   return railController_(
      //     rail,
      //     payload,
      //     setSelectedCellForReadStyle,
      //     (cell) => {},
      //     (cell) => ({ ...cell, isSelected: false })
      //   );
      // });
      return setState((draft) => {
        return {
          ...draft,
          present: newRails,
        };
      });
    }
    if (action == cellAction.REVERSE) {
      try {
        const newRails = state.present.map((rail) => {
          if ("customLabels" in rail) {
            const reversedCustomLabels = [...rail.customLabels].reverse();
            return { ...rail, customLabels: reversedCustomLabels };
          }
          return rail;
        });

        const NewHistory = {
          type: "SET_HISTORY",
          value: newRails,
        };
        return HistoryChanger(NewHistory);
      } catch (error) {
        console.log(error);
      }
    }
    if (action == cellAction.NEWSETCONTENT) {
      const newRails = state.present.map((rail) => {
        return railController_(
          rail,
          payload,
          setSelectedCellForReadStyle,
          (cell) => ({
            ...cell,
            content: {
              ...cell.content,
              text: payload.content,
            },
          }),
          (cell) => cell
        );
      });
      const NewHistory = {
        type: "SET_HISTORY",
        value: newRails,
      };
      return HistoryChanger(NewHistory);
    }
    if (action == cellAction.SETSYMBOL) {
      const newRails = state.present.map((rail) => {
        return railController_(
          rail,
          payload,
          setSelectedCellForReadStyle,
          (cell) => ({
            ...cell,
            symbolId: payload.symbolId,
          }),
          (cell) => cell
        );
      });
      const NewHistory = {
        type: "SET_HISTORY",
        value: newRails,
      };
      return HistoryChanger(NewHistory);
    }
    if (action == cellAction.DELETESYMBOL) {
      console.log("hiii");
      const newRails = state.present.map((rail) => {
        return railController_(
          rail,
          payload,
          setSelectedCellForReadStyle,
          (cell) => {
            let newCell = { ...cell };

            delete newCell.symbolId;
            return newCell;
          },
          (cell) => cell
        );
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
              split: "vertical",
              children: [
                {
                  split: "none",
                  parentId: cellforSplit.frontId,
                  frontId: shortid.generate(),
                  content: {
                    text: "",
                    style: cellforSplit.content.style,
                  },
                  isSelected: false,
                },
                {
                  split: "none",
                  parentId: cellforSplit.frontId,
                  frontId: shortid.generate(),
                  content: {
                    text: "",
                    style: cellforSplit.content.style,
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
              return {
                ...child,

                children: verticalCellChecker(child),
              };
            }
            if (child.split == "horizontal") {
              return {
                ...child,

                children: verticalCellChecker(child),
              };
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
        return {
          ...item,
          structure: splitColumnController({
            ...item.structure,
            frontId: item.frontId,
          }),
        };
        // return splitColumnController(item);
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
    if (action === cellAction.SPLITROW) {
      //requirement
      //action
      //payload.cellId
      function splitRowController(cellForSplit) {
        function fullCellChecker(cellforSplit) {
          if (cellforSplit.frontId == payload.cellId) {
            const a = {
              ...cellforSplit,

              // content: {
              //   text: "",
              //   style: cellforSplit.structure.content.style,
              // },
              split: "horizontal",
              children: [
                {
                  parentId: cellforSplit.frontId,
                  frontId: shortid.generate(),
                  split: "none",
                  values: null,
                  content: {
                    text: "",
                    style: cellforSplit.content.style,
                  },

                  isSelected: false,
                },
                {
                  parentId: cellforSplit.frontId,
                  frontId: shortid.generate(),
                  split: "none",
                  values: null,
                  content: {
                    text: "",
                    style: cellforSplit.content.style,
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
              return {
                ...child,
                children: horizontalCellChecker(child),
              };
            }
            if (child.split == "horizontal") {
              return {
                ...child,
                children: horizontalCellChecker(child),
              };
            }
            return child;
          });

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
        return {
          ...item,
          structure: splitRowController({
            ...item.structure,
            frontId: item.frontId,
          }),
        };
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
    if (action === cellAction.JOINROW) {
      //requirement
      //payload.cellId
      //action

      function JoinRowController(cellForJoin) {
        function fullCellChecker(cellForJoin) {
          if (cellForJoin.frontId == payload.cellId) {
            const a = {
              ...cellForJoin,
              split: "none",
            };

            return a;
          }
          if (cellForJoin.frontId == payload.parentId) {
            const a = {
              ...cellForJoin,
              split: "none",
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
              return {
                ...child,
                children: horizontalCellChecker(child),
              };
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
        return {
          ...item,
          structure: JoinRowController({
            ...item.structure,
            frontId: item.frontId,
          }),
        };
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
    if (action === cellAction.JOINCOLUMN) {
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
            };

            return a;
          }
          if (cellForJoin.frontId == payload.parentId) {
            const a = {
              ...cellForJoin,
              split: "none",
              // ...cellForJoin.children[0],
              children: null,
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
              return {
                ...child,

                children: verticalCellChecker(child),
              };
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
        return {
          ...item,
          structure: JoinColumnController({
            ...item.structure,
            frontId: item.frontId,
          }),
        };
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
    if (action === cellAction.SETFONT) {
      //requirement
      //payload.cellId == parentId
      //action

      //   if (rail.frontId == payload.railId) {
      //     return { ...rail, customLabels: newCells };
      //   }
      //   return rail;
      // });
      const newRails = state.present.map((rail) => {
        return railController_(
          rail,
          payload,
          setSelectedCellForReadStyle,
          (cell) => {
            return {
              ...cell,

              content: {
                ...cell.content,
                style: {
                  ...cell.content.style,
                  fontFamily: payload.structure,
                },
              },
            };
          },
          (cell) => cell
        );
      });
      const NewHistory = {
        type: "SET_HISTORY",
        value: newRails,
      };
      return HistoryChanger(NewHistory);
    }
    if (action === cellAction.FONTSTYLE) {
      //requirement
      //payload.cellId == parentId
      //action

      const newRails = state.present.map((rail) => {
        return railController_(
          rail,
          payload,
          setSelectedCellForReadStyle,
          (cell) => {
            return {
              ...cell,

              content: {
                ...cell.content,
                style: {
                  ...cell.content.style,
                  fontStyle: payload.structure,
                },
              },
            };
          },
          (cell) => cell
        );
      });

      const NewHistory = {
        type: "SET_HISTORY",
        value: newRails,
      };
      return HistoryChanger(NewHistory);
    }
    if (action === cellAction.TEXTALIGN) {
      //requirement
      //payload.cellId == parentId
      //action

      const newRails = state.present.map((rail) => {
        return railController_(
          rail,
          payload,
          setSelectedCellForReadStyle,
          (cell) => {
            return {
              ...cell,

              content: {
                ...cell.content,
                style: {
                  ...cell.content.style,
                  textAlign: payload.structure,
                },
              },
            };
          },
          (cell) => cell
        );
      });

      const NewHistory = {
        type: "SET_HISTORY",
        value: newRails,
      };
      return HistoryChanger(NewHistory);
    }
    if (action === cellAction.CHANGEFONTSIZE) {
      //requirement
      //payload.cellId == parentId
      //action

      const newRails = state.present.map((rail) => {
        return railController_(
          rail,
          payload,
          setSelectedCellForReadStyle,
          (cell) => {
            let fontSizeValue;
            let cellFontSize = cell.content.style.fontSize;
            if (payload.structure == "increment") {
              fontSizeValue = +cellFontSize + 1;
            }
            if (payload.structure == "decrement") {
              if (cell.content.style.fontSize > 1) {
                fontSizeValue = cellFontSize - 1;
              } else {
                fontSizeValue = 1;
              }
            }

            return {
              ...cell,

              content: {
                ...cell.content,
                style: {
                  ...cell.content.style,
                  fontSize: fontSizeValue,
                },
              },
            };
          },
          (cell) => cell
        );
      });

      const NewHistory = {
        type: "SET_HISTORY",
        value: newRails,
      };
      return HistoryChanger(NewHistory);
    }
    if (action === cellAction.CHANGEFONTANGLE) {
      //requirement
      //payload.cellId == parentId
      //action

      const newRails = state.present.map((rail) => {
        return railController_(
          rail,
          payload,
          setSelectedCellForReadStyle,
          (cell) => {
            let fontAngleValue;
            let cellFontAngle = cell.content.style.angle;
            if (payload.structure == "increment") {
              fontAngleValue = +cellFontAngle + 1;
            }
            if (payload.structure == "decrement") {
              // if (cell.structure.content.style.fontSize > 1) {
              fontAngleValue = cellFontAngle - 1;
              // } else {
              //   fontAngleValue = 1;
              // }
            }

            return {
              ...cell,

              content: {
                ...cell.content,
                style: {
                  ...cell.content.style,
                  angle: fontAngleValue,
                },
              },
            };
          },
          (cell) => cell
        );
      });

      const NewHistory = {
        type: "SET_HISTORY",
        value: newRails,
      };
      return HistoryChanger(NewHistory);
    }
    if (action === cellAction.CHANGECELLMARGIN) {
      //requirement
      //payload.cellId == parentId
      //action

      const newRails = state.present.map((rail) => {
        return railController_(
          rail,
          payload,
          setSelectedCellForReadStyle,
          (cell) => {
            let newMargin;
            let cellMargin = cell.content.style.margin;
            if (payload.structure == "increment") {
              newMargin = +cellMargin + 1;
            }

            if (payload.structure == "decrement") {
              if (cell.content.style.margin > 0) {
                newMargin = cellMargin - 1;
              } else {
                newMargin = 0;
              }
            }

            return {
              ...cell,

              content: {
                ...cell.content,
                style: {
                  ...cell.content.style,
                  margin: newMargin,
                },
              },
            };
          },
          (cell) => cell
        );
      });

      const NewHistory = {
        type: "SET_HISTORY",
        value: newRails,
      };
      return HistoryChanger(NewHistory);
    }
    if (action === cellAction.CHANGECELLPADDING) {
      //requirement
      //payload.cellId == parentId
      //action

      const newRails = state.present.map((rail) => {
        return railController_(
          rail,
          payload,
          setSelectedCellForReadStyle,
          (cell) => {
            let newPadding;
            let cellPadding = cell.content.style.padding;
            if (payload.structure == "increment") {
              newPadding = +cellPadding + 1;
            }
            if (payload.structure == "decrement") {
              if (cell.content.style.padding > 0) {
                newPadding = cellPadding - 1;
              } else {
                newPadding = 0;
              }
            }

            return {
              ...cell,

              content: {
                ...cell.content,
                style: {
                  ...cell.content.style,
                  padding: newPadding,
                },
              },
            };
          },
          (cell) => cell
        );
      });

      const NewHistory = {
        type: "SET_HISTORY",
        value: newRails,
      };
      return HistoryChanger(NewHistory);
    }
    if (action === cellAction.DELETECELL) {
      const findedRail = state.present.find(
        (rail) => rail.frontId === payload.railId
      );
      console.log({ payload });
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
    if (action === cellAction.DUPLICATECELL) {
      function cellSplitController(cell) {
        function fullCellChecker(cellForCheck) {
          return { ...cellForCheck, frontId: shortid.generate() };
        }
        function verticalCellChecker(cellForCheck) {
          const mapedChildren = cellForCheck.structure.children.map((child) => {
            if (child.structure.split == "none") {
              return fullCellChecker(child);
            }
            if (child.structure.split == "vertical") {
              return verticalCellChecker(child);
            }
            if (child.structure.split == "horizontal") {
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
          const mapedChildren = cellForCheck.structure.children.map((child) => {
            if (child.structure.split == "none") {
              return fullCellChecker(child);
            }
            if (child.structure.split == "vertical") {
              return verticalCellChecker(child);
            }
            if (child.structure.split == "horizontal") {
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

        if (cell.structure.split == "none") {
          return fullCellChecker(cell);
        }
        if (cell.structure.split == "vertical") {
          return verticalCellChecker(cell);
        }
        if (cell.structure.split == "horizontal") {
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
    if (action === cellAction.ISBACODE) {
      //requirement
      //payload.cellId == parentId
      //action

      const newRails = state.present.map((rail) => {
        return railController_(
          rail,
          payload,
          setSelectedCellForReadStyle,
          (cell) => {
            return {
              ...cell,
              isBarcode: !cell.isBarcode,
            };
          },
          (cell) => cell
        );
      });

      const NewHistory = {
        type: "SET_HISTORY",
        value: newRails,
      };
      return HistoryChanger(NewHistory);
    }
    if (action === cellAction.QRCODE) {
      //requirement
      //payload.cellId == parentId
      //action

      const newRails = state.present.map((rail) => {
        return railController_(
          rail,
          payload,
          setSelectedCellForReadStyle,
          (cell) => {
            return {
              ...cell,
              isQrcode: !cell.isQrcode,
            };
          },
          (cell) => cell
        );
      });

      const NewHistory = {
        type: "SET_HISTORY",
        value: newRails,
      };
      return HistoryChanger(NewHistory);
    }
    if (action === cellAction.UNDO) {
      const historyPayload = {
        type: "UNDO",
      };
      if (isUndoPossible) {
        HistoryChanger(historyPayload);
      } else {
      }
    }
    if (action === cellAction.REDO) {
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
class CellController {
  #payload = "";
  #cellId = "";
  #_cellAction = "";
  #structure = {
    split: "", //none/vertical/horizontal
  };
  operator = () => {};
  constructor(
    option = {
      payload: "",
      action: "",
      cellId: "",
    }
  ) {
    this.#cellId = option.cellId;
    this.#_cellAction = option.action;
    this.#payload = option.payload;
  }
  lookStructure(structure) {
    this.selectOperator_basedAction();

    const a = this.controlSplit(structure);

    return a;
  }
  select_cell(structure, is = false) {
    if (is) {
      return { ...structure, isSelected: true };
    } else {
      return { ...structure, isSelected: false };
    }
  }
  controlSplit(structure) {
    switch (structure.split) {
      case "none":
        return this.noneCheck(structure);

      case "vertical":
        const a = this.verticalCheck(structure);

      case "horizontal":
        return this.horizontalCheck(structure);
    }
  }
  noneCheck(structure) {
    if (structure.frontId === this.#cellId) {
      return this.operator(structure, true);
    }
    return this.operator(structure, false);
  }

  horizontalCheck(structure) {
    const mapedChildren = structure.children.map((child) => {
      switch (child.split) {
        case "none":
          return this.noneCheck(child);
        case "horizontal":
          return this.horizontalCheck(child);
        case "vertical":
          return this.verticalCheck(child);
      }
    });

    return {
      ...structure,
      children: mapedChildren,
    };
  }
  verticalCheck(structure) {
    const mapedChildren = structure.children.map((child) => {
      switch (child.split) {
        case "none":
          return this.noneCheck(child);
        case "vertical":
          return this.verticalCheck(child);
        case "horizontal":
          return this.horizontalCheck(child);
      }
    });

    return {
      ...structure,
      children: mapedChildren,
    };
  }

  selectOperator_basedAction() {
    switch (this.#_cellAction) {
      case "SELECT":
        this.operator = this.select_cell;
        break;

      default:
        break;
    }
  }
}
class CustomLabelController extends CellController {
  #_customLabels = [];

  constructor(
    option = {
      cellId: "",
      action: "",
      // customLabels: [],
    }
  ) {
    super({
      cellId: option.cellId,
      payload: option.payload,
      action: option.action,
    });
    // this.#_customLabels = option.customLabels;
    this.action = option.action;
  }
  setCustomLabels(customLabels = []) {
    this.#_customLabels = customLabels;
  }
  #mapCustomLabel() {
    this.#_customLabels = this.#_customLabels.map((customlabel) => {
      return {
        ...customlabel,
        structure: this.lookStructure(customlabel.structure),
      };
    });
  }
  getMutatedCustomLabel() {
    this.#mapCustomLabel();

    return this.#_customLabels;
  }
}

class RailController extends CustomLabelController {
  #_type = "EDIT"; // EDIT/ADD/EDIT_UNSAVE
  railsArr = [];
  #railForMutate = { customLabels: [] }; // only in edit mode
  historyChanger = () => {};

  constructor(
    option = {
      railsArr: [],
      historyChanger: () => {},
      railId: "",
      cellId: "",
      actionOnCustomLabel: "",
    }
  ) {
    super({
      cellId: option.cellId,
      // customLabels,
      action: option.actionOnCustomLabel,
    });
    this.railsArr = option.railsArr;
    this.setRailByIdForMutate(option.railId);
    this.historyChanger = option.historyChanger;
  }
  setRailByIdForMutate(railId = "") {
    if (railId) {
      const railForMutate = this.railsArr.find((rail) => {
        if (rail.frontId === railId) {
          return rail;
        }
      });

      this.#railForMutate = railForMutate;
    } else console.log("railId is undefined");
  }

  putting_CustomLabels_In_Rail_And_Rail_in_Rails() {
    this.setCustomLabels(this.#railForMutate.customLabels);
    const newCustomLabel = this.getMutatedCustomLabel();

    this.#railForMutate = {
      ...this.#railForMutate,
      customLabels: newCustomLabel,
    };

    this.railsArr = this.railsArr.map((rail) =>
      rail.frontId === this.#railForMutate.frontId ? this.#railForMutate : rail
    );
  }

  save() {
    switch (this.#_type) {
      case "EDIT_UNSAVE":
        this.putting_CustomLabels_In_Rail_And_Rail_in_Rails();

        this.historyChanger({
          type: "PRESENT",
          value: this.railsArr,
        });
        break;

      default:
        break;
    }
  }
  get type() {
    return this.#_type;
  }
  set type(type = "") {
    this.#_type = type;
  }
}
