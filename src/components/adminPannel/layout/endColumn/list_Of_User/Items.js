import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../../../recoil/readStore";
import useFormateDate, {
  FormateDateWithExpire,
} from "../../../../../utility/useFormetDate";
import Item from "./Item";

import useDeleteAlert from "../../../../../recoil/reducer/useDeleteAlert";
import { AdminDelete_User_Mutation } from "../../../../../reactQuery/admin/callDeleteService";

export default function ({ items = [], itemContent }) {
  const lan = useLanguage();
  const navigate = useNavigate();
  const delete_entity_mutation = AdminDelete_User_Mutation();
  const setDeleteAlert = useDeleteAlert();
  function onClick_delete(id, companyName) {
    const option = {
      id,
    };

    const message = `ایا از حدف ${companyName} مطمعا هستید`;
    setDeleteAlert({
      deleteFn: () => delete_entity_mutation.mutate(option),
      isShow: true,
      message,
    });
  }
  function navigateToAdd_printer() {
    navigate("/admin/list-user-manager/add-printer");
  }
  return (
    <>
      {items.map((item, key) => (
        <Item
          itemContent={itemContent}
          key={key}
          item={item}
          language={lan}
          formatDate={FormateDateWithExpire}
          navigate={navigate}
          deleteFn={() => onClick_delete(item.id, item.companyName)}
          navigateToAdd_printer={navigateToAdd_printer}
        />
      ))}
    </>
  );
}
