import CellsBox from './CellsBox';
import Title from './Title';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  labelRail_column,
  railsWidth_store,
} from '../../../../../../../../../../../../recoil/userEditorStore/cellsStore';
import Icons from '../../../../../../../../../../../../styles/__ready/Icons';
import useScreenShot from '../../../../../../../../../../../../utility/useScreenShot';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { removeRail } from '../../../../../../../../../../../../redux/project/history_changer_slice';

export default function ({
  index = 0,
  rail = {
    frontId: '',
    customLabels: [],
  },
  isLastRail = false,
  railsLength = 0,
}) {
  console.log(isLastRail);
  const dispatch = useDispatch();
  function handleDeleteRail() {
    if (railsLength == 1) return;
    const payload = {
      frontId: rail.frontId,
    };
    dispatch(removeRail(payload));
  }

  const TrashBox = () => {
    return (
      <div
        onClick={handleDeleteRail}
        className="position-absolute trash-rail-box cur-pointer delete-rail"
      >
        <Icons.Trash classNameForPath="fill_white" isForEditor />
      </div>
    );
  };

  return (
    <div
      id={rail.frontId}
      className=" d-flex rail align-items-center position-relative "
    >
      <TrashBox />
      {/* <Title children={"ریل " + (Number(index) + 1)} /> */}
      <CellsBox
        isFirstRail={index === 0}
        customLabels={rail.customLabels}
        railId={rail.frontId}
      />

      {isLastRail ? null : <Divider className="dashed-divider" />}
    </div>
  );
}
const Divider = styled.div`
  height: 1.5px;
  // background-color: red;
  // display: ${(prop) => (prop.isLastRail ? 'none' : 'block')};
  width: 100%;
  min-width: 80vw;
  position: absolute;
  top: 99%;
  border: 1.5px dashed black;
`;
