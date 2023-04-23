import { useState } from "react";
import { useRecoilValue } from "recoil";
import { cells } from "../recoil/userEditorStore/cellsStore";

export const useUndoRedo = (initialState = {}) => {
  const [history, setHistory] = useState({
    past: [],
    present: initialState,
    future: [],
  });
  const { future, past, present } = history;
  const isUndoPossible = past && past.length > 0;
  const isRedoPossible = future && future.length > 0;
  const reducer = (newState) => {
    const { type = "", key = "", value = "" } = newState;
    if (type === "SET_STATE") {
      setHistory(() => {
        return {
          past: [...past, present],
          present: value,
          future: [],
        };
      });
    }
    if (type === "UNDO") {
      setHistory(() => {
        return {
          past: past.slice(0, past.length - 1),
          present: past[past.length - 1],
          future: [present, ...future],
        };
      });
    }

    if (type === "REDO") {
      setHistory(() => {
        return {
          past: [...past, present],
          present: future[0],
          future: future.slice(1),
        };
      });
    }
  };

  return {
    state: present,
    setState: (newState) => reducer(newState),
    undo: (undoType) => reducer(undoType),
    redo: (redoType) => reducer(redoType),
    pastStates: past,
    futureStates: future,
    isUndoPossible,
    isRedoPossible,
  };
};
