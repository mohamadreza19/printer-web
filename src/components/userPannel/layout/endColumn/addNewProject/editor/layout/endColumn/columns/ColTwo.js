import { Grid } from "@mui/material";
import SearchBox from "../layout/searchBox";

import { Toggle_show_hide } from "../../../../../../../../../styles/__ready/EditorIcons";
import { useProject_baseValue } from "../../../../../../../../../recoil/userEditorStore/project_base";
import CreateCustom from "../layout/createCustom";

export default function ({ isShow, setShow = () => {} }) {
  const poject_base = useProject_baseValue();
  // console.log({ poject_base });

  return (
    <Grid
      key={"11"}
      item
      lg={4}
      className={`position-relative ${isShow && "d-none"}`}
    >
      <Controller base={poject_base} />

      <div
        className="position-absolute"
        style={{
          top: poject_base === "CUSTOM" ? "5%" : "50%",
        }}
      >
        <section
          style={{}}
          onClick={setShow}
          className="editor-searchbox-toggle-show-hide-searchbox d-flex justify-content-center align-items-center"
        >
          <span>
            <Toggle_show_hide />
          </span>
        </section>
      </div>
    </Grid>
  );
}

const Controller = ({ base = "" }) => {
  switch (base) {
    case "PRODUCT":
      return <SearchBox />;
    case "CUSTOM":
      return <CreateCustom />;

    default:
      return <SearchBox />;
  }
};
