import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../../../recoil/readStore";
import useFormateDate from "../../../../../utility/useFormetDate";
import Item from "./Item";

import useDeleteAlert from "../../../../../recoil/reducer/useDeleteAlert";
import { Super_AdminDelete_Admin_Mutation } from "../../../../../reactQuery/admin/callDeleteService";

export default function ({ items = [], itemContent }) {
  const lan = useLanguage();
  const navigate = useNavigate();
  const delete_entity_mutation = Super_AdminDelete_Admin_Mutation();
  const setDeleteAlert = useDeleteAlert();
  function onClick_delete(id, username) {
    const option = {
      id,
    };

    const message = `ایا از حدف ${username} مطمعا هستید`;
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
          formatDate={useFormateDate}
          navigate={navigate}
          deleteFn={() => onClick_delete(item.id, item.username)}
          navigateToAdd_printer={navigateToAdd_printer}
        />
      ))}
    </>
  );
}
