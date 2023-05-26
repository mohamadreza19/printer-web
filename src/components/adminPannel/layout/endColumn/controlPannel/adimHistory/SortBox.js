import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";

import persian_fa from "react-date-object/locales/persian_fa";
import English_fa from "react-date-object/locales/gregorian_en";
//
import "react-multi-date-picker/styles/colors/yellow.css";

import { useCallback, useEffect, useState } from "react";

import useDateobject from "../../../../../../utility/useDateObject";
import useCachedLanguage from "../../../../../../utility/useCachedLanguage";

import Icons from "../../../../../../styles/__ready/Icons";
import Typography from "../../../../../../styles/__ready/Typography";
import Buttons from "../../../../../../styles/__ready/Buttons";
import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../../../../recoil/readStore";
import SortBox from "../../../../../../styles/__ready/datepicker/SortBox";
export default function ({ submitDataPickred = () => {} }) {
  return <SortBox submitDataPickred={submitDataPickred} />;
}
