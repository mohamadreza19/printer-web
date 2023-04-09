import { useSetRecoilState } from "recoil";
import SelectionAction from "../../../actions/editor/actionButton/selectionbuttons";
import {
  isSelect,
  isView,
  isUseText,
  isUseShape,
} from "../../../userEditorStore/selectionButtonsStore/actionButton";
import useCellReducer from "../../useCellReducer";
export default function () {
  const SetIsSelect = useSetRecoilState(isSelect);
  const SetIsView = useSetRecoilState(isView);
  const SetIsUseText = useSetRecoilState(isUseText);
  const SetIsUseShape = useSetRecoilState(isUseShape);
  //
  const setCell = useCellReducer();

  // for set background to selection button
  function handleOnclickSelectionButton(action = " ") {
    if (action == SelectionAction.SELECT) {
      SetIsSelect(true);
      SetIsView(false);
      SetIsUseText(false);
      SetIsUseShape(false);
    }
    if (action == SelectionAction.VIEW) {
      //for remove isSelected property from cell
      setCell("", action);
      SetIsView(true);
      SetIsSelect(false);
      SetIsUseText(false);
      SetIsUseShape(false);
    }
    if (action == SelectionAction.TEXT) {
      SetIsUseText(true);
      SetIsSelect(false);
      SetIsView(false);
      SetIsUseShape(false);
    }
    if (action == SelectionAction.SHAPE) {
      SetIsUseShape(true);
      SetIsSelect(false);
      SetIsView(false);
      SetIsUseText(false);
    }
  }

  return handleOnclickSelectionButton;
}
