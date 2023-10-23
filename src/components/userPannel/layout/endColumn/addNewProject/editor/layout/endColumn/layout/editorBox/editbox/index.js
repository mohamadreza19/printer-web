import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useDynamicCssClass } from "../../../../../../../../../../../recoil/readStore";
import {} from "../../../../../../../../../../../styles/__ready/EditorIcons";
import Icons from "../../../../../../../../../../../styles/__ready/Icons";
import Typography from "../../../../../../../../../../../styles/__ready/Typography";
import RailArea from "./railArea";

import {
  product_column,
  rails,
  railsWidth_store,
} from "../../../../../../../../../../../recoil/userEditorStore/cellsStore";
import { ColumnFour_justify_start } from "../../../../../../../../../../../recoil/userEditorStore/EditorHeaderActionButton";
import { addRail } from "../../../../../../../../../../../recoil/userEditorStore/railAriaButton";

import { createRef, useEffect, useRef, useState } from "react";

import scaleStore from "../../../../../../../../../../../recoil/userEditorStore/scaleStore";
import ScaleContainer from "./layout/ScaleContainer";

import useToastReducer from "../../../../../../../../../../../recoil/reducer/useToastReducer";
import useRailReducer from "../../../../../../../../../../../recoil/reducer/editor/useRailReducer";

import { UserProjectFindOne_Qury } from "../../../../../../../../../../../reactQuery/user/callGetService";
import { memo } from "react";

//  data = {
//   frontId: 112,
//   createdBy: "ewrewrew",
//   customLabels: Array(0),
//   numberOfRails: 1,
//   projectName: "werewr",
//   userId: 1,
// };

export default memo(function () {
  const { error, data, isLoading, isSuccess } = UserProjectFindOne_Qury();

  const setRail = useRailReducer();
  const [railsState, setRailsState] = useRecoilState(rails);

  const product = useRecoilValue(product_column);
  const [justify, setJustify] = useRecoilState(ColumnFour_justify_start);
  const [railsWidth, setRailsWidth] = useRecoilState(railsWidth_store);

  const [wantNewRail, SetwantNewRail] = useRecoilState(addRail);
  const setLoading = useToastReducer();

  const [scaleState_, setScaleState] = useRecoilState(scaleStore);
  useEffect(() => {
    if (data) {
      if (product) {
        const rails = data.rails;
        const railWidth_data = data.railWidth;

        setRailsWidth(railWidth_data);
        setRailsState((draft) => ({
          ...draft,
          present: rails,
        }));
        const direction = data.direction;
        setJustify(direction);
      }
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
      if (railsState.present.length < 1) {
        setRail({}, "ADDRAIL");
        SetwantNewRail(false);
      }
    }
  }, [wantNewRail]);

  const AddNewRailButton = () => {
    function onClick() {
      SetwantNewRail(true);
    }
    if (railsState.present.length < 1) {
      return (
        <div
          onClick={onClick}
          className={`add-new-rail-btn ${
            railsState.present.length > 1 ? "disabled" : ""
          }`}
        >
          <Typography.H9 className="color-white font-400">
            ریل جدید
          </Typography.H9>
          <Icons.Plus />
        </div>
      );
    } else return null;
  };

  return (
    <div className="dir-ltr bg-white scrollable-x-large position-relative disabled_gray2">
      <ScaleContainer
        scale={scaleState_}
        className={"dir-ltr pe-7rem pt-5   border-r-bottom-20"}
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
});
