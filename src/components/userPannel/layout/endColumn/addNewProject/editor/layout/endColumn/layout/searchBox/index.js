import { Droppable } from "react-beautiful-dnd";
import { useDynamicCssClass } from "../../../../../../../../../../recoil/readStore";
import Bookmarks from "./Bookmarks";
import Label_product from "./Label_product";
import Labels_Products from "./Labels_Products";
import Search from "./Search";
import { useRecoilValue } from "recoil";
import { product_column } from "../../../../../../../../../../recoil/userEditorStore/cellsStore";

export default function () {
  const cssClass = useDynamicCssClass();
  const product_column_ = useRecoilValue(product_column);

  return (
    <div
      className={"w-100  " + cssClass.ps_3}
      style={{
        height: "78vh",
        // maxHeight: "89vh",
      }}
    >
      <main
        style={{ height: "400px" }}
        className={"bg-white border-r-top-right-20 pt-3 "}
      >
        <Search />
        <Bookmarks />
        <Droppable
          droppableId={"product"}
          direction="vertical"
          isDropDisabled={true}
        >
          {(provided, snapshot) => (
            <div
              className="w-100 products-labels-box"
              ref={provided.innerRef}
              // provided={provided.droppableProps}
              {...provided.droppableProps}
            >
              {product_column_.map((product, index) => {
                return (
                  <Label_product
                    product={product}
                    key={product.id}
                    index={index}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </main>
    </div>
  );
}
