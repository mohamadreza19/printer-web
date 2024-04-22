import "./popUp.style.css";
import Typography from "../../../../../../styles/__ready/Typography";
import { useContext, useContext_ } from "./adminHistory.context";
import { Close } from "@mui/icons-material";
import { AdminUsers } from "../../../../../../reactQuery/admin/callGetService";
import { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
function PopUp() {
  const { state, dispatch } = useContext_();
  const resposne = AdminUsers();

  function handleChangePopUp() {
    dispatch({
      type: "POPUP/CHANGE",
    });
  }
  function handleSelectUser(id, value) {
    dispatch({
      type: "USER/CHANGE",
      payload: {
        id,
        value,
      },
    });
    dispatch({
      type: "POPUP/CHANGE",
    });
  }
  if (state.show_select_user_popup)
    return (
      <div className="container border ">
        <header className="w-100 border-bottom d-flex  justify-content-between">
          <Typography.H6>لیست یوزر</Typography.H6>
          <span onClick={handleChangePopUp} className="cur-pointer">
            <Close />
          </span>
        </header>
        <InfiniteScroll
          className="w-100 px-3 "
          pullDownToRefreshThreshold={300}
          next={resposne.fetchNextPage}
          dataLength={resposne.data.length}
          hasMore={resposne.hasNextPage}
          threshold={100}
          height={580}
          scrollableTarget
        >
          <MapedItem items={resposne.data} dispatch={handleSelectUser} />
        </InfiniteScroll>
      </div>
    );
}
const MapedItem = ({ items = [], dispatch }) => {
  return items.map((item, key) => {
    return (
      <div
        key={key}
        onClick={() => dispatch(item.id, item.username)}
        className="p-3 border-bottom user"
      >
        <Typography.H6>{item.username}</Typography.H6>
      </div>
    );
  });
};
export default PopUp;
