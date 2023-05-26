import { useDynamicCssClass } from "../../../../../recoil/readStore";
import Icons from "../../../../../styles/__ready/Icons";
import Typography from "../../../../../styles/__ready/Typography";

export default function ({
  item = {
    id: "",
    companyName: "",
    managerName: "",
    expiresIn: "",
    printsCount: "",
  },
  formatDate,
  language,
  navigate = () => {},
  deleteFn = () => {},
  navigateToAdd_printer = () => {},
}) {
  const cssClass = useDynamicCssClass();
  function navigateToEdit() {
    navigate("/admin/list-user-manager/edit/" + item.id);
  }
  return (
    <div
      style={{
        height: "62px",
      }}
      className="w-100 d-flex align-items-center  border border-r-25 p-3 my-2"
    >
      <artice
        className={
          "d-flex align-item-center justify-content-between w-50 " +
          cssClass.me_5
        }
      >
        <section className={cssClass.me_4}>
          <Typography.H9_5 className="font-500">
            {item.companyName}
          </Typography.H9_5>
        </section>
        <section className={cssClass.ms_5}>
          <Typography.H9_5 className="font-400">
            ایجاد توسط:
            {item.managerName}
          </Typography.H9_5>
        </section>
      </artice>
      <artice className="d-flex align-item-center justify-content-between w-50">
        <section>
          <Typography.H9_5 className="font-400">
            <span>انقضا اعتبار:</span>
            <span>{formatDate(item.expiresIn, language, true)}</span>
            {/* <span>(سه ماهه)</span> */}
          </Typography.H9_5>
        </section>
        <section className={`${cssClass.me_2} ${cssClass.ms_6}`}>
          <Typography.H9_5 className="font-400">۱٤۰ چاپ</Typography.H9_5>
        </section>
        <section className={" " + cssClass.pe_2}>
          <span className={cssClass.me_1 + " cur-pointer"} onClick={deleteFn}>
            <Icons.Trash />
          </span>
          <span onClick={navigateToAdd_printer} className="cur-pointer">
            <Icons.Print classNameForPath="fill_primary" />
          </span>
          <span className="mx-2 cur-pointer">
            <Icons.Trade />
          </span>
          <span onClick={navigateToEdit} className="cur-pointer">
            <Icons.Edit />
          </span>
        </section>
      </artice>
    </div>
  );
}
