import { useDynamicCssClass } from "../../../../../../recoil/readStore";
import Icons from "../../../../../../styles/__ready/Icons";
import Typography from "../../../../../../styles/__ready/Typography";

export default function () {
  const cssClass = useDynamicCssClass();
  const AccessProductBox = () => {
    const changedJustify = true
      ? "justify-content-start"
      : "justify-content-end";
    const changedBackGround = true ? "#F36523" : "rgb(238 170 139)";
    return (
      <div
        style={{
          width: "62px",
          height: "36px",
          backgroundColor: "#FBD1BD",
          borderRadius: "18px",
        }}
        className={"mt-1 d-flex align-item-center  dir-rtl " + changedJustify}
      >
        <span
          //   onClick={handleToggleAccessProduct}
          style={{
            width: "29.95px",
            height: "29.95px",
            backgroundColor: changedBackGround,
            borderRadius: "18px",
          }}
          className="transition-all-v1  "
        ></span>
      </div>
    );
  };
  return (
    <div className="w-100 border height-92  p-3 border-r-20 d-flex">
      <article
        className={"w-50 d-flex justify-content-between " + cssClass.pe_2}
      >
        <section
          className={
            "d-flex flex-column align-item-center justify-content-between "
          }
        >
          <Typography.H8 className="font-500">hp2000 pgq</Typography.H8>
          <Typography.H8>qwe0123</Typography.H8>
        </section>
        <footer
          className={
            "d-flex flex-column align-item-center justify-content-between "
          }
        >
          <Typography.H8>Mac:221.323.123.11.23</Typography.H8>
          <Typography.H8>S.n:1445822369</Typography.H8>
        </footer>
      </article>
      <article className="w-50 d-flex justify-content-between">
        <section className="d-flex align-items-end ">
          <Typography.H8 className="font-400 color_disabled">
            اتصال با پورت Lan
          </Typography.H8>
        </section>
        <footer className="d-flex">
          <section className={"d-flex align-items-center " + cssClass.me_1}>
            <AccessProductBox />
            <Typography.H7 className={cssClass.ms_2}>فعال</Typography.H7>
          </section>
          <section className="d-flex align-items-center mx-3">
            <Icons.Trash className={cssClass.me_2} />
            <Icons.Edit />
          </section>
        </footer>
      </article>
    </div>
  );
}
