import { useEffect } from "react";
import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";
import shortid from "shortid";

const initialState = [
  {
    frontId: shortid.generate(),
    split: "none",
    content: {
      values: "",
      style: {
        fontFamily: "Arial",
        fontSize: "14",
        angle: "0",
        textAlign: "none",
        fontStyle: "regular",
        margin: 0,
        padding: 0,
      },
    },
    isBarcode: false,
    wantQr: false,
    width: 200,
    isSelected: false,
  },
];
const initialRailState = [
  {
    id: "rail1",
    customLabels: [],
  },
];

export const rails = atom({
  key: "rails",
  default: {
    past: [],
    present: [],
    future: [],
  },
});

export const selectedCellForReadStyle = atom({
  key: "selectedRootCell",
  default: {
    fontFamily: "",
    textAlign: "none",
    margin: 0,
  },
});
export const railsWidth_store = atom({
  key: "railsWidth",
  default: 0,
});
export const railsLength_store = atom({
  key: "railsLength",
  default: null,
});

export const product_column = atom({
  key: "product_column",
  default: [
    // {
    //   id: shortid.generate(),
    //   link: "string",
    //   name: {
    //     persion: " ترمینال پیچی سری آرت",
    //   },
    //   description:
    //     "ترمينال هاي هادي حفاظتي از لحاظ جزئيات طراحي و ويژگي ها مشابه ترمينال RTP می باشند که دارای بدنه عایقی ... ",
    //   width: 79,
    // },
    // {
    //   id: shortid.generate(),
    //   link: "string",
    //   name: {
    //     persion: " ترمینال پیچی سری آرت",
    //   },
    //   description:
    //     "ترمينال هاي هادي حفاظتي از لحاظ جزئيات طراحي و ويژگي ها مشابه ترمينال RTP می باشند که دارای بدنه عایقی ... ",
    //   width: 300,
    // },
    // {
    //   id: shortid.generate(),
    //   link: "string",
    //   name: {
    //     persion: " ترمینال پیچی سری آرت",
    //   },
    //   description:
    //     "ترمينال هاي هادي حفاظتي از لحاظ جزئيات طراحي و ويژگي ها مشابه ترمينال RTP می باشند که دارای بدنه عایقی ... ",
    //   width: 300,
    // },
  ],
});

export const cell_editEvent_store = atom({
  key: "cell_store",
  default: {
    type: "", // PADDING|PADDING/INCREMENT | PADDING/DECREMENT
    value: "",
    cellId: "",
    padrentId: "",
    symbolId: "",
  },
});

export function useCell_editEventValue() {
  const editEvent = useRecoilValue(cell_editEvent_store);

  return editEvent;
}
export function useSetCell_editEvent() {
  const setEditEvent = useSetRecoilState(cell_editEvent_store);
  return setEditEvent;
}
export const customLabels_store = atom({
  key: "customLabels_store",
  default: {
    type: "",
    value: null,
  },
});
