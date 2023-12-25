import { configureStore } from "@reduxjs/toolkit";
import projectTemplateReducer from "./project/projectTemplateSlice";

const store = configureStore({
  reducer: { projectTemplateReducer },
});

export default store;
