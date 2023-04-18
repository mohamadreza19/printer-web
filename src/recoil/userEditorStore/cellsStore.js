import { atom, selector } from "recoil";
import shortid from "shortid";
export const cells = atom({
  key: "cells",
  default: [
    {
      id: shortid.generate(),
      split: "none",
      content: {
        values: "",
        style: {
          fontFamily: "Arial",
          fontSize: "14",
          angle: "14",
          textAlign: "center",
          fontStyle: "italic",
        },
      },
      isSelected: false,
    },
    // {
    //   id: shortid.generate(),
    //   split: "none",
    //   content: {
    //     values: "",
    //     style: {
    //       fontFamily: "Arial",
    //       fontSize: "14",
    //       angle: "14",
    //       textAlign: "center",
    //       fontStyle: "bold",
    //     },
    //   },
    //   isSelected: false,
    // },
    // {
    //   id: shortid.generate(),
    //   split: "none",
    //   content: {
    //     values: "",
    //     style: {
    //       fontSize: "14",
    //       angle: "14",
    //       textAlign: "center",
    //       fontStyle: "bold",
    //     },
    //   },
    //   isSelected: false,
    // },
    // {
    //   id: "parent190",
    //   split: "vertical",
    //   isSelected: false,
    //   children: [
    //     {
    //       parentId: "parent190",
    //       id: shortid.generate(),
    //       split: "none",
    //       contents: [
    //         {
    //           id: "44",
    //           parentId: "parent190",
    //           text: "10",
    //           style: {
    //             fontSize: "14",
    //             angle: "14",
    //             textAlign: "center",
    //             fontStyle: "bold",
    //           },
    //         },
    //         {
    //           id: "49",
    //           parentId: "parent190",
    //           text: "a",
    //           style: {
    //             fontSize: "14",
    //             angle: "14",
    //             textAlign: "center",
    //             fontStyle: "bold",
    //           },
    //         },
    //       ],
    //       isSelected: false,
    //     },
    //     {
    //       parentId: "parent190",
    //       id: shortid.generate(),
    //       split: "none",
    //       contents: [
    //         {
    //           id: shortid.generate(),
    //           text: "10",
    //           style: {
    //             fontSize: "14",
    //             angle: "14",
    //             textAlign: "center",
    //             fontStyle: "bold",
    //           },
    //         },
    //         {
    //           id: shortid.generate(),
    //           text: "a",
    //           style: {
    //             fontSize: "14",
    //             angle: "14",
    //             textAlign: "center",
    //             fontStyle: "bold",
    //           },
    //         },
    //       ],
    //       isSelected: false,
    //     },
    //   ],
    // },
    // {
    //   id: "weq",
    //   split: "vertical",
    //   isSelected: false,
    //   children: [
    //     {
    //       parentId: "weq",
    //       id: shortid.generate(),
    //       split: "none",
    //       contents: [
    //         {
    //           id: shortid.generate(),
    //           text: "qw",
    //           style: {
    //             fontSize: "14",
    //             angle: "14",
    //             textAlign: "center",
    //             fontStyle: "bold",
    //           },
    //         },
    //         {
    //           id: shortid.generate(),
    //           text: "a",
    //           style: {
    //             fontSize: "14",
    //             angle: "14",
    //             textAlign: "center",
    //             fontStyle: "bold",
    //           },
    //         },
    //       ],
    //       isSelected: false,
    //     },
    //     {
    //       parentId: "weq",
    //       id: shortid.generate(),
    //       split: "none",
    //       contents: [
    //         {
    //           id: shortid.generate(),
    //           text: "!",
    //           style: {
    //             fontSize: "14",
    //             angle: "14",
    //             textAlign: "center",
    //             fontStyle: "bold",
    //           },
    //         },
    //         {
    //           id: shortid.generate(),
    //           text: "a",
    //           style: {
    //             fontSize: "14",
    //             angle: "14",
    //             textAlign: "center",
    //             fontStyle: "bold",
    //           },
    //         },
    //       ],
    //       isSelected: false,
    //     },
    //   ],
    // },
    // {
    //   id: "parent21",
    //   split: "vertical",
    //   isSelected: false,
    //   split: "none",
    //   contents: [
    //     {
    //       id: shortid.generate(),
    //       text: "1",
    //       style: {
    //         fontSize: "14",
    //         angle: "14",
    //         textAlign: "center",
    //         fontStyle: "bold",
    //       },
    //     },
    //     {
    //       id: shortid.generate(),
    //       text: "0",
    //       style: {
    //         fontSize: "14",
    //         angle: "14",
    //         textAlign: "center",
    //         fontStyle: "bold",
    //       },
    //     },
    //   ],
    // },
  ],
});
export const SelectedRootCell = selector({
  key: "selectedRootCell",
  get: ({ get }) => {
    const cellsArray = get(cells);
    const a = cellsArray.find((cell) => !cell?.parentId && cell?.isSelected);
    if (!a)
      return {
        fontFamily: "Arial",
        fontSize: "14",
        angle: "14",
        textAlign: "center",
        fontStyle: "bold",
      };
    return a.content.style;
  },
});
