import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useDispatch, useSelector } from "react-redux";
import { useDynamicCssClass } from "../../../../../../../../../../../recoil/readStore";
import {} from "../../../../../../../../../../../styles/__ready/EditorIcons";
import Icons from "../../../../../../../../../../../styles/__ready/Icons";
import Typography from "../../../../../../../../../../../styles/__ready/Typography";
import RailArea from "./railArea";

import {
  product_column,
  // rails,
  railsLength_store,
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

import { useSetBorderToProntState } from "../../../../../../../../../../../recoil/userEditorStore/bordersToPrint";
import { useSetProject_baseState } from "../../../../../../../../../../../recoil/userEditorStore/project_base";
import { addRails } from "../../../../../../../../../../../redux/project/rails_slice";
import { fetchProject } from "../../../../../../../../../../../redux/project/project._slice";
import {
  addEmptyRail,
  addPresent,
  getRails,
} from "../../../../../../../../../../../redux/project/history_changer_slice";

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
const PROJECT_TEMPLATES_USER_EDIT = "project-templates/user_edit";
function setFindOne_based_editor_access(editorAccess) {
  // CommonProject_templateFindOne_Qury

  switch (editorAccess) {
    case PROJECT_EDIT:
      return UserProjectFindOne_Qury();

    case PROJECT_TEMPLATES_USER_EDIT:
      return Project_templateFindOne_Qury();
    case PROJECT_TEMPLATES_EDIT:
      return Project_templateFindOne_Qury("admin");
  }
}

export default memo(function () {
  const dispatch = useDispatch();
  const rails = useSelector(getRails);
  const [editor_access, _] = useLocalStorage("editor_access");
  const setLabel = useSetLabel();
  const [railsArr, setRailsArr] = useState([]);
  const setBordersToPrint = useSetBorderToProntState();
  const setProject_base = useSetProject_baseState();
  const { error, data, isLoading, isSuccess } =
    setFindOne_based_editor_access(editor_access);

  const setRail = useRailReducer();
  // const [railsState, setRailsState] = useRecoilState(rails);

  const product = useRecoilValue(product_column);
  const [justify, setJustify] = useRecoilState(ColumnFour_justify_start);
  const [railsWidth, setRailsWidth] = useRecoilState(railsWidth_store);
  const [railsLength, setRailsLength] = useRecoilState(railsLength_store);

  const [wantNewRail, SetwantNewRail] = useRecoilState(addRail);
  const setLoading = useToastReducer();

  const [scaleState_, setScaleState] = useRecoilState(scaleStore);
  useEffect(() => {
    let numberOfRails = "";
    let railsArrLength = 0;
    let myRails = [];
    let firstRailToCopy = {};
    let railWidth_data = 0;
    let railLength_data = 0;

    if (isSuccess) {
      setRailsLength(data.raillength);
      if ("bordersToPrint" in data) {
        setBordersToPrint(data.bordersToPrint);
      }
      if ("base" in data) {
        setProject_base(data.base);
      }
      if (data) {
        dispatch(fetchProject(data));
        dispatch(addPresent(data.rails));
        if (
          editor_access !== PROJECT_TEMPLATES_EDIT ||
          editor_access !== PROJECT_TEMPLATES_USER_EDIT
        ) {
          if (data.numberOfRails > 1 && data.rails.length === 1) {
            dispatch(addEmptyRail(data.numberOfRails - 1));
          }
        }
        // if (product) {
        //   if (
        //     editor_access === PROJECT_TEMPLATES_EDIT ||
        //     editor_access === PROJECT_TEMPLATES_USER_EDIT
        //   ) {
        //     railWidth_data = data.label.width;
        //     setLabel({
        //       width: data.label.width,
        //       height: data.label.height,
        //     });
        //     const Rail_temp = [
        //       {
        //         id: 13,
        //         // projectId: 13,
        //         frontId: "GvSSDkAcT",
        //         customLabels: [
        //           {
        //             id: 11,
        //             // createdAt: "2023-09-20T09:25:29.488Z",
        //             // updatedAt: "2023-09-20T09:25:29.488Z",
        //             // railId: 13,
        //             frontId: "y0GhF0XpL",
        //             structure: {
        //               split: "none",
        //               content: {
        //                 text: "",
        //                 style: {
        //                   id: 11,
        //                   createdAt: "2023-09-20T09:25:29.459Z",
        //                   updatedAt: "2023-09-20T09:25:29.459Z",
        //                   fontFamily: "Arial",
        //                   fontStyle: "regular",
        //                   fontSize: 14,
        //                   angle: 0,
        //                   textAlign: "none",
        //                   textDirecton: "right",
        //                   padding: 0,
        //                   margin: 0,
        //                 },
        //               },
        //               frontId: "y0GhF0XpL",
        //               isQrcode: false,
        //               isBarcode: false,
        //               isSelected: true,
        //             },
        //             product: {
        //               id: 10,
        //               createdAt: "2023-09-20T09:08:33.615Z",
        //               updatedAt: "2023-09-20T09:08:33.615Z",
        //               link: "https://web.telegram.org",
        //               width: 22,
        //               widthOfPrintingArea: 22,
        //               name: {
        //                 id: 19,
        //                 createdAt: "2023-09-20T09:08:33.608Z",
        //                 updatedAt: "2023-09-20T09:08:33.608Z",
        //                 english: "test22",
        //                 persian: "test22",
        //                 turkish: "test22",
        //               },
        //               admin: {
        //                 id: 1,
        //                 createdAt: "2023-08-19T09:48:27.498Z",
        //                 updatedAt: "2023-08-19T09:48:27.498Z",
        //                 username: "raad",
        //                 firstName: "raad",
        //                 lastName: "super admin",
        //                 role: "superAdmin",
        //                 deleteDate: null,
        //               },
        //             },
        //             productId: 10,
        //           },
        //         ],
        //       },
        //     ];
        //     if (
        //       data.rails.length == 0 ||
        //       data.rails[0].customLabels.length == 0
        //     ) {
        //       myRails = Rail_temp;
        //     } else {
        //       myRails = data.rails;
        //     }
        //   } else {
        //     numberOfRails = data.numberOfRails;
        //     railsArrLength = data.rails.length;
        //     firstRailToCopy = { ...data.rails[0] };
        //     railWidth_data = data.railWidth;
        //     if (numberOfRails !== railsArrLength) {
        //       delete firstRailToCopy["id"];
        //       for (let i = 0; i < numberOfRails; i++) {
        //         myRails.push({ ...firstRailToCopy, frontId: "id-test" + i });
        //       }
        //     } else {
        //       myRails = data.rails;
        //     }
        //   }
        //   setRailsWidth(railWidth_data);
        //   setRailsArr(myRails);
        //   setRailsState((draft) => ({
        //     ...draft,
        //     present: myRails,
        //   }));
        //   // setRail({}, "ADDRAIL");
        //   const direction = data.direction;
        //   setJustify(direction);
        // }
      }

      return () => {
        // setRailsState({
        //   past: [],
        //   present: [],
        //   future: [],
        // });
      };
    }
  }, [isSuccess]);

  if (rails.length > 0)
    return (
      <div className="dir-ltr bg-white scrollable-x-large position-relative disabled_gray2">
        <ScaleContainer
          id="rails-box"
          scale={scaleState_}
          className={"dir-ltr rails-box-pt   border-r-bottom-20"}
        >
          {rails.map((rail, index) => {
            return (
              <RailArea
                key={index}
                index={index}
                isLastRail={index === rails.length - 1}
                rail={rail}
              />
            );
          })}
        </ScaleContainer>
      </div>
    );
});
