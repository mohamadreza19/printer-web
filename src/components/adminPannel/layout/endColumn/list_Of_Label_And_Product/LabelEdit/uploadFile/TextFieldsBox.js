import { TextField_small_Custom } from "../../../../../../../styles/__ready/Textfields";
import Typography from "../../../../../../../styles/__ready/Typography";
//
import { useDynamicCssClass } from "../../../../../../../recoil/readStore";
import useController from "../../../../../../../helper/admin_add_product_label/control_label_dynamic_input/index";
import Icons from "../../../../../../../styles/__ready/Icons";
import { AdminLabel_findOne } from "../../../../../../../helper/AdminApiQueries";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
export default function ({
  param = {
    width: "",
    height: "",
  },
}) {
  useEffect(() => {
    meta.handeler.setWidth((draft) => ({
      ...draft,
      value: param.width,
      validateErr: "",
    }));
    meta.handeler.setHeight((draft) => ({
      ...draft,
      value: param.height,
      validateErr: "",
    }));
  }, []);
  const cssClass = useDynamicCssClass();
  const meta = useController();

  return (
    <main className="w-100 h-100 px-4 pt-2">
      <article className="mt-9 d-flex ">
        <section className="">
          <span
            className={
              "d-flex align-items-center justify-content-between mb-2 " +
              cssClass.pe_2
            }
          >
            <Typography.H8 className={" " + cssClass.ms_3}>
              عرض لیبل
            </Typography.H8>
            <Icons.LabelWidth />
          </span>

          <TextField_small_Custom
            type="number"
            value={meta.width.value}
            onChange={(e) =>
              meta.handeler.setWidth((draft) => ({
                ...draft,
                value: e.target.value,
                validateErr: "",
              }))
            }
            className="product-label-upload-file-small-input"
          />
          <Typography.H10 className="color_danger">
            {meta.width.validateErr}
          </Typography.H10>
        </section>
        <section className={cssClass.ms_2}>
          <span
            className={
              "d-flex align-items-center justify-content-between mb-2 " +
              cssClass.pe_2
            }
          >
            <Typography.H8 className={" " + cssClass.ms_3}>
              ارتفاع لیبل
            </Typography.H8>
            <Icons.LabelHeigth />
          </span>

          <TextField_small_Custom
            type="number"
            className="product-label-upload-file-small-input"
            value={meta.height.value || 0}
            onChange={(e) =>
              meta.handeler.setHeight((draft) => ({
                ...draft,
                value: e.target.value,
                validateErr: "",
              }))
            }
          />
          <Typography.H10 className="color_danger">
            {meta.height.validateErr}
          </Typography.H10>
        </section>
      </article>
    </main>
  );
}
