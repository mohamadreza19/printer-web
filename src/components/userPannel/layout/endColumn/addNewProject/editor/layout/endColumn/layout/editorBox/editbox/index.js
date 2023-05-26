import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useDynamicCssClass } from "../../../../../../../../../../../recoil/readStore";
import {} from "../../../../../../../../../../../styles/__ready/EditorIcons";
import Icons from "../../../../../../../../../../../styles/__ready/Icons";
import Typography from "../../../../../../../../../../../styles/__ready/Typography";
import RailArea from "./railArea";

import { rails } from "../../../../../../../../../../../recoil/userEditorStore/cellsStore";
import { addRail } from "../../../../../../../../../../../recoil/userEditorStore/railAriaButton";
import { useEffect, useState } from "react";
import useRailReducer from "../../../../../../../../../../../recoil/reducer/editor/useRailReducer";
import scaleStore from "../../../../../../../../../../../recoil/userEditorStore/scaleStore";
import ScaleContainer from "./layout/ScaleContainer";

import useToastReducer from "../../../../../../../../../../../recoil/reducer/useToastReducer";

//  data = {
//   id: 112,
//   createdBy: "ewrewrew",
//   customLabels: Array(0),
//   numberOfRails: 1,
//   projectName: "werewr",
//   userId: 1,
// };

export default function () {
  // const { error, data, isLoading } = UserProjectFindOne_Qury();
  const [wantNewRail, SetwantNewRail] = useRecoilState(addRail);
  const setLoading = useToastReducer();
  const setRail = useRailReducer();
  const [railsState, setRailsState] = useRecoilState(rails);
  const [scaleState_, setScaleState] = useRecoilState(scaleStore);

  useEffect(() => {
    if (wantNewRail) {
      setRail({}, "ADDRAIL");
      SetwantNewRail(false);
    }
  }, [wantNewRail]);

  // useEffect(() => {
  //   if (isLoading) {
  //     setLoading({
  //       isShow: true,
  //       message: "",
  //     });
  //   }
  //   if (data) {
  //     let numberOfRailsArr = [];
  //     for (let i = 0; i < data.numberOfRails; i++) {
  //       numberOfRailsArr.push(i);
  //     }

  //     const modifiedDate = { ...data };
  //     delete modifiedDate.createdAt;
  //     delete modifiedDate.deleteDate;
  //     delete modifiedDate.updatedAt;
  //     setRailsState((draft) => ({
  //       ...draft,
  //       present: [modifiedDate],
  //     }));
  //     setLoading({
  //       isShow: false,
  //       message: "",
  //     });
  //   }
  // }, [isLoading, data, error]);

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
  // const MapedRail = () => {
  //   for (let i = 0; i < data?.numberOfRails; i++) {
  //     return (
  //       <RailArea
  //         key={i}
  //         rail={railsState.present[i]}
  //         deleteRail={() => setRail({ railId: data.id }, "DELETERAIL")}
  //       />
  //     );
  //   }
  // };
  return (
    <div className=" bg-white scrollable-x-large position-relative">
      <ScaleContainer
        scale={scaleState_}
        className={"w-100  dir-ltr pe-7rem pt-5   border-r-bottom-20"}
      >
        {/* <MapedRail /> */}
        {railsState.present?.map((rail, index) => {
          return (
            <RailArea
              key={index}
              rail={rail}
              deleteRail={() => setRail({ railId: rail.id }, "DELETERAIL")}
            />
          );
        })}
        <AddNewRailButton />
      </ScaleContainer>
    </div>
  );
}
