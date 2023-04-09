import { atom } from "recoil";
import shortid from "shortid";
export const cells = atom({
  key: "cells",
  default: [
    {
      id: shortid.generate(),
      split: "none",
      content: "10",
      isSelected: false,
    },
    {
      id: shortid.generate(),
      split: "vertical",
      content: null,
      isSelected: false,
      children: [
        {
          id: shortid.generate(),
          split: "none",
          content: "c",
        },
        {
          id: shortid.generate(),
          split: "none",
          content: "x",
        },
      ],
    },
    {
      id: shortid.generate(),
      split: "vertical",
      content: null,
      isSelected: false,
      children: [
        {
          id: shortid.generate(),
          split: "none",
          content: "c",
        },
        {
          id: shortid.generate(),
          split: "horizontal",
          content: null,
          children: [
            {
              id: shortid.generate(),
              split: "none",
              content: "5",
            },
            {
              id: shortid.generate(),
              split: "none",
              content: "3",
            },
          ],
        },
      ],
    },
    {
      id: shortid.generate(),
      split: "horizontal",
      content: null,
      isSelected: false,
      children: [
        {
          id: shortid.generate(),
          split: "none",
          content: "c",
        },
        {
          id: shortid.generate(),
          split: "none",
          content: "فشار",
        },
      ],
    },
  ],
});
