import { Grid } from "@mui/material";
import { useDynamicCssClass } from "../../../../../../../../recoil/readStore";
import { Toggle_show_hide } from "../../../../../../../../styles/__ready/EditorIcons";
import Header from "./Header";
import EditorBox from "./layout/editorBox";
import SearchBox from "./layout/searchBox";

export default function () {
  const cssClass = useDynamicCssClass();
  return (
    <div
      className={"w-100 h-100 bg_info editor-end-column-r position-relative "}
    >
      <Header />
      <Grid container className={cssClass.ps_3 + " mt-4"} columns={13}>
        <Grid item lg={9} className="h-100">
          <EditorBox />
        </Grid>
        <Grid item lg={4}>
          <SearchBox />
        </Grid>
      </Grid>
      <section className="editor-searchbox-toggle-show-hide d-flex justify-content-center align-items-center">
        <Toggle_show_hide />
      </section>
    </div>
  );
}
