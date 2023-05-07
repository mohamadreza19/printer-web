import { forwardRef } from "react";
import Label_product from "./Label_product";

export default forwardRef(({ provided, children }, ref) => {
  return (
    <div provided={provided} ref={ref} className="w-100 products-labels-box ">
      {children}
    </div>
  );
});
