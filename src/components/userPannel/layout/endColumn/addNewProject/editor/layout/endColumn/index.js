import { Grid } from "@mui/material";
import { useDynamicCssClass } from "../../../../../../../../recoil/readStore";
import Header from "./Header";
// import EditorBox from "./layout/editorBox";
// import SearchBox from "./layout/searchBox";
import { DragDropContext } from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  product_column,
  rails,
} from "../../../../../../../../recoil/userEditorStore/cellsStore";
import ColOne from "./columns/ColOne";
import ColTwo from "./columns/ColTwo";

import { showHide_Btn } from "../../../../../../../../recoil/userEditorStore/searchboxStore";

import userEditor_DnD from "../../../../../../../../helper/userEditor_DnD";

import React from "react";

export default React.memo(function () {
  const cssClass = useDynamicCssClass();

  const [railsArray, setRailsArray] = useRecoilState(rails);

  const products = useRecoilValue(product_column);

  const [showHide, setShowHide] = useRecoilState(showHide_Btn);

  // if (is_project_sucess_edit ) return <SuccessBox />;
  return (
    <div
      className={"w-100 h-100 bg_info editor-end-column-r position-relative  "}
    >
      <Header />

      <Grid
        container
        className={`${!showHide ? cssClass.ps_3 : "px-3"} mt-4`}
        columns={13}
      >
        <DragDropContext
          onDragEnd={(result) => {
            const { destination, source, draggableId } = result;

            const findedProduct = products.find(
              (product) => product.id == draggableId
            );

            const findedRail = railsArray.present.find(
              (rail) => rail.frontId == destination.droppableId
            );

            if (findedRail && findedProduct) {
              const newRails = userEditor_DnD.create_customLabel(
                findedRail,
                findedProduct,
                destination,
                railsArray.present
              );
              setRailsArray((draft) => ({ ...draft, present: newRails }));
            }
            if (
              !findedProduct &&
              source.droppableId == findedRail.frontId &&
              destination.droppableId == findedRail.frontId
            ) {
              const newRails = userEditor_DnD.reorderCell(
                findedRail,
                draggableId,
                destination,
                source,
                railsArray.present
              );
              setRailsArray((draft) => ({ ...draft, present: newRails }));
            }
          }}
        >
          <ColOne isShow={showHide} setShow={() => setShowHide(!showHide)} />

          <ColTwo isShow={showHide} setShow={() => setShowHide(!showHide)} />
        </DragDropContext>
      </Grid>
    </div>
  );
});
