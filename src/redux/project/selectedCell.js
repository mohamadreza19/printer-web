import { json } from "react-router-dom";

const KEY = "selectedItem";
export default function (type = "", payload) {
  switch (type) {
    case "get":
      const json = localStorage.getItem(KEY);

      return JSON.parse(json);

    case "set":
      localStorage.setItem(KEY, JSON.stringify(payload));
      break;
  }
}
export function getSelectedCellSyle() {
  const selectedCellJson = localStorage.getItem(KEY);
  const parsed = JSON.parse(selectedCellJson);

  if (parsed && "content" in parsed) {
    return parsed.content.style;
  } else {
    return {
      fontFamily: "Arial",
      fontStyle: "regular",
      fontSize: 14,
      angle: 0,
      textAlign: "none",
      textDirecton: "right",
      padding: 0,
      margin: 0,
    };
  }
}
