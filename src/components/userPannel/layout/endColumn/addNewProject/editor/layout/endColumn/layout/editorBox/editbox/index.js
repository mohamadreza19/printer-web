import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useDynamicCssClass } from "../../../../../../../../../../../recoil/readStore";
import {} from "../../../../../../../../../../../styles/__ready/EditorIcons";
import Icons from "../../../../../../../../../../../styles/__ready/Icons";
import Typography from "../../../../../../../../../../../styles/__ready/Typography";
import RailArea from "./railArea";

import { rails } from "../../../../../../../../../../../recoil/userEditorStore/cellsStore";
import { ColumnFour_justify_start } from "../../../../../../../../../../../recoil/userEditorStore/EditorHeaderActionButton";
import { addRail } from "../../../../../../../../../../../recoil/userEditorStore/railAriaButton";

import { useEffect, useState } from "react";

import scaleStore from "../../../../../../../../../../../recoil/userEditorStore/scaleStore";
import ScaleContainer from "./layout/ScaleContainer";

import useToastReducer from "../../../../../../../../../../../recoil/reducer/useToastReducer";
import useRailReducer from "../../../../../../../../../../../recoil/reducer/editor/useRailReducer";
import { useParams } from "react-router-dom";
import { UserProjectFindOne_Qury } from "../../../../../../../../../../../reactQuery/user/callGetService";
import project_store from "../../../../../../../../../../../recoil/store/user/project_store";
import { setUser_project_findOne } from "../../../../../../../../../../../reactQuery/querykey/user_key";

//  data = {
//   frontId: 112,
//   createdBy: "ewrewrew",
//   customLabels: Array(0),
//   numberOfRails: 1,
//   projectName: "werewr",
//   userId: 1,
// };

export default function () {
  const { error, data, isLoading, isSuccess } = UserProjectFindOne_Qury();

  const setRail = useRailReducer();
  const [railsState, setRailsState] = useRecoilState(rails);
  const [justify, setJustify] = useRecoilState(ColumnFour_justify_start);

  const [wantNewRail, SetwantNewRail] = useRecoilState(addRail);
  const setLoading = useToastReducer();
  console.log({ justify });
  const [scaleState_, setScaleState] = useRecoilState(scaleStore);
  useEffect(() => {
    if (data) {
      const rails = data.rails;
      setRailsState((draft) => ({ ...draft, present: rails }));

      const direction = data.direction;
      setJustify(direction);
    }
    return () => {
      setRailsState({
        past: [],
        present: [],
        future: [],
      });
    };
  }, [isSuccess]);
  useEffect(() => {
    if (wantNewRail) {
      setRail({}, "ADDRAIL");
      SetwantNewRail(false);
    }
  }, [wantNewRail]);

  const AddNewRailButton = () => {
    function onClick() {
      SetwantNewRail(true);
    }
    return (
      <div onClick={onClick} className={"add-new-rail-btn "}>
        <Typography.H9 className="color-white font-400">ریل جدید</Typography.H9>
        <Icons.Plus />
      </div>
    );
  };

  return (
    <div className=" bg-white scrollable-x-large position-relative">
      <ScaleContainer
        scale={scaleState_}
        className={"w-100  dir-ltr pe-7rem pt-5   border-r-bottom-20"}
      >
        {railsState.present?.map((rail, index) => {
          return (
            <RailArea
              key={index}
              rail={rail}
              deleteRail={() => setRail({ railId: rail.frontId }, "DELETERAIL")}
            />
          );
        })}
        <AddNewRailButton />
      </ScaleContainer>
    </div>
  );
}
