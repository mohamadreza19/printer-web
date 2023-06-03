import { useDynamicCssClass } from "../../../../../recoil/readStore";
import Icons from "../../../../../styles/__ready/Icons";
import Typography from "../../../../../styles/__ready/Typography";

export default function ({
  itemContent = {
    createdBy: "createdBy",
    creditExpiration: "Credit Expiration",
    print: "print",
  },
  item = {
    id: "",
    username: "",
    firstName: "",
    lastName: "",
    role: "",
  },
  formatDate,
  language,
  navigate = () => {},
  deleteFn = () => {},
  navigateToAdd_printer = () => {},
}) {
  const cssClass = useDynamicCssClass();
  function navigateToEdit() {
    navigate("/admin/manager/edit/" + item.id);
  }
  console.table(item);
  return (
    <div
      style={{
        height: "62px",
      }}
      className="w-100 d-flex align-items-center  border border-r-25 p-3 my-2"
    >
      <article
        className={
          "d-flex align-item-center justify-content-between w-50 " +
          cssClass.me_5
        }
      >
        <section className={"w-50 "}>
          <Typography.H9_5 className="font-500">
            {item.username}
          </Typography.H9_5>
        </section>
        <section className={"w-50 "}>
          {/* <Typography.H9_5 className="font-400">
            <span className={cssClass.me_1}>{itemContent.createdBy}:</span>
            {item.managerName}
          </Typography.H9_5> */}
        </section>
      </article>
      <article className="d-flex align-item-center justify-content-between w-50">
        <section className="w-33 d-flex">
          <Typography.H9_5 className="font-400 text-white-space-nowrap">
            {/* <span className={cssClass.me_1}>
              {itemContent.creditExpiration}:
            </span> */}
            {/* <span>{formatDate(item.expiresIn, language, true)}</span> */}
            {/* <span>(سه ماهه)</span> */}
            {item.role}
          </Typography.H9_5>
        </section>
        <section className={`w-33 d-flex ${cssClass.me_2} ${cssClass.ms_6}`}>
          {/* <Typography.H9_5 className="font-400">
            {item.printsCount || 0} {itemContent.print}
          </Typography.H9_5> */}
        </section>
        <section className={"w-33 d-flex justify-content-end " + cssClass.pe_2}>
          {item.role !== "superAdmin" ? (
            <>
              {" "}
              <span
                className={cssClass.me_1 + " cur-pointer"}
                onClick={deleteFn}
              >
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
            </>
          ) : null}
        </section>
      </article>
    </div>
  );
}
