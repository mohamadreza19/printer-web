import { useCallback, useEffect, useMemo, useState } from 'react';
// import InfiniteScroll from "react-infinite-scroller";
import InfiniteScroll from 'react-infinite-scroll-component';
import { AdminProduct_Label } from '../../../../../reactQuery/admin/callGetService';
import Header from './Header';
import Items from './Items';
import {
  Admin_User_ProductList_Call,
  Project_template_List_Call,
} from '../../../../../reactQuery/common/callGetService';
import { RedoRounded } from '@mui/icons-material';
import {
  useContent_Based_Language,
  useDynamicCssClass,
  useLanguage,
} from '../../../../../recoil/readStore';

export default function () {
  const [currentListValues, setCurrentValues] = useState(null);
  const [currentList, setCurrentList] = useState('Product');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const items = getDynamicApi(currentList, search)();
  const cssClass = useDynamicCssClass();
  const content = useContent_Based_Language();

  return (
    <div className="w-100">
      <Header
        setCurrentList={setCurrentList}
        currentList={currentList}
        setSearch={setSearch}
        search={search}
      />
      {items.isSuccess ? (
        <InfiniteScroll
          className="w-100 px-4"
          pullDownToRefreshThreshold={300}
          next={items.fetchNextPage}
          dataLength={items.data.length}
          hasMore={items.hasNextPage}
          threshold={100}
          height={768}
          scrollableTarget
        >
          <Items items={items.data} currentList={currentList} />
        </InfiniteScroll>
      ) : null}
    </div>
  );
}
function getDynamicApi(currentList, search) {
  switch (currentList) {
    case 'Product':
      return () => Admin_User_ProductList_Call('admin', search);

    case 'Label':
      return () => Project_template_List_Call('admin', search);
  }
}
