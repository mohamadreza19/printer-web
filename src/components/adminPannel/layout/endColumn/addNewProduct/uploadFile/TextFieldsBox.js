import { useDynamicCssClass } from "../../../../../../recoil/readStore";
import { TextField_small_Custom } from "../../../../../../styles/__ready/Textfields";
import Typography from "../../../../../../styles/__ready/Typography";

export default function () {
  const cssClass = useDynamicCssClass();
  return (
    <main className="w-100 px-4 pt-4">
      <article className="mt-9 d-flex">
        <section className="">
          <Typography.H8 className={"mb-1 " + cssClass.ms_3}>
            عرض محصول
          </Typography.H8>
          <TextField_small_Custom />
        </section>
        <section className={cssClass.ms_2}>
          <Typography.H8 className={"mb-1 " + cssClass.ms_3}>
            عرض محصول
          </Typography.H8>
          <TextField_small_Custom />
        </section>
      </article>
    </main>
  );
}
