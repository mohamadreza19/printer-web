import { Droppable } from "react-beautiful-dnd";
import { useDynamicCssClass } from "../../../../../../../../../../recoil/readStore";
import Bookmarks from "./Bookmarks";
import Label_product from "./Label_product";

import Search from "./Search";
import { useRecoilValue } from "recoil";
import { product_column } from "../../../../../../../../../../recoil/userEditorStore/cellsStore";
import {
  Admin_User_Image,
  Admin_User_ProductList_Call,
} from "../../../../../../../../../../reactQuery/common/callGetService";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect } from "react";

export default function () {
  const cssClass = useDynamicCssClass();
  // const product_column_ = useRecoilValue(product_column);
  const response = Admin_User_ProductList_Call("user");

  if (response.data)
    return (
      <div
        className={"w-100  " + cssClass.ps_3}
        style={{
          height: "78vh",
        }}
      >
        <main className={"bg-white border-r-top-right-20 pt-3 "}>
          <Search />
          <Bookmarks />
          <Droppable
            droppableId={"product"}
            direction="vertical"
            isDropDisabled={true}
          >
            {(provided, snapshot) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <InfiniteScroll
                  hasMore={response?.hasNextPage}
                  next={response?.fetchNextPage}
                  dataLength={response?.data.length}
                  height={490}
                >
                  {response?.data.map((product, index) => {
                    return (
                      <Label_product
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
