import { useLanguage } from "../../../../../recoil/readStore";
import Product from "./Product";

export default function ({ products = [] }) {
  const language = useLanguage();
  return (
    <div className="w-100 h-100 mt-3 position-relative bg_white  ">
      {products.map((product, index) => {
        return <Product product={product} key={index} language={language} />;
      })}
    </div>
  );
}
