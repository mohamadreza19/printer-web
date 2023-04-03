import { useState } from "react";
import ActionButtons_GroupOne from "./ActionButtons_GroupOne";
import ActionButtons_GroupTwo from "./ActionButtons_GroupTwo";
import IconBox from "./IconBox";

export default function () {
  const [selectedActionButton, setSelectedActionButton] = useState("select");
  function handle_setActionButton(buttonName = "select") {
    setSelectedActionButton(buttonName);
  }
  return (
    <div className="w-100 h-100 d-flex flex-column justify-content-between py-1_8rem  ">
      <article>
        <IconBox />
        <ActionButtons_GroupOne
          selectedActionButton={selectedActionButton}
          setSelectedActionButton={handle_setActionButton}
        />
      </article>
      <ActionButtons_GroupTwo />
    </div>
  );
}
