import {
  useContent_Based_Language,
  useDynamicCssClass,
  useLanguage,
} from "../../../../../../recoil/readStore";
import Icons from "../../../../../../styles/__ready/Icons";
import Typography from "../../../../../../styles/__ready/Typography";
import formatDate from "../../../../../../utility/useFormetDate";
export default function ({
  item = {
    createdAt: "",
    label: {
      createdAt: "",
      printCount: "",
      name: {
        persian: "",
        english: "",
        turkish: "",
      },
    },
    project: {
      productsCount: 1,
      printsCount: 2,
    },
    user: {
      companyName: "",
      username: "",
    },
  },
  displayPriority,
}) {
  const language = useLanguage();
  const cssClass = useDynamicCssClass();
  function handleShowprintCount() {
    if (item.label) {
      return item.label.printCount;
    }
    if (item.project) {
      return item.project.printsCount;
    }
    return 0;
  }
  const content =
    useContent_Based_Language().AdminPannel.end_col.view_Print_Statistics.item;
  return (
    <div className="height-62 d-flex  align-items-center border border-r-20 px-4 my-2"></div>
  );
}
