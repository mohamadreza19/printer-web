import { combineReducers, configureStore } from "@reduxjs/toolkit";
import projectTemplateReducer from "./project/projectTemplateSlice";
import railsReducer from "./project/rails_slice";
import projectReducer from "./project/project._slice";
import historyReducer_ from "./project/history_changer_slice";
import editeEventReducer from "./project/edit_event_slice";
import borderReducer from "./project/border_slice";
import productReducer from "./product/product_slice";
import toastMessageReducer from "./toastMessage/toastMessage_slice";
import selectedCellReducer from "./project/selectedCell_slice";
import muitiSelectCellReducer from "./project/multi_selectCell_slice";
import editModeReducer from "./project/edit_mode_slice";
import successReducer from "./project/success_slice";

const historyChanger = combineReducers({
  history: historyReducer_,
  editEvent: editeEventReducer,
});

const store = configureStore({
  reducer: {
    rails: railsReducer,
    project: projectReducer,
    historyChanger: historyChanger,
    customLabelsBorder: borderReducer,
    product: productReducer,
    toastMessage: toastMessageReducer,
    selectedCell: selectedCellReducer,
    muitiSelectCell: muitiSelectCellReducer,
    editMode: editModeReducer,
    projectSuccess: successReducer,
  },
});

export default store;
