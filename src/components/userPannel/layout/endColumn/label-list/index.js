import { useEffect } from "react";
import { UserLabels_Qury } from "../../../../../helper/UserApiQueries";
import useToastReducer from "../../../../../recoil/reducer/useToastReducer";
import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../../../recoil/readStore";
import Header from "./Header";

import Labels from "./Labels";

export default function () {
  const content = useContent_Based_Language();
  const cssClass = useDynamicCssClass();
  const setLoading = useToastReducer();

  const { isLoading, data, isSuccess, error } = UserLabels_Qury();

  useEffect(() => {
    if (isLoading) {
      setLoading({
        isShow: true,
        message: "",
      });
    } else {
      setLoading({
        isShow: false,
        message: "",
      });
    }
    if (error) {
      setLoading({
        isShow: true,
        message: error,
      });
    }
  }, [data, isSuccess, isLoading, error]);

  if (data)
    return (
      <div className="w-100 h-100 d-flex flex-column align-items-center">
        <Header
          content={{
            labelList: content.userPannel.start_col.row2.listOfLabels,
            selectedLabelButton:
              content.userPannel.end_col.labelList.selectedLabelsButton,
            searchPlaceHolder:
              content.userPannel.end_col.labelList.searchPlaceHolder,
          }}
          margin={{
            ms_1: cssClass.ms_1,
            ms_2: cssClass.ms_2,
            ms_auto: cssClass.ms_auto,
          }}
          padding={{
            pe_1: cssClass.pe_1,
            pe_2: cssClass.pe_2,
          }}
        />
        <Labels labels={data.items} />
      </div>
    );
}
