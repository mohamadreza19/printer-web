import { useRecoilState } from "recoil";
import CellBox from "./cellBox";
import { ColumnFour_justify_start } from "../../../../../../../../../../../../recoil/userEditorStore/EditorHeaderActionButton";

import { Container } from "./layout/CellsContainer";
import { Droppable } from "react-beautiful-dnd";
import { railsWidth_store } from "../../../../../../../../../../../../recoil/userEditorStore/cellsStore";
import useScreenShot from "../../../../../../../../../../../../utility/useScreenShot";
import { useState } from "react";

export default function ({ key, customLabels = [], railId }) {
  // const cells = useCells();
  const [justify, setJustify] = useRecoilState(ColumnFour_justify_start);
  const [railsWidth, setRailsWidth] = useRecoilState(railsWidth_store);
  const [isDragging, setIsDraggingOver] = useState(false);
  //
  // const getImage = useScreenShot();

  return (
    <Container
      id="cellsBox"
      className="w-100 "
      // style={{
      //   height: `${railsWidth}px`,
      // }}
      railsWidth={railsWidth}
      isDragingOver={isDragging}
    >
      <Droppable
        droppableId={railId}
        direction="horizontal"
        isDragingOver
        // isCombineEnabled={true}
      >
        {(provided, snapshot) => {
          let contaner = document.getElementById("cellsBox");
          setIsDraggingOver(snapshot.isDraggingOver);
          return (
            <div
              id="test-screen"
              // onClick={getImage}
              // railsWidth={railsWidth}
              key={key}
              // defultWidth={}

              className={` d-flex  ${
                justify === "right"
                  ? "justify-content-end"
                  : "justify-content-start"
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {customLabels?.map((c, index) => {
                return (
                  <CellBox key={index} index={index} cell={c} railId={railId} />
                );
              })}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </Container>
  );
}
