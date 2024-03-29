import { useNavigate } from "react-router-dom";
import Item from "./item";

export default function ({ items = [], currentList = "" }) {
  const naviage = useNavigate();
  function navigate_edit_product_label(type, id) {
    if (type === "product") {
      naviage(`/admin/add-product/edit/${id}`);
    }
    if (type === "label") {
      naviage(`/admin/add-label/edit/${id}`);
    }
  }
  return (
    <div className="w-100 ">
      {items?.map((item, key) => {
        return (
          <Item
            key={key}
            item={item}
            currentList={currentList}
            navigate_edit_product_label={() =>
              navigate_edit_product_label(item.type, item.id)
            }
          />
        );
      })}
    </div>
  );
}
