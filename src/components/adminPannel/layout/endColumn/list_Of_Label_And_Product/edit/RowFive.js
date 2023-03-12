import useAdmin_Add_Product from "../../../../../../controller/Admin-add-product-label/useAdmin_Add_Product";
import Buttons from "../../../../../../styles/__ready/Buttons";
import Typography from "../../../../../../styles/__ready/Typography";

export default function () {
  const { handleSubmit_FirstPage } = useAdmin_Add_Product();

  return (
    <article className="w-100 d-flex justify-content-end">
      <Buttons.Contained
        onClick={() => {
          // handleSubmit_FirstPage(ff)
        }}
        className="button_large"
      >
        <Typography.H7 className="font-400">ادامه</Typography.H7>
      </Buttons.Contained>
    </article>
  );
}
