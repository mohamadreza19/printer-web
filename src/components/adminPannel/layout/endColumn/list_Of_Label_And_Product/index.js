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

<<<<<<< HEAD
  const product = AdminProduct_Label({
    // productLableFilter: currentList,
    productLableFilter: "Product",
    search,
    limit,
    page,
  });
  console.log(product);
  console.log(currentList);
  function get_MapedPage() {
    switch (currentList) {
      case "Product":
        let arr = [];

        product.data.pages.forEach((item) => {
          item.prodcuts.items.forEach((itemTwo) => {
            arr.push(itemTwo);
          });
        });

        return arr;
      case "Label":
        let arr_ = [];
        return project_template.data;

      default:
        break;
    }
  }

=======
>>>>>>> 62d5c10e2030d9df2e4702c613f150f9ddcdf498
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
<<<<<<< HEAD
          next={
            currentList === "Product"
              ? product.fetchNextPage
              : project_template.fetchNextPage
          }
          dataLength={get_MapedPage().length}
          hasMore={
            currentList === "Product"
              ? product.hasNextPage
              : project_template.hasNextPage
          }
=======
          next={items.fetchNextPage}
          dataLength={items.data.length}
          hasMore={items.hasNextPage}
>>>>>>> 62d5c10e2030d9df2e4702c613f150f9ddcdf498
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
