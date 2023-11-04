import { useRecoilState } from "recoil";
import CellBox from "./cellBox";
import { ColumnFour_justify_start } from "../../../../../../../../../../../../recoil/userEditorStore/EditorHeaderActionButton";

import { Container } from "./layout/CellsContainer";
import { Droppable } from "react-beautiful-dnd";
import { railsWidth_store } from "../../../../../../../../../../../../recoil/userEditorStore/cellsStore";
import useScreenShot from "../../../../../../../../../../../../utility/useScreenShot";
import { useState } from "react";
import styled from "styled-components";
import { useEffect } from "react";

export default function ({
  key,
  customLabels = [],
  railId,
  isFirstRail = false,
}) {
  // const cells = useCells();
  const [justify, setJustify] = useRecoilState(ColumnFour_justify_start);
  const [railsWidth, setRailsWidth] = useRecoilState(railsWidth_store);
  const [isDragging, setIsDraggingOver] = useState(false);

  //

  // const getImage = useScreenShot();
  // function changeCustomLabelsDirection(direction) {
  //   if (direction === "right") {
  //     return customLabels;
  //   } else {
  //     return [...customLabels].reverse();
  //   }
  // }

  useEffect(() => {}, []);

  return (
    <Droppable
      droppableId={railId}
      direction={"horizontal"}

      // isCombineEnabled={true}
    >
      {(provided, snapshot) => {
        setIsDraggingOver(snapshot.isDraggingOver);
        return (
          <Container
            railsWidth={railsWidth}
            isDragingOver={isDragging}
            id="test-screen"
            key={key}
            justify={justify}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {customLabels?.map((c, index) => {
              return (
                <CellBox key={index} index={index} cell={c} railId={railId} />
              );
            })}
            {provided.placeholder}
          </Container>
        );
      }}
    </Droppable>
  );
}
