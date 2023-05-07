import { atom, selector } from "recoil";
import shortid from "shortid";

const initialState = [
  {
    id: 1,
    createdAt: "2023-05-07T09:13:52.448Z",
    updatedAt: "2023-05-07T09:13:52.448Z",
    railNumber: 1,
    structure: {
      id: "testId",
      split: "vertical",
      qrcode: 1,
      barcode: 1,
      content: {
        text: "string",
        styleId: 2,
      },
      children: [],
      isSelected: "false",
    },
    product: {
      id: 1,
      createdAt: "2023-05-07T09:08:51.695Z",
      updatedAt: "2023-05-07T09:08:51.695Z",
      link: "https://reactrouter.com",
      width: 76,
      widthOfPrintingArea: 50,
      name: {
        id: 11,
        createdAt: "2023-05-07T09:08:51.660Z",
        updatedAt: "2023-05-07T09:08:51.660Z",
        english: "testLabel",
        persian: "لیبل تست",
        turkish: "test Etiketi",
      },
    },
  },
  // {
  //   id: shortid.generate(),
  //   split: "none",
  //   content: {
  //     values: "",
  //     style: {
  //       fontFamily: "Arial",
  //       fontSize: "14",
  //       angle: "0",
  //       textAlign: "none",
  //       fontStyle: "regular",
  //       margin: 0,
  //       padding: 0,
  //     },
  //   },
  //   wantBarcode: false,
  //   wantQr: false,
  //   width: 200,
  //   isSelected: false,
  // },
];
// const initialRailState = [
//   {
//     id: shortid.generate(),
//     // id: "rail",
//     // cells: initialState,
//     cells: [],
//   },
// ];

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

export const product_column = atom({
  key: "product_column",
  default: [
    {
      id: shortid.generate(),
      link: "string",
      name: {
        persion: " ترمینال پیچی سری آرت",
      },
      description:
        "ترمينال هاي هادي حفاظتي از لحاظ جزئيات طراحي و ويژگي ها مشابه ترمينال RTP می باشند که دارای بدنه عایقی ... ",
      width: 79,
    },
    {
      id: shortid.generate(),
      link: "string",
      name: {
        persion: " ترمینال پیچی سری آرت",
      },
      description:
        "ترمينال هاي هادي حفاظتي از لحاظ جزئيات طراحي و ويژگي ها مشابه ترمينال RTP می باشند که دارای بدنه عایقی ... ",
      width: 300,
    },
    {
      id: shortid.generate(),
      link: "string",
      name: {
        persion: " ترمینال پیچی سری آرت",
      },
      description:
        "ترمينال هاي هادي حفاظتي از لحاظ جزئيات طراحي و ويژگي ها مشابه ترمينال RTP می باشند که دارای بدنه عایقی ... ",
      width: 300,
    },
  ],
});
