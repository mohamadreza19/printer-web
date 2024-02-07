import { Grid } from "@mui/material";
import EditorBox from "../layout/editorBox";
import { Toggle_show_hide } from "../../../../../../../../../styles/__ready/EditorIcons";
import Typography from "../../../../../../../../../styles/__ready/Typography";
import { useLanguage } from "../../../../../../../../../recoil/readStore";
import React from "react";

export default function ({ column, isShow, setShow = () => {} }) {
  const lan = useLanguage();

  const ToggleShowButton = () => {
    if (isShow) {
      return lan == "fa" ? (
        <div
          className="position-absolute"
          style={{
            top: "50%",
            // right: "",
            left: "0",
          }}
        >
          <section
            onClick={setShow}
            className=" editor-searchbox-toggle-show-hide-editorbox d-flex justify-content-center align-items-center "
          >
            <span className="rotate-180 ms-1">
              <Toggle_show_hide />
            </span>
            <Typography.H9_5 className="font-400 color-white ms-2">
              افزودن محصول
            </Typography.H9_5>
          </section>
        </div>
      ) : (
        <div
          className="position-absolute rotate-180"
          style={{
            top: "50%",
            right: "0",
            // left: "0",
          }}
        >
          <section
            onClick={setShow}
            className=" editor-searchbox-toggle-show-hide-editorbox d-flex justify-content-center align-items-center "
          >
            <Typography.H9_5 className="rotate-180 font-400 color-white ms-2">
              add product
            </Typography.H9_5>
            <span className="rotate-180 ms-1">
              <Toggle_show_hide />
            </span>
          </section>
        </div>
      );
    }
    return null;
  };

  return (
    <Grid
      key={"10"}
      item
      lg={isShow ? 14 : 9}
      className="w-100 h-100 position-relative test-ass "
    >
      <EditorBox />
      <ToggleShowButton />
    </Grid>
  );
}
