import { useNavigate } from "react-router-dom";
import Item from "./item";
import useLocalStorage from "react-use-localstorage";

export default function ({ items = [], currentList = "" }) {
  const [editor_access, setEditor_access] = useLocalStorage("editor_access");
  const naviage = useNavigate();
  function navigate_edit_product_label(id) {
    if (currentList === "Product") {
      naviage(`/admin/edit-product/${id}`);
    }
    if (currentList === "Label") {
      setEditor_access("project-templates/edit");
      naviage(`/editor/${id}`);
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
              navigate_edit_product_label(item.id)
            }
          />
        );
      })}
    </div>
  );
}
