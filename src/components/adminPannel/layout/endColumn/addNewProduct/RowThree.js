import { TextFieldFUN_ClipBoardBadge } from "../../../../../styles/__ready/Textfields";
import {
  useDynamicCssClass,
  useContent_Based_Language,
} from "../../../../../recoil/readStore";
import Typography from "../../../../../styles/__ready/Typography";
import useAdmin_Add_Product from "../../../../../controller/Admin-add-product-label/useAdmin_Add_Product";
export default function () {
  const cssClass = useDynamicCssClass();
  const content =
    useContent_Based_Language().AdminPannel.end_col.addNew_Project_Or_Label
      .rowThree;
  const { productLinkValue, handeler } = useAdmin_Add_Product().productLink;
  return (
    <div className="mt-4_5 ">
      <Typography.H8 className={"font-400 mb-1 " + cssClass.ms_3}>
        {content.ProductLinkOnTheSite}
      </Typography.H8>
      <TextFieldFUN_ClipBoardBadge
        className=""
        value={productLinkValue}
        onChange={handeler}
      />
    </div>
  );
}
