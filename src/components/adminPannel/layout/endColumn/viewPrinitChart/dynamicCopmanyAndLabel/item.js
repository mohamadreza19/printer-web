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
    user: {
      companyName: "",
      username: "",
    },
  },
  displayPriority,
}) {
  const language = useLanguage();
  const cssClass = useDynamicCssClass();
  const content =
    useContent_Based_Language().AdminPannel.end_col.view_Print_Statistics.item;
  return (
    <div className="height-62 d-flex  align-items-center border border-r-20 px-4 my-2">
      <section className=" w-25 d-flex justify-content-start">
        <Typography.H9_5 className="font-500">
          {/* شرکت تجهیز صنعت پاسارگاد */}
          {displayPriority === "product_label"
            ? item.label?.name.persian
            : item.user.companyName}
        </Typography.H9_5>
      </section>
      <section className=" w-25 ">
        <Typography.H9 className="font-400">
          {content.Created_by}: {item.user.username}
        </Typography.H9>
      </section>
      <section className="d-flex justify-content-center w-25">
        <Typography.H9 className="font-400">
          {displayPriority === "product_label"
            ? content.Last_print
            : content.Last_activity}
          :
        </Typography.H9>
        <Typography.H9
          className={"font-400 " + cssClass.ms_1}
          language={language}
        >
          {formatDate(item.createdAt, language)}
        </Typography.H9>
      </section>
      <section className="d-flex w-25 d-flex justify-content-end">
        <Typography.H9 className="font-500" language={language}>
          {item.label?.printCount || 0}
          <span className={cssClass.ms_1}>{content.print}</span>
        </Typography.H9>
        <Icons.Trade className={cssClass.ms_4} />
      </section>
    </div>
  );
}
