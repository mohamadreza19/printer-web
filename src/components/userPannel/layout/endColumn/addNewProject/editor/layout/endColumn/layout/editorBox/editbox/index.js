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
import useLocalStorage from "react-use-localstorage";
import {
  CommonProject_templateFindOne_Qury,
  Project_templateFindOne_Qury,
} from "../../../../../../../../../../../reactQuery/common/callGetService";
import { useSetLabel } from "../../../../../../../../../../../recoil/store/label";

//  data = {
//   frontId: 112,
//   createdBy: "ewrewrew",
//   customLabels: Array(0),
//   numberOfRails: 1,
//   projectName: "werewr",
//   userId: 1,
// };
const PROJECT_EDIT = "project/edit";
const PROJECT_TEMPLATES_EDIT = "project-templates/edit";
function setFindOne_based_editor_access(editorAccess) {
  // CommonProject_templateFindOne_Qury

  switch (editorAccess) {
    case PROJECT_EDIT:
      return UserProjectFindOne_Qury();
    case PROJECT_TEMPLATES_EDIT:
      return Project_templateFindOne_Qury("admin");
      break;

    default:
      break;
  }
}
export default memo(function () {
  const [editor_access, _] = useLocalStorage("editor_access");
  const setLabel = useSetLabel();
  const [railsArr, setRailsArr] = useState([]);

  const { error, data, isLoading, isSuccess } =
    setFindOne_based_editor_access(editor_access);

  const setRail = useRailReducer();
  const [railsState, setRailsState] = useRecoilState(rails);

  const product = useRecoilValue(product_column);
  const [justify, setJustify] = useRecoilState(ColumnFour_justify_start);
  const [railsWidth, setRailsWidth] = useRecoilState(railsWidth_store);

  const [wantNewRail, SetwantNewRail] = useRecoilState(addRail);
  const setLoading = useToastReducer();

  const [scaleState_, setScaleState] = useRecoilState(scaleStore);
  useEffect(() => {
    let numberOfRails = "";
    let railsArrLength = 0;
    let myRails = [];
    let firstRailToCopy = {};
    let railWidth_data = 0;
    if (data) {
      if (product) {
        if (editor_access === PROJECT_TEMPLATES_EDIT) {
          railWidth_data = data.label.width;
          setLabel({
            width: data.label.width,
            height: data.label.height,
          });
          const Rail_temp = [
            {
              id: 13,

              // projectId: 13,
              frontId: "GvSSDkAcT",
              customLabels: [
                {
                  id: 11,
                  // createdAt: "2023-09-20T09:25:29.488Z",
                  // updatedAt: "2023-09-20T09:25:29.488Z",
                  // railId: 13,
                  frontId: "y0GhF0XpL",
                  structure: {
                    split: "none",
                    content: {
                      text: "test",
                      style: {
                        id: 11,
                        createdAt: "2023-09-20T09:25:29.459Z",
                        updatedAt: "2023-09-20T09:25:29.459Z",
                        fontFamily: "Arial",
                        fontStyle: "regular",
                        fontSize: 14,
                        angle: 0,
                        textAlign: "none",
                        textDirecton: "right",
                        padding: 0,
                        margin: 0,
                      },
                    },
                    frontId: "y0GhF0XpL",
                    isQrcode: false,
                    isBarcode: false,
                    isSelected: true,
                  },
                  product: {
                    id: 10,
                    createdAt: "2023-09-20T09:08:33.615Z",
                    updatedAt: "2023-09-20T09:08:33.615Z",
                    link: "https://web.telegram.org",
                    width: 22,
                    widthOfPrintingArea: 22,
                    name: {
                      id: 19,
                      createdAt: "2023-09-20T09:08:33.608Z",
                      updatedAt: "2023-09-20T09:08:33.608Z",
                      english: "test22",
                      persian: "test22",
                      turkish: "test22",
                    },
                    admin: {
                      id: 1,
                      createdAt: "2023-08-19T09:48:27.498Z",
                      updatedAt: "2023-08-19T09:48:27.498Z",
                      username: "raad",
                      firstName: "raad",
                      lastName: "super admin",
                      role: "superAdmin",
                      deleteDate: null,
                    },
                  },
                  productId: 10,
                },
              ],
            },
          ];

          if (data.rails[0].customLabels.length == 0) {
            myRails = Rail_temp;
          } else {
            myRails = data.rails;
          }
        } else {
          numberOfRails = data.numberOfRails;
          railsArrLength = data.rails.length;
          firstRailToCopy = { ...data.rails[0] };

          railWidth_data = data.railWidth;

          if (numberOfRails !== railsArrLength) {
            delete firstRailToCopy["id"];

            for (let i = 0; i < numberOfRails; i++) {
              myRails.push({ ...firstRailToCopy, frontId: "id-test" + i });
            }
          } else {
            myRails = data.rails;
          }
        }

        setRailsWidth(railWidth_data);
        setRailsArr(myRails);
        setRailsState((draft) => ({
          ...draft,
          present: myRails,
        }));
        // setRail({}, "ADDRAIL");
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
        id="rails-box"
        scale={scaleState_}
        className={"dir-ltr rails-box-pt   border-r-bottom-20"}
      >
        {railsState.present?.map((rail, index) => {
          return (
            <RailArea
              key={index}
              index={index}
              rail={rail}
              deleteRail={() => setRail({ railId: rail.frontId }, "DELETERAIL")}
            />
          );
        })}
        {/* {railsState.present?.map((rail, index) => {
          return (
            <RailArea
              key={index}
              rail={rail}
              deleteRail={() => setRail({ railId: rail.frontId }, "DELETERAIL")}
            />
          );
        })} */}
        <AddNewRailButton />
      </ScaleContainer>
    </div>
  );
});
