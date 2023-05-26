import { useLanguage } from "../../../../../recoil/readStore";
import Print from "../../../../../styles/__ready/common/Print";

export default function ({ pritns = [] }) {
  const language = useLanguage();

  return (
    <div className="w-100 h-100 mt-3 position-relative bg_white ">
      {pritns.map((print, index) => {
        return <Print print={print} key={index} language={language} />;
      })}
    </div>
  );
}
