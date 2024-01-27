import { combineReducers, configureStore } from "@reduxjs/toolkit";
import projectTemplateReducer from "./project/projectTemplateSlice";
import railsReducer from "./project/rails_slice";
import projectReducer from "./project/project._slice";
import historyReducer_ from "./project/history_changer_slice";
import editeEventReducer from "./project/edit_event_slice";
import borderReducer from "./project/border_slice";

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
  },
});

export default store;
