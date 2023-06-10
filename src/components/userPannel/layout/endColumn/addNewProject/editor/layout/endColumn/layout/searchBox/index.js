import { Droppable } from "react-beautiful-dnd";
import { useDynamicCssClass } from "../../../../../../../../../../recoil/readStore";
import Bookmarks from "./Bookmarks";
import Label_product from "./Label_product";

import Search from "./Search";
import { useRecoilState, useRecoilValue } from "recoil";
import { product_column } from "../../../../../../../../../../recoil/userEditorStore/cellsStore";
import {
  Admin_User_Image,
  Admin_User_ProductList_Call,
} from "../../../../../../../../../../reactQuery/common/callGetService";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect } from "react";
import { Add_Product_Bookmark_Mutation } from "../../../../../../../../../../reactQuery/user/callPostServices";
import { Bookmark_Product_Delete } from "../../../../../../../../../../reactQuery/user/callDeleteServices";
import { isAllowShowProductsBookmark_store } from "../../../../../../../../../../recoil/store/user/isAllowShowProductsBookmark_store";
import { useState } from "react";

export default function () {
  const cssClass = useDynamicCssClass();
  const [product_column_, setProduct_column_] = useRecoilState(product_column);
  const [filteredProduct_column_, setFilteredProduct_column_] = useState([]);
  const [search, setSearch] = useState("");
  const isAllowShowProductsBookmark = useRecoilValue(
    isAllowShowProductsBookmark_store
  );

  const response = Admin_User_ProductList_Call("user", search, null, null);

  // const image_mutate = Admin_User_Image("user");
  const add_product_Bookmark_ = Add_Product_Bookmark_Mutation();
  const delete_product_Bookmark_ = Bookmark_Product_Delete();

  async function handleAdd_Bookmark(product) {
    const option = {
      id: product.id,
    };
    if (!product.bookmarked) {
      try {
        await add_product_Bookmark_.mutateAsync(option);
        const findedProduct = product_column_.find((p) => p.id === product.id);

        console.log({ findedProduct });
        const newProducts = product_column_.map((p) => {
          const bookmarked_product_id = product.id;
          if (p.id === bookmarked_product_id) {
            return {
              ...product,
              bookmarked: true,
            };
          }
          return p;
        });
        console.log({ newProducts });
        setProduct_column_(newProducts);
      } catch (error) {}
    }
  }
  async function handleDeleteBookmark(product) {
    const option = {
      id: product.id,
    };

    if (product.bookmarked) {
      try {
        await delete_product_Bookmark_.mutateAsync(option);
        const unBookmarked_product_id = product.id;

        const newProducts = product_column_.map((p) => {
          if (p.id === unBookmarked_product_id) {
            return {
              ...product,
              bookmarked: false,
            };
          }
          return p;
        });
        setProduct_column_(newProducts);
      } catch (error) {}
    }
  }

  function onlyShowBookmarkedProduct() {
    const newProducts = product_column_.filter((product) => {
      return product.bookmarked !== false;
    });
    return newProducts;
  }
  useEffect(() => {
    setProduct_column_(response.data);
  }, [response.data?.length, search]);

  useEffect(() => {
    if (isAllowShowProductsBookmark) {
      const newProducts = onlyShowBookmarkedProduct();
      // setProduct_column_(newProducts);
      setFilteredProduct_column_(newProducts);
    } else {
      setFilteredProduct_column_(product_column_);
    }
  }, [isAllowShowProductsBookmark]);

  if (product_column_.length >= 0)
    return (
      <div
        className={"w-100  " + cssClass.ps_3}
        style={{
          height: "78vh",
        }}
      >
        <main className={"bg-white border-r-top-right-20 pt-3 "}>
          <Search setSearch={setSearch} />
          <Bookmarks BookmarkedList={onlyShowBookmarkedProduct()} />
          <Droppable
            droppableId={"product"}
            direction="vertical"
            isDropDisabled={true}
          >
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <InfiniteScroll
                  hasMore={response?.hasNextPage}
                  next={response?.fetchNextPage}
                  dataLength={response?.data.length}
                  height={490}
                >
                  {/* <MapedProduct_column /> */}
                  {!isAllowShowProductsBookmark
                    ? product_column_.map((product, index) => {
                        return (
                          <Label_product
                            handleAdd_Bookmark={handleAdd_Bookmark}
                            handleDeleteBookmark={handleDeleteBookmark}
                            product={product}
                            key={product.id}
                            index={index}
                          />
                        );
                      })
                    : filteredProduct_column_.map((product, index) => {
                        return (
                          <Label_product
                            handleAdd_Bookmark={handleAdd_Bookmark}
                            handleDeleteBookmark={handleDeleteBookmark}
                            product={product}
                            key={product.id}
                            index={index}
                          />
                        );
                      })}
                  {provided.placeholder}
                </InfiniteScroll>
              </div>
            )}
          </Droppable>
        </main>
      </div>
    );
}
