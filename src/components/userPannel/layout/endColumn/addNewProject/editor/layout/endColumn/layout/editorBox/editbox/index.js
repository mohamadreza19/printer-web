import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useDynamicCssClass } from "../../../../../../../../../../../recoil/readStore";
import {} from "../../../../../../../../../../../styles/__ready/EditorIcons";
import Icons from "../../../../../../../../../../../styles/__ready/Icons";
import Typography from "../../../../../../../../../../../styles/__ready/Typography";
import RailArea from "./railArea";

import { rails } from "../../../../../../../../../../../recoil/userEditorStore/cellsStore";
import { addRail } from "../../../../../../../../../../../recoil/userEditorStore/railAriaButton";
import { useEffect } from "react";
import useRailReducer from "../../../../../../../../../../../recoil/reducer/editor/useRailReducer";
import scaleStore from "../../../../../../../../../../../recoil/userEditorStore/scaleStore";
import ScaleContainer from "./layout/ScaleContainer";
import { UserProjectFindOne_Qury } from "../../../../../../../../../../../helper/UserApiQueries";
import useToastReducer from "../../../../../../../../../../../recoil/reducer/useToastReducer";

export default function () {
  const { error, data, isLoading } = UserProjectFindOne_Qury();
  const [wantNewRail, SetwantNewRail] = useRecoilState(addRail);
  const setLoading = useToastReducer();
  const setRail = useRailReducer();
  const railsState = useRecoilValue(rails);
  const [scaleState, setScaleState] = useRecoilState(scaleStore);

  useEffect(() => {
    if (wantNewRail) {
      setRail({}, "ADDRAIL");
      console.log(railsState);
      SetwantNewRail(false);
    }
  }, [wantNewRail]);

  useEffect(() => {
    if (isLoading) {
      setLoading({
        isShow: true,
        message: "",
      });
    }
    if (data) {
      console.log(data);
      setRail((draft) => ({
        ...draft,
        present: [data],
      }));
      setLoading({
        isShow: false,
        message: "",
      });
    }
  }, [isLoading, data, error]);
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
        scale={scaleState}
        className={"w-100  dir-ltr pe-7rem pt-5   border-r-bottom-20"}
      >
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
