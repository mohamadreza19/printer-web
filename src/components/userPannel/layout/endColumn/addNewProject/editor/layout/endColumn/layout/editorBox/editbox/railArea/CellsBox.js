import { useRecoilState, useRecoilValue } from "recoil";
import CellBox from "./cellBox";
import { ColumnFour_justify_start } from "../../../../../../../../../../../../recoil/userEditorStore/EditorHeaderActionButton";

import { Container } from "./layout/CellsContainer";
import { Draggable, Droppable } from "react-beautiful-dnd";

export default function ({ children, key, customLabels, railId }) {
  // const cells = useCells();
  const [justify, setJustify] = useRecoilState(ColumnFour_justify_start);
  //

  return (
    <div className="w-100">
      <Droppable
        droppableId={railId}
        direction="horizontal"

        // isCombineEnabled={true}
      >
        {(provided, snapshot) => (
          <Container
            key={key}
            className={`edit-rail d-flex ${
              justify ? "justify-content-start" : "justify-content-end"
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDragingOver={snapshot.isDraggingOver}
          >
            {customLabels?.map((c, index) => {
              return (
                <CellBox
                  key={index}
                  index={index}
                  cell={c}
                  railId={railId}
                  description={c.description}
                />
              );
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </div>
  );
}
