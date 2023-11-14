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
      content: "",
      cellId: "",
      parentId: "",
      railId: "",
      symbolId: "",
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
    PayloadCenter.railId = payload.railId;
    PayloadCenter.parentId = payload.parentId;
    PayloadCenter.cellId = payload.cellId;
    PayloadCenter.symbolId = payload.symbolId;
    PayloadCenter.action = action;
    PayloadCenter.content = payload.content;
    PayloadCenter.cunstomLabelStructure = payload.structure;
    const rail_editor = new Rails(state.present).railsArr;

    HistoryChanger({
      type: "PRESENT",
      value: rail_editor,
    });
    // if (action == selectionAction.SELECT) {
    //   // return railController.save();
    //   const newRails = state.present.map((rail) => {
    //     return railController_(
    //       rail,
    //       payload,
    //       setSelectedCellForReadStyle,
    //       (cell) => ({ ...cell, isSelected: true }),

    //       (cell) => ({ ...cell, isSelected: false })
    //     );
    //   });
    //   HistoryChanger({
    //     type: "PRESENT",
    //     value: newRails,
    //   });
    // }
    // if (action == selectionAction.VIEW) {
    //   rail_editor._cellEditor_action = action;

    //   const newRails = state.present.map((rail) => {
    //     return railController_(
    //       rail,
    //       payload,
    //       setSelectedCellForReadStyle,
    //       (cell) => {},
    //       (cell) => ({ ...cell, isSelected: false })
    //     );
    //   });
    //   return setState((draft) => {
    //     return {
    //       ...draft,
    //       present: newRails,
    //     };
    //   });
    // }
    // if (action == cellAction.REVERSE) {
    //   try {
    //     const newRails = state.present.map((rail) => {
    //       if ("customLabels" in rail) {
    //         const reversedCustomLabels = [...rail.customLabels].reverse();
    //         return { ...rail, customLabels: reversedCustomLabels };
    //       }
    //       return rail;
    //     });

    //     const NewHistory = {
    //       type: "SET_HISTORY",
    //       value: newRails,
    //     };
    //     return HistoryChanger(NewHistory);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // if (action == cellAction.NEWSETCONTENT) {
    //   const newRails = state.present.map((rail) => {
    //     return railController_(
    //       rail,
    //       payload,
    //       setSelectedCellForReadStyle,
    //       (cell) => ({
    //         ...cell,
    //         content: {
    //           ...cell.content,
    //           text: payload.content,
    //         },
    //       }),
    //       (cell) => cell
    //     );
    //   });
    //   const NewHistory = {
    //     type: "SET_HISTORY",
    //     value: newRails,
    //   };
    //   return HistoryChanger(NewHistory);
    // }
    // if (action == cellAction.SETSYMBOL) {
    //   const newRails = state.present.map((rail) => {
    //     return railController_(
    //       rail,
    //       payload,
    //       setSelectedCellForReadStyle,
    //       (cell) => ({
    //         ...cell,
    //         symbolId: payload.symbolId,
    //       }),
    //       (cell) => cell
    //     );
    //   });
    //   const NewHistory = {
    //     type: "SET_HISTORY",
    //     value: newRails,
    //   };
    //   return HistoryChanger(NewHistory);
    // }
    // if (action == cellAction.DELETESYMBOL) {
    //   console.log("hiii");
    //   const newRails = state.present.map((rail) => {
    //     return railController_(
    //       rail,
    //       payload,
    //       setSelectedCellForReadStyle,
    //       (cell) => {
    //         let newCell = { ...cell };

    //         delete newCell.symbolId;
    //         return newCell;
    //       },
    //       (cell) => cell
    //     );
    //   });
    //   const NewHistory = {
    //     type: "SET_HISTORY",
    //     value: newRails,
    //   };
    //   return HistoryChanger(NewHistory);
    // }
    // if (action == cellAction.SPLITCOLUMN) {
    //   //requirement
    //   //action
    //   //payload.cellId
    //   function splitColumnController(cellForSplit) {
    //     function fullCellChecker(cellforSplit) {
    //       if (cellforSplit.frontId == payload.cellId) {
    //         const a = {
    //           ...cellforSplit,
    //           split: "vertical",
    //           children: [
    //             {
    //               split: "none",
    //               parentId: cellforSplit.frontId,
    //               frontId: shortid.generate(),
    //               content: {
    //                 text: "",
    //                 style: cellforSplit.content.style,
    //               },
    //               isSelected: false,
    //             },
    //             {
    //               split: "none",
    //               parentId: cellforSplit.frontId,
    //               frontId: shortid.generate(),
    //               content: {
    //                 text: "",
    //                 style: cellforSplit.content.style,
    //               },
    //               isSelected: false,
    //             },
    //           ],
    //         };

    //         return a;
    //       }
    //       return cellforSplit;
    //     }

    //     function verticalCellChecker(cellforSplit) {
    //       const mapedChildren = cellforSplit.children.map((child) => {
    //         if (child.split == "none") {
    //           return fullCellChecker(child);
    //         }
    //         if (child.split == "vertical") {
    //           return {
    //             ...child,

    //             children: verticalCellChecker(child),
    //           };
    //         }
    //         if (child.split == "horizontal") {
    //           return {
    //             ...child,

    //             children: verticalCellChecker(child),
    //           };
    //         }
    //         return child;
    //       });

    //       // return { ...cellForSplit, children: mapedChildren };
    //       return mapedChildren;
    //     }
    //     if (cellForSplit.split == "none") {
    //       return fullCellChecker(cellForSplit);
    //     }
    //     if (cellForSplit.split == "vertical") {
    //       return {
    //         ...cellForSplit,

    //         children: verticalCellChecker(cellForSplit),
    //       };
    //     }
    //     if (cellForSplit.split == "horizontal") {
    //       return {
    //         ...cellForSplit,

    //         children: verticalCellChecker(cellForSplit),
    //       };
    //     }

    //     return cellForSplit;
    //   }

    //   const findedRail = present.find(
    //     (rail) => rail.frontId === payload.railId
    //   );

    //   const newCells = findedRail.customLabels.map((item) => {
    //     return {
    //       ...item,
    //       structure: splitColumnController({
    //         ...item.structure,
    //         frontId: item.frontId,
    //       }),
    //     };
    //     // return splitColumnController(item);
    //   });
    //   const newRails = present.map((rail) => {
    //     if (rail.frontId == payload.railId) {
    //       return { ...rail, customLabels: newCells };
    //     }
    //     return rail;
    //   });

    //   const NewHistory = {
    //     type: "SET_HISTORY",
    //     value: newRails,
    //   };
    //   return HistoryChanger(NewHistory);
    // }
    // if (action === cellAction.SPLITROW) {
    //   //requirement
    //   //action
    //   //payload.cellId
    //   function splitRowController(cellForSplit) {
    //     function fullCellChecker(cellforSplit) {
    //       if (cellforSplit.frontId == payload.cellId) {
    //         const a = {
    //           ...cellforSplit,

    //           // content: {
    //           //   text: "",
    //           //   style: cellforSplit.structure.content.style,
    //           // },
    //           split: "horizontal",
    //           children: [
    //             {
    //               parentId: cellforSplit.frontId,
    //               frontId: shortid.generate(),
    //               split: "none",
    //               values: null,
    //               content: {
    //                 text: "",
    //                 style: cellforSplit.content.style,
    //               },

    //               isSelected: false,
    //             },
    //             {
    //               parentId: cellforSplit.frontId,
    //               frontId: shortid.generate(),
    //               split: "none",
    //               values: null,
    //               content: {
    //                 text: "",
    //                 style: cellforSplit.content.style,
    //               },

    //               isSelected: false,
    //             },
    //           ],
    //         };

    //         return a;
    //       }
    //       return cellforSplit;
    //     }
    //     function horizontalCellChecker(cellforSplit) {
    //       const mapedChildren = cellforSplit.children.map((child) => {
    //         if (child.split == "none") {
    //           return fullCellChecker(child);
    //         }
    //         if (child.split == "vertical") {
    //           return {
    //             ...child,
    //             children: horizontalCellChecker(child),
    //           };
    //         }
    //         if (child.split == "horizontal") {
    //           return {
    //             ...child,
    //             children: horizontalCellChecker(child),
    //           };
    //         }
    //         return child;
    //       });

    //       return mapedChildren;
    //     }

    //     if (cellForSplit.split == "none") {
    //       return fullCellChecker(cellForSplit);
    //     }
    //     if (cellForSplit.split == "vertical") {
    //       return {
    //         ...cellForSplit,

    //         children: horizontalCellChecker(cellForSplit),
    //       };
    //     }
    //     if (cellForSplit.split == "horizontal") {
    //       return {
    //         ...cellForSplit,

    //         children: horizontalCellChecker(cellForSplit),
    //       };
    //     }

    //     return cellForSplit;
    //   }

    //   const findedRail = present.find(
    //     (rail) => rail.frontId === payload.railId
    //   );

    //   const newCells = findedRail.customLabels.map((item) => {
    //     return {
    //       ...item,
    //       structure: splitRowController({
    //         ...item.structure,
    //         frontId: item.frontId,
    //       }),
    //     };
    //   });
    //   const newRails = present.map((rail) => {
    //     if (rail.frontId == payload.railId) {
    //       return { ...rail, customLabels: newCells };
    //     }
    //     return rail;
    //   });

    //   const NewHistory = {
    //     type: "SET_HISTORY",
    //     value: newRails,
    //   };
    //   return HistoryChanger(NewHistory);
    // }
    // if (action === cellAction.JOINROW) {
    //   //requirement
    //   //payload.cellId
    //   //action

    //   function JoinRowController(cellForJoin) {
    //     function fullCellChecker(cellForJoin) {
    //       if (cellForJoin.frontId == payload.cellId) {
    //         const a = {
    //           ...cellForJoin,
    //           split: "none",
    //         };

    //         return a;
    //       }
    //       if (cellForJoin.frontId == payload.parentId) {
    //         const a = {
    //           ...cellForJoin,
    //           split: "none",
    //         };
    //         // delete a.parentId;
    //         return a;
    //       }

    //       return cellForJoin;
    //     }
    //     function horizontalCellChecker(cellForJoin) {
    //       const mapedChild = cellForJoin.children.map((child) => {
    //         let letIt = false;
    //         child.children?.map((c) => {
    //           if (c.children) letIt = true;
    //         });
    //         if (!letIt) {
    //           return fullCellChecker(child);
    //         } else {
    //           return {
    //             ...child,
    //             children: horizontalCellChecker(child),
    //           };
    //         }
    //       });
    //       return mapedChild;
    //     }

    //     if (cellForJoin.frontId == payload.parentId) {
    //       return fullCellChecker(cellForJoin);
    //     }
    //     if (cellForJoin.split == "vertical") {
    //       return {
    //         ...cellForJoin,
    //         children: horizontalCellChecker(cellForJoin),
    //       };
    //     }
    //     if (cellForJoin.split == "horizontal") {
    //       return {
    //         ...cellForJoin,
    //         children: horizontalCellChecker(cellForJoin),
    //       };
    //     }

    //     return cellForJoin;
    //   }

    //   const findedRail = present.find(
    //     (rail) => rail.frontId === payload.railId
    //   );

    //   const newCells = findedRail.customLabels.map((item) => {
    //     return {
    //       ...item,
    //       structure: JoinRowController({
    //         ...item.structure,
    //         frontId: item.frontId,
    //       }),
    //     };
    //   });
    //   const newRails = present.map((rail) => {
    //     if (rail.frontId == payload.railId) {
    //       return { ...rail, customLabels: newCells };
    //     }
    //     return rail;
    //   });

    //   const NewHistory = {
    //     type: "SET_HISTORY",
    //     value: newRails,
    //   };
    //   return HistoryChanger(NewHistory);
    // }
    // if (action === cellAction.JOINCOLUMN) {
    //   //requirement
    //   //payload.cellId
    //   //action

    //   function JoinColumnController(cellForJoin) {
    //     function fullCellChecker(cellForJoin) {
    //       if (cellForJoin.frontId == payload.cellId) {
    //         const a = {
    //           ...cellForJoin,
    //           split: "none",
    //           children: null,
    //         };

    //         return a;
    //       }
    //       if (cellForJoin.frontId == payload.parentId) {
    //         const a = {
    //           ...cellForJoin,
    //           split: "none",
    //           // ...cellForJoin.children[0],
    //           children: null,
    //         };
    //         // delete a.parentId;
    //         return a;
    //       }

    //       return cellForJoin;
    //     }
    //     function verticalCellChecker(cellForJoin) {
    //       const mapedChild = cellForJoin.children.map((child) => {
    //         let letIt = false;
    //         child.children?.map((c) => {
    //           if (c.children) letIt = true;
    //         });
    //         if (!letIt) {
    //           return fullCellChecker(child);
    //         } else {
    //           return {
    //             ...child,

    //             children: verticalCellChecker(child),
    //           };
    //         }
    //       });
    //       return mapedChild;
    //     }

    //     if (cellForJoin.frontId == payload.parentId) {
    //       return fullCellChecker(cellForJoin);
    //     }
    //     if (cellForJoin.split == "vertical") {
    //       return {
    //         ...cellForJoin,

    //         children: verticalCellChecker(cellForJoin),
    //       };
    //     }
    //     if (cellForJoin.split == "horizontal") {
    //       return {
    //         ...cellForJoin,

    //         children: verticalCellChecker(cellForJoin),
    //       };
    //     }

    //     return cellForJoin;
    //   }

    //   const findedRail = present.find(
    //     (rail) => rail.frontId === payload.railId
    //   );

    //   const newCells = findedRail.customLabels.map((item) => {
    //     return {
    //       ...item,
    //       structure: JoinColumnController({
    //         ...item.structure,
    //         frontId: item.frontId,
    //       }),
    //     };
    //   });
    //   const newRails = present.map((rail) => {
    //     if (rail.frontId == payload.railId) {
    //       return { ...rail, customLabels: newCells };
    //     }
    //     return rail;
    //   });

    //   const NewHistory = {
    //     type: "SET_HISTORY",
    //     value: newRails,
    //   };
    //   return HistoryChanger(NewHistory);
    // }
    // if (action === cellAction.SETFONT) {
    //   //requirement
    //   //payload.cellId == parentId
    //   //action

    //   //   if (rail.frontId == payload.railId) {
    //   //     return { ...rail, customLabels: newCells };
    //   //   }
    //   //   return rail;
    //   // });
    //   const newRails = state.present.map((rail) => {
    //     return railController_(
    //       rail,
    //       payload,
    //       setSelectedCellForReadStyle,
    //       (cell) => {
    //         return {
    //           ...cell,

    //           content: {
    //             ...cell.content,
    //             style: {
    //               ...cell.content.style,
    //               fontFamily: payload.structure,
    //             },
    //           },
    //         };
    //       },
    //       (cell) => cell
    //     );
    //   });
    //   const NewHistory = {
    //     type: "SET_HISTORY",
    //     value: newRails,
    //   };
    //   return HistoryChanger(NewHistory);
    // }
    // if (action === cellAction.FONTSTYLE) {
    //   //requirement
    //   //payload.cellId == parentId
    //   //action

    //   const newRails = state.present.map((rail) => {
    //     return railController_(
    //       rail,
    //       payload,
    //       setSelectedCellForReadStyle,
    //       (cell) => {
    //         return {
    //           ...cell,

    //           content: {
    //             ...cell.content,
    //             style: {
    //               ...cell.content.style,
    //               fontStyle: payload.structure,
    //             },
    //           },
    //         };
    //       },
    //       (cell) => cell
    //     );
    //   });

    //   const NewHistory = {
    //     type: "SET_HISTORY",
    //     value: newRails,
    //   };
    //   return HistoryChanger(NewHistory);
    // }
    // if (action === cellAction.TEXTALIGN) {
    //   //requirement
    //   //payload.cellId == parentId
    //   //action

    //   const newRails = state.present.map((rail) => {
    //     return railController_(
    //       rail,
    //       payload,
    //       setSelectedCellForReadStyle,
    //       (cell) => {
    //         return {
    //           ...cell,

    //           content: {
    //             ...cell.content,
    //             style: {
    //               ...cell.content.style,
    //               textAlign: payload.structure,
    //             },
    //           },
    //         };
    //       },
    //       (cell) => cell
    //     );
    //   });

    //   const NewHistory = {
    //     type: "SET_HISTORY",
    //     value: newRails,
    //   };
    //   return HistoryChanger(NewHistory);
    // }
    // if (action === cellAction.CHANGEFONTSIZE) {
    //   //requirement
    //   //payload.cellId == parentId
    //   //action

    //   const newRails = state.present.map((rail) => {
    //     return railController_(
    //       rail,
    //       payload,
    //       setSelectedCellForReadStyle,
    //       (cell) => {
    //         let fontSizeValue;
    //         let cellFontSize = cell.content.style.fontSize;
    //         if (payload.structure == "increment") {
    //           fontSizeValue = +cellFontSize + 1;
    //         }
    //         if (payload.structure == "decrement") {
    //           if (cell.content.style.fontSize > 1) {
    //             fontSizeValue = cellFontSize - 1;
    //           } else {
    //             fontSizeValue = 1;
    //           }
    //         }

    //         return {
    //           ...cell,

    //           content: {
    //             ...cell.content,
    //             style: {
    //               ...cell.content.style,
    //               fontSize: fontSizeValue,
    //             },
    //           },
    //         };
    //       },
    //       (cell) => cell
    //     );
    //   });

    //   const NewHistory = {
    //     type: "SET_HISTORY",
    //     value: newRails,
    //   };
    //   return HistoryChanger(NewHistory);
    // }
    // if (action === cellAction.CHANGEFONTANGLE) {
    //   //requirement
    //   //payload.cellId == parentId
    //   //action

    //   const newRails = state.present.map((rail) => {
    //     return railController_(
    //       rail,
    //       payload,
    //       setSelectedCellForReadStyle,
    //       (cell) => {
    //         let fontAngleValue;
    //         let cellFontAngle = cell.content.style.angle;
    //         if (payload.structure == "increment") {
    //           fontAngleValue = +cellFontAngle + 1;
    //         }
    //         if (payload.structure == "decrement") {
    //           // if (cell.structure.content.style.fontSize > 1) {
    //           fontAngleValue = cellFontAngle - 1;
    //           // } else {
    //           //   fontAngleValue = 1;
    //           // }
    //         }

    //         return {
    //           ...cell,

    //           content: {
    //             ...cell.content,
    //             style: {
    //               ...cell.content.style,
    //               angle: fontAngleValue,
    //             },
    //           },
    //         };
    //       },
    //       (cell) => cell
    //     );
    //   });

    //   const NewHistory = {
    //     type: "SET_HISTORY",
    //     value: newRails,
    //   };
    //   return HistoryChanger(NewHistory);
    // }
    // if (action === cellAction.CHANGECELLMARGIN) {
    //   //requirement
    //   //payload.cellId == parentId
    //   //action

    //   const newRails = state.present.map((rail) => {
    //     return railController_(
    //       rail,
    //       payload,
    //       setSelectedCellForReadStyle,
    //       (cell) => {
    //         let newMargin;
    //         let cellMargin = cell.content.style.margin;
    //         if (payload.structure == "increment") {
    //           newMargin = +cellMargin + 1;
    //         }

    //         if (payload.structure == "decrement") {
    //           if (cell.content.style.margin > 0) {
    //             newMargin = cellMargin - 1;
    //           } else {
    //             newMargin = 0;
    //           }
    //         }

    //         return {
    //           ...cell,

    //           content: {
    //             ...cell.content,
    //             style: {
    //               ...cell.content.style,
    //               margin: newMargin,
    //             },
    //           },
    //         };
    //       },
    //       (cell) => cell
    //     );
    //   });

    //   const NewHistory = {
    //     type: "SET_HISTORY",
    //     value: newRails,
    //   };
    //   return HistoryChanger(NewHistory);
    // }
    // if (action === cellAction.CHANGECELLPADDING) {
    //   //requirement
    //   //payload.cellId == parentId
    //   //action

    //   const newRails = state.present.map((rail) => {
    //     return railController_(
    //       rail,
    //       payload,
    //       setSelectedCellForReadStyle,
    //       (cell) => {
    //         let newPadding;
    //         let cellPadding = cell.content.style.padding;
    //         if (payload.structure == "increment") {
    //           newPadding = +cellPadding + 1;
    //         }
    //         if (payload.structure == "decrement") {
    //           if (cell.content.style.padding > 0) {
    //             newPadding = cellPadding - 1;
    //           } else {
    //             newPadding = 0;
    //           }
    //         }

    //         return {
    //           ...cell,

    //           content: {
    //             ...cell.content,
    //             style: {
    //               ...cell.content.style,
    //               padding: newPadding,
    //             },
    //           },
    //         };
    //       },
    //       (cell) => cell
    //     );
    //   });

    //   const NewHistory = {
    //     type: "SET_HISTORY",
    //     value: newRails,
    //   };
    //   return HistoryChanger(NewHistory);
    // }
    // if (action === cellAction.DELETECELL) {
    //   const findedRail = state.present.find(
    //     (rail) => rail.frontId === payload.railId
    //   );
    //   console.log({ payload });
    //   const newCells = findedRail.customLabels.filter(
    //     (cell) => cell.frontId !== payload.cellId
    //   );
    //   const newRails = present.map((rail) => {
    //     if (rail.frontId == payload.railId) {
    //       return { ...rail, customLabels: newCells };
    //     }
    //     return rail;
    //   });

    //   const NewHistory = {
    //     type: "SET_HISTORY",
    //     value: newRails,
    //   };
    //   return HistoryChanger(NewHistory);
    // }
    if (action === cellAction.DUPLICATECELL) {
      function cellSplitController(cell) {
        console.log({ cell });
        function fullCellChecker(cellForCheck) {
          const commonId = shortid.generate();
          return {
            ...cellForCheck,

            frontId: commonId,
            structure: {
              ...cellForCheck.structure,
              isSelected: false,
              frontId: commonId,
            },
          };
        }
        function verticalCellChecker(cellForCheck) {
          const mapedChildren = cellForCheck.structure.children.map((child) => {
            if (child.split == "none" || child?.structure?.split == "none") {
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

      const NewHistory = {
        type: "SET_HISTORY",
        value: newRails,
      };
      return HistoryChanger(NewHistory);
    }
    // if (action === cellAction.ISBACODE) {
    //   //requirement
    //   //payload.cellId == parentId
    //   //action

    //   const newRails = state.present.map((rail) => {
    //     return railController_(
    //       rail,
    //       payload,
    //       setSelectedCellForReadStyle,
    //       (cell) => {
    //         return {
    //           ...cell,
    //           isBarcode: !cell.isBarcode,
    //         };
    //       },
    //       (cell) => cell
    //     );
    //   });

    //   const NewHistory = {
    //     type: "SET_HISTORY",
    //     value: newRails,
    //   };
    //   return HistoryChanger(NewHistory);
    // }
    // if (action === cellAction.QRCODE) {
    //   //requirement
    //   //payload.cellId == parentId
    //   //action

    //   const newRails = state.present.map((rail) => {
    //     return railController_(
    //       rail,
    //       payload,
    //       setSelectedCellForReadStyle,
    //       (cell) => {
    //         return {
    //           ...cell,
    //           isQrcode: !cell.isQrcode,
    //         };
    //       },
    //       (cell) => cell
    //     );
    //   });

    //   const NewHistory = {
    //     type: "SET_HISTORY",
    //     value: newRails,
    //   };
    //   return HistoryChanger(NewHistory);
    // }
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
class PayloadCenter {
  _railId = "";
  _parentId = "";
  _cellId = "";
  _symbolId = "";
  _action = "";
  _content = "";
  _cunstomLabelStructureObj = {};

  static set railId(id = "") {
    this._railId = id;
  }
  static set parentId(parentId = "") {
    this._parentId = parentId;
  }
  static set cellId(id = "") {
    this._cellId = id;
  }
  static set action(id = "") {
    this._action = id;
  }
  static set content(content = "") {
    this._content = content;
  }
  static set symbolId(symbolId = "") {
    this._symbolId = symbolId;
  }
  static set cunstomLabelStructure(structureObj = {}) {
    this._cunstomLabelStructureObj = structureObj;
  }
  // static get railId() {
  //   return this._railId;
  // }
  // static get cellId() {
  //   return this._cellId;
  // }
  // static get action() {
  //   return this._action;
  // }
  // static get cunstomLabelStructureObj() {
  //   return this._cunstomLabelStructureObj;
  // }
}
class CellTool {
  cellId = "";
  action = "";
  #structure;
  constructor(structure = {}) {
    this.#structure = structure;
  }
  // <OPREATORS
  get SELECT() {
    return {
      _target: { ...this.#structure, isSelected: true },
      _else: { ...this.#structure, isSelected: false },
    };
  }
  get VIEW() {
    const structure = this.#structure;

    return {
      _target: { ...structure, isSelected: false },
      _else: { ...structure, isSelected: false },
    };
  }
  get SPLITCOLUMN() {
    const structure = this.#structure;
    const target = {
      ...structure,
      split: "vertical",
      children: [
        {
          split: "none",
          parentId: structure.frontId,
          frontId: shortid.generate(),
          content: {
            text: "",
            style: structure.content.style,
          },
          isSelected: false,
        },
        {
          split: "none",
          parentId: structure.frontId,
          frontId: shortid.generate(),
          content: {
            text: "",
            style: structure.content.style,
          },
          isSelected: false,
        },
      ],
    };
    return {
      _target: target,
      _else: this.#structure,
    };
  }
  get SPLITROW() {
    const structure = this.#structure;
    const target = {
      ...structure,
      split: "horizontal",
      children: [
        {
          split: "none",
          parentId: structure.frontId,
          frontId: shortid.generate(),
          content: {
            text: "",
            style: structure.content.style,
          },
          isSelected: false,
        },
        {
          split: "none",
          parentId: structure.frontId,
          frontId: shortid.generate(),
          content: {
            text: "",
            style: structure.content.style,
          },
          isSelected: false,
        },
      ],
    };
    return {
      _target: target,
      _else: this.#structure,
    };
  }
  get JOINCOLUMN() {
    const target = undefined;
    return {
      _target: target,
      _else: this.#structure,
    };
  }
  get JOINROW() {
    const target = undefined;
    return {
      _target: target,
      _else: this.#structure,
    };
  }
  get REVERSE() {
    return {
      _target: this.#structure,
      _else: this.#structure,
    };
  }
  get NEWSETCONTENT() {
    const structure = this.#structure;
    const target = {
      ...structure,
      content: {
        ...structure.content,
        text: PayloadCenter._content,
      },
    };
    return {
      _target: target,
      _else: this.#structure,
    };
  }
  get SETSYMBOL() {
    const structure = this.#structure;
    const target = {
      ...structure,
      symbolId: PayloadCenter._symbolId,
    };
    return {
      _target: target,
      _else: this.#structure,
    };
  }
  get DELETESYMBOL() {
    const structure = { ...this.#structure };
    delete structure.symbolId;

    return {
      _target: structure,
      _else: this.#structure,
    };
  }
  get SETFONT() {
    const structure = this.#structure;

    return {
      _target: {
        ...structure,
        content: {
          ...structure.content,
          style: {
            ...structure.content.style,
            fontFamily: PayloadCenter._cunstomLabelStructureObj,
          },
        },
      },
      _else: this.#structure,
    };
  }
  get FONTSTYLE() {
    const structure = this.#structure;

    return {
      _target: {
        ...structure,
        content: {
          ...structure.content,
          style: {
            ...structure.content.style,
            fontStyle: PayloadCenter._cunstomLabelStructureObj,
          },
        },
      },
      _else: this.#structure,
    };
  }
  get TEXTALIGN() {
    const structure = this.#structure;

    return {
      _target: {
        ...structure,
        content: {
          ...structure.content,
          style: {
            ...structure.content.style,
            textAlign: PayloadCenter._cunstomLabelStructureObj,
          },
        },
      },
      _else: this.#structure,
    };
  }
  get CHANGEFONTSIZE() {
    const structure = this.#structure;
    let fontSizeValue;
    let cellFontSize = structure.content.style.fontSize;

    switch (PayloadCenter._cunstomLabelStructureObj) {
      case "increment":
        fontSizeValue = Number(cellFontSize) + 1;
        break;
      case "decrement":
        if (structure.content.style.fontSize > 1)
          fontSizeValue = Number(cellFontSize) - 1;
        else fontSizeValue = 1;
        break;
    }

    return {
      _target: {
        ...structure,
        content: {
          ...structure.content,
          style: {
            ...structure.content.style,
            fontSize: fontSizeValue,
          },
        },
      },
      _else: this.#structure,
    };
  }
  get CHANGEFONTANGLE() {
    const structure = this.#structure;
    let fontAngleValue;
    let cellFontAngle = structure.content.style.angle;

    switch (PayloadCenter._cunstomLabelStructureObj) {
      case "increment":
        fontAngleValue = Number(cellFontAngle) + 1;
        break;
      case "decrement":
        fontAngleValue = cellFontAngle - 1;
        break;
    }

    return {
      _target: {
        ...structure,
        content: {
          ...structure.content,
          style: {
            ...structure.content.style,
            fontSize: fontAngleValue,
          },
        },
      },
      _else: this.#structure,
    };
  }
  get CHANGECELLMARGIN() {
    const structure = this.#structure;
    let newMargin = structure.content.style.margin;

    switch (PayloadCenter._cunstomLabelStructureObj) {
      case "increment":
        newMargin = Number(newMargin) + 1;
        break;
      case "decrement":
        if (newMargin > 0) {
          newMargin = Number(newMargin) - 1;
        } else {
          newMargin = 0;
        }
        break;
    }

    return {
      _target: {
        ...structure,
        content: {
          ...structure.content,
          style: {
            ...structure.content.style,
            margin: newMargin,
          },
        },
      },
      _else: this.#structure,
    };
  }
  get CHANGECELLPADDING() {
    const structure = this.#structure;
    let newPadding = structure.content.style.padding;

    switch (PayloadCenter._cunstomLabelStructureObj) {
      case "increment":
        newPadding = Number(newPadding) + 1;
        break;
      case "decrement":
        if (newPadding > 0) {
          newPadding = Number(newPadding) - 1;
        } else {
          newPadding = 0;
        }
        break;
    }

    return {
      _target: {
        ...structure,
        content: {
          ...structure.content,
          style: {
            ...structure.content.style,
            padding: newPadding,
          },
        },
      },
      _else: this.#structure,
    };
  }
  get DELETECELL() {
    return {
      _target: undefined,
      _else: this.#structure,
    };
  }
  get DUPLICATECELL() {
    return {
      _target: this.#structure,
      _else: this.#structure,
    };
  }
  get ISBACODE() {
    return {
      _target: { ...this.#structure, isBarcode: !this.#structure.isBarcode },
      _else: this.#structure,
    };
  }
  get QRCODE() {
    return {
      _target: { ...this.#structure, isQrcode: !this.#structure.isQrcode },
      _else: this.#structure,
    };
  }
  get UNDO() {
    return {
      _target: this.#structure,
      _else: this.#structure,
    };
  }
  get REDO() {
    return {
      _target: this.#structure,
      _else: this.#structure,
    };
  }

  static getClear_structure_from_undefined_children(
    structure = { children: [] }
  ) {
    let is_children_undefined = false;

    const children = structure.children;

    children.forEach((child) => {
      if (child === undefined) is_children_undefined = true;
    });

    if (is_children_undefined) {
      return {
        ...structure,
        split: "none",
        children: null,
      };
    } else return structure;
  }
}

class Structure {
  #structure = { split: "" };
  constructor(
    structure = {
      split: "",
    }
  ) {
    this.#structure = structure;
  }

  get structure() {
    const splitType = this.#structure.split;

    return this[splitType](this.#structure);
  }
  none(structure) {
    const { _target, _else } = new CellTool(structure)[PayloadCenter._action];

    if (PayloadCenter._parentId) {
      if (structure.parentId === PayloadCenter._parentId) {
        return _target;
      } else {
        return _else;
      }
    }

    if (PayloadCenter._cellId) {
      if (structure.frontId === PayloadCenter._cellId) {
        return _target;
      }
      return _else;

      // return structure;
    }
    return _else;
  }
  vertical(structure) {
    const mapedChildren = structure.children.map((child) => {
      const childSplitType = child.split;

      return this[childSplitType](child);
    });

    const newStructure = {
      ...structure,
      children: mapedChildren,
    };
    return CellTool.getClear_structure_from_undefined_children(newStructure);
  }
  horizontal(structure) {
    const mapedChildren = structure.children.map((child) => {
      const childSplitType = child.split;
      return this[childSplitType](child);
    });
    const newStructure = {
      ...structure,
      children: mapedChildren,
    };
    return CellTool.getClear_structure_from_undefined_children(newStructure);
  }
}
class CustomLabel {
  #_customLabel = {
    split: "",
    structure: {},
  };
  constructor(
    customLabel = {
      structure: {},
    }
  ) {
    this.#_customLabel = {
      ...customLabel,
      structure: new Structure(customLabel.structure).structure,
    };
  }

  get customLabel() {
    return this.#_customLabel;
  }
}
class CustomLabels {
  #_customLabels = [];
  constructor(customLabels = []) {
    this.#_customLabels = customLabels.map(
      (customLabel) => new CustomLabel(customLabel).customLabel
    );
  }

  get customLabels() {
    const cleanCustomLabels = this.#_customLabels.filter(
      (customLabel) => customLabel.structure !== undefined
    );

    if (PayloadCenter._action === "REVERSE") {
      return this.reverse(cleanCustomLabels);
    }
    return cleanCustomLabels;
  }
  reverse(customLabels = []) {
    return [...customLabels].reverse();
  }
}
class Rail {
  rail = {};
  constructor(
    rail = {
      customLabels: [],
    }
  ) {
    const newCustomLabels = new CustomLabels(rail.customLabels).customLabels;

    this.rail = {
      ...rail,
      customLabels: newCustomLabels,
    };
    // this.rail = this.listen_To_Action(rail);
  }
}
class Rails {
  railsArr = [];
  constructor(railsArr = []) {
    this.railsArr = railsArr.map((rail) => new Rail(rail).rail);
  }
}
