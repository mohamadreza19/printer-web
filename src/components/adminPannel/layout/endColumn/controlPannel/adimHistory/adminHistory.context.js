import { createContext, useContext, useEffect, useReducer } from "react";
import { AdminUsers } from "../../../../../../reactQuery/admin/callGetService";
import AdimHistory from "./index";
const initalState = {
  show_select_user_popup: false,
  just_product: false,
  just_label: false,
  productId: false,
  search: "",
  user: {
    id: null,
    value: null,
  },
};
const ContextWraper = createContext();
function reducer(state = initalState, action) {
  const { type, payload } = action;

  switch (type) {
    case "POPUP/CHANGE":
      return {
        ...state,
        show_select_user_popup: !state.show_select_user_popup,
      };
    case "PRODUCT/CHANGE":
      return {
        ...state,
        just_product: true,
        just_label: false,
      };
    case "LABEL/CHANGE":
      return {
        ...state,
        just_label: true,
        just_product: false,
      };
    case "SEARCH/CHANGE":
      return {
        ...state,
        search: payload,
      };
    case "USER/CHANGE":
      return {
        ...state,
        user: payload,
        just_product: false,
        just_label: false,
      };
    case "LABEL/CLEAR":
      return {
        ...state,
        just_label: false,
      };
    case "PRODUCT/CLEAR":
      return {
        ...state,
        just_product: false,
      };
    case "ALL":
      return {
        ...state,
        just_product: false,
        just_label: false,
        user: initalState.user,
      };
  }
}

function AdminHistory() {
  // const resposne = AdminUsers();

  const [state, dispatch] = useReducer(reducer, initalState);
  return (
    <ContextWraper.Provider value={{ state, dispatch }}>
      <AdimHistory />
    </ContextWraper.Provider>
  );
}
export const useContext_ = () => useContext(ContextWraper);
export default AdminHistory;
