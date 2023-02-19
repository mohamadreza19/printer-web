import { useDynamicCssClass } from "../../../../../recoil/readStore";
import Buttons from "../../../../../styles/__ready/Buttons";
import Icons from "../../../../../styles/__ready/Icons";
import Typography from "../../../../../styles/__ready/Typography";

export default function () {
  const cssClass = useDynamicCssClass();
  const ActionButton = () => {
    return (
      <div className={"d-flex align-items-center "}>
        <div className="">
          <Icons.Trash />
        </div>

        <div className="mx-4">
          <Icons.Edit />
        </div>
        <Buttons.Contained_Custom className="bg_primary py-3 px-3  ">
          <Icons.Print />
        </Buttons.Contained_Custom>
      </div>
    );
  };
  return (
    <div className="w-100 bg-white border py-2 px-1 d-flex align-items-center  border-r-25 mb-2">
      <section className=" d-flex align-items-center justify-content-between">
        <Typography.Body2 className={"font-bold-500 " + cssClass.ms_3}>
          موتور صنعتی 1400 وات{" "}
        </Typography.Body2>
      </section>
      <div className={"d-flex  " + cssClass.ms_auto}>
        <section className={"d-flex align-item-center " + cssClass.me_5}>
          <div>
            <Typography.Body2 className={"font-300 " + cssClass.ms_3}>
              <span className={cssClass.me_1}>
                <Icons.Persion />
              </span>
              محمد جواد حسنی
            </Typography.Body2>
          </div>
          <div>
            <Typography.Body2 className={"font-300 " + cssClass.ms_3}>
              <span className={cssClass.me_1}>
                <Icons.Stack />
              </span>
              21 محصول
            </Typography.Body2>
          </div>
          <div>
            <Typography.Body2 className={"font-300 " + cssClass.ms_3}>
              <span className={cssClass.me_1}>
                <Icons.LeftDirection />
              </span>
              راست به چپ
            </Typography.Body2>
          </div>
        </section>
        <ActionButton />
      </div>
    </div>
  );
}
