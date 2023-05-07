import { Grid } from "@mui/material";
import SearchBox from "../layout/searchBox";

import { Toggle_show_hide } from "../../../../../../../../../styles/__ready/EditorIcons";

export default function ({ isShow, setShow = () => {} }) {
  return (
    <Grid
      key={"11"}
      item
      lg={4}
      // className={`position-relative ${isShow && "d-none"}`}
      className={`position-relative ${isShow && "d-none"}`}
    >
      <SearchBox />
      <div
        className="position-absolute"
        style={{
          top: "50%",
        }}
      >
        <section
          onClick={setShow}
          className="editor-searchbox-toggle-show-hide-searchbox d-flex justify-content-center align-items-center"
        >
          <span className="">
            <Toggle_show_hide />
          </span>
        </section>
      </div>
    </Grid>
  );
}
