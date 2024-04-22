import { Admin_Most_Symbol } from "../../../../../../reactQuery/admin/callGetService";
import Typography from "../../../../../../styles/__ready/Typography";
import Symbol from "./Symbol";

function MonstPrintedSymbol() {
    const {data,isSuccess} = Admin_Most_Symbol()
  
  if(isSuccess)  return ( <div style={{
        minHeight:150,
        columnGap: "52px",
    }} className="w-100 d-flex flex-column align-items-center">

<Typography.H6 className="font-500">بیشترین سیمبل چاپ شده</Typography.H6>

<div style={{
    Width:70,
   Heigh:70
}} className="mt-2">

<Symbol count={data.printsCount} DeleteBtn={false} id={data.id} />

</div>

    </div> );
}

export default MonstPrintedSymbol;