import { useEffect } from "react";

import useToastReducer from "../../../../../recoil/reducer/useToastReducer";
import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../../../recoil/readStore";
import Header from "./Header";

import Labels from "./Labels";

import {
  Admin_User_LabelList_Call,
  Project_template_List_Call,
} from "../../../../../reactQuery/common/callGetService";
import { useState } from "react";
import { Add_Label_Bookmark_Mutation } from "../../../../../reactQuery/user/callPostServices";
import { Bookmark_Label_Delete } from "../../../../../reactQuery/user/callDeleteServices";
import { useTranslation } from "react-i18next";

export default function () {
  const [labelList, setLabelList] = useState([]);
  const [filteredLabelList, setFilteredLabelList] = useState([]);
  const [isAllowShowBookmarkedLabel, setIsAllowShowBookmarkedLabel] =
    useState(false);

  const [search, setSearch] = useState("");
  const content = useContent_Based_Language();
  const cssClass = useDynamicCssClass();

  const { data, isSuccess, hasNextPage, fetchNextPage } =
    Project_template_List_Call("user", search);

  const add_Label_Bookmark_ = Add_Label_Bookmark_Mutation();
  const delete_Label_Bookmark_ = Bookmark_Label_Delete();
  async function handleAdd_Bookmark(label) {
    const option = {
      id: label.id,
    };

    if (label.bookmarked === false) {
      try {
        await add_Label_Bookmark_.mutateAsync(option);

        const newLabels = labelList.map((p) => {
          const bookmarked_label_id = label.id;
          if (p.id === bookmarked_label_id) {
            return {
              ...label,
              bookmarked: true,
            };
          }
          return p;
        });

        setLabelList(newLabels);
      } catch (error) {}
    }
  }
  async function handleDeleteBookmark(label) {
    const option = {
      id: label.id,
    };

    if (label.bookmarked === true) {
      try {
        await delete_Label_Bookmark_.mutateAsync(option);
        const unBookmarked_label_id = label.id;

        const newLabels = labelList.map((la) => {
          if (la.id === unBookmarked_label_id) {
            return {
              ...label,
              bookmarked: false,
            };
          }
          return la;
        });
        setLabelList(newLabels);
      } catch (error) {}
    }
  }

  useEffect(() => {
    if (isSuccess) {
      setLabelList(data);
    }
  }, [isSuccess]);

  function onlyShowBookmarkedLabelList() {
    const newlabelList = labelList.filter((label) => {
      return label.bookmarked !== false;
    });
    return newlabelList;
  }
  useEffect(() => {
    if (isAllowShowBookmarkedLabel) {
      const newLabels = onlyShowBookmarkedLabelList();
      // setProduct_column_(newProducts);
      setFilteredLabelList(newLabels);
    } else {
      setFilteredLabelList(labelList);
    }
  }, [isAllowShowBookmarkedLabel]);
  if (data)
    return (
      <div className="w-100 h-100 d-flex flex-column align-items-center">
        <Header
          isAllowShowBookmarkedLabel={isAllowShowBookmarkedLabel}
          setIsAllowShowBookmarkedLabel={setIsAllowShowBookmarkedLabel}
          setSearch={setSearch}
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

        <Labels
          isAllowShowBookmarkedLabel={isAllowShowBookmarkedLabel}
          filteredLabelList={filteredLabelList}
          labelList={labelList}
          handleAdd_Bookmark={handleAdd_Bookmark}
          handleDeleteBookmark={handleDeleteBookmark}
          labels={data}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
        />
      </div>
    );
}
