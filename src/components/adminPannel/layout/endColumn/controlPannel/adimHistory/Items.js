import Print from "../../../../../../styles/__ready/common/Print";
import Item from "./Item";

export default function ({ items, justProduct }) {
  return (
    <div className="w-100  position-relative  px-4 ">
      {items.map((item, index) => (
        <Print key={index} print={item} justProduct={justProduct} />
      ))}
    </div>
  );
}
