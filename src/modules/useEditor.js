import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  rails,
  selectedCellForReadStyle,
  useCellValue,
  useCell_editEventValue,
  useSetCell,
  useSetCell_editEvent,
} from "../recoil/userEditorStore/cellsStore";
import { PayloadCenter, Rails } from "../utility/editor-tools";
import { ColumnFour_redo } from "../recoil/userEditorStore/EditorHeaderActionButton";

export default function useEditor() {
  const [state, setState] = useRecoilState(rails);
  const { future, past, present } = state;
  const cell_editEvent = useCell_editEventValue();
  const setCell_editEvent = useSetCell_editEvent();
  const setSelectedCellForReadStyle = useSetRecoilState(
    selectedCellForReadStyle
  );
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

  useEffect(() => {
    PayloadCenter.setPayload = cell_editEvent;
    PayloadCenter.setSelectedCellStyleHandeler = setSelectedCellForReadStyle;

    const rail_editor = new Rails(state.present).railsArr;
    HistoryChanger({
      type: "SET_HISTORY",
      value: rail_editor,
    });
  }, [cell_editEvent.type]);
}
