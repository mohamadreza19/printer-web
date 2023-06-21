import { atom, selector } from "recoil";
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
