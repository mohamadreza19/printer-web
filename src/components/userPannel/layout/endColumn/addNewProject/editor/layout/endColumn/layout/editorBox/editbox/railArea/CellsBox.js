import { useRecoilState } from "recoil";
import CellBox from "./cellBox";
import { ColumnFour_justify_start } from "../../../../../../../../../../../../recoil/userEditorStore/EditorHeaderActionButton";

import { Container } from "./layout/CellsContainer";
import { Droppable } from "react-beautiful-dnd";
import { railsWidth_store } from "../../../../../../../../../../../../recoil/userEditorStore/cellsStore";

export default function ({ key, customLabels = [], railId }) {
  // const cells = useCells();
  const [justify, setJustify] = useRecoilState(ColumnFour_justify_start);
  const [railsWidth, setRailsWidth] = useRecoilState(railsWidth_store);
  //

  return (
    <div className="w-100 ">
      <Droppable
        droppableId={railId}
        direction="horizontal"

        // isCombineEnabled={true}
      >
        {(provided, snapshot) => (
          <Container
            railsWidth={railsWidth}
            key={key}
            // defultWidth={}
            className={`edit-rail d-flex  ${
              justify === "right"
                ? "justify-content-end"
                : "justify-content-start"
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDragingOver={snapshot.isDraggingOver}
          >
            {customLabels?.map((c, index) => {
              return (
                <CellBox key={index} index={index} cell={c} railId={railId} />
              );
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </div>
  );
}
