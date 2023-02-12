import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userAction } from "../actions/userAction";
import { userData } from "../recoilStore";
export const useUserReducer = () => {
  const [userDateValue, setUserDate] = useRecoilState(userData);

  function userReducer(action = { type: "", payload: "" }) {
    if (
      action == undefined ||
      action.type == undefined ||
      action.payload == undefined
    )
      throw new Error("action or action's properies is undefined");

    switch (action.type) {
      case userAction.CHANGE_NAME:
        setUserDate(() => {
          return {
            ...userDateValue,
            name: action.payload,
          };
        });
        break;
      case userAction.CHANGE_AGE:
        setUserDate(() => {
          return {
            ...userDateValue,
            age: action.payload,
          };
        });
        break;
    }
  }
  return userReducer;
  // }
};
