import { useRecoilState } from 'recoil';
import CellBox from './cellBox';
import { ColumnFour_justify_start } from '../../../../../../../../../../../../recoil/userEditorStore/EditorHeaderActionButton';

import { Container } from './layout/CellsContainer';
import { Droppable } from 'react-beautiful-dnd';
import {
  railsLength_store,
  railsWidth_store,
} from '../../../../../../../../../../../../recoil/userEditorStore/cellsStore';
import useScreenShot from '../../../../../../../../../../../../utility/useScreenShot';
import { useState } from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useGetLabel } from '../../../../../../../../../../../../recoil/store/label';
import useLocalStorage from 'react-use-localstorage';
import { useSelector } from 'react-redux';
import { getProjectDimensions } from '../../../../../../../../../../../../redux/project/project._slice';
import MeasurementService from '../../../../../../../../../../../../utility/MeasurementService';
const measurementService = new MeasurementService();
export default function ({
  key,
  customLabels = [],
  railId,
  isFirstRail = false,
}) {
  // const cells = useCells();
  const [editor_access, _] = useLocalStorage('editor_access');
  const projectDimensions = useSelector(getProjectDimensions);

  const [isDragging, setIsDraggingOver] = useState(false);

  function get_railsWidth_based_editor_access() {
    if (editor_access === 'project/edit') {
      return projectDimensions.width;
    }
    return projectDimensions.width;
  }
  function get_railsLegth_based_editor_access() {
    if (editor_access === 'project/edit') {
      return projectDimensions.height;
    }
    return projectDimensions.width;
  }

  return (
    <Droppable droppableId={railId} direction={'horizontal'}>
      {(provided, snapshot) => {
        setIsDraggingOver(snapshot.isDraggingOver);
        return (
          <Container
            railsWidth={measurementService.mmToPx(
              get_railsWidth_based_editor_access()
            )}
            railsLength={get_railsLegth_based_editor_access()}
            paddingLeft={measurementService.borderWidthBasedDpi()}
            isDragingOver={isDragging}
            id="test-screen"
            data-rail-id={railId}
            key={key}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {customLabels?.map((c, index) => {
              return (
                <CellBox
                  projectDimensions={projectDimensions}
                  isRootCell={true}
                  key={index}
                  index={index}
                  isLast={customLabels.length - 1 === index}
                  cell={c}
                  railId={railId}
                />
              );
            })}
            {provided.placeholder}
          </Container>
        );
      }}
    </Droppable>
  );
}
