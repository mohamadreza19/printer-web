import { useRecoilState } from "recoil";
import { delete_alert, toastifyStore } from "../../recoil/recoilStore";
import Typography from "./Typography";
import Icons from "./Icons";
import Buttons from "./Buttons";
import { showInfoPopUp_store } from "../../recoil/userEditorStore/showInfoPopUp_store";
import { PopUpInfo } from "../../components/userPannel/layout/endColumn/addNewProject/editor/layout/startColumn/PopUpInfo";

export const ToastContainer = ({ children }) => {
  const [toast, setToast] = useRecoilState(toastifyStore);
  const [deleteAlert, setDeleteAlert] = useRecoilState(delete_alert);
  const [showInfoPopUp, setShowInfoPopUp] = useRecoilState(showInfoPopUp_store);
  function unShowDeleteMesage() {
    setDeleteAlert((draft) => ({
      ...draft,
      isShow: false,
    }));
  }
  if (showInfoPopUp)
    return (
      <>
        <PopUpInfo setShowInfoPopUp={setShowInfoPopUp} />
        {children}
      </>
    );
  if (deleteAlert.isShow) {
    return (
      <>
        <div className="toast-box">
          <article className="delete-message-box ">
            <span>
              <Icons.Trash className="delete-message-trash-icon" />
            </span>
            <main>
              <Typography.H7 className="font-400">
                {deleteAlert.message}
              </Typography.H7>
            </main>
            <footer className="d-flex w-85 justify-content-evenly">
              <Buttons.Outlined
                className="button_medium_v01"
                onClick={unShowDeleteMesage}
              >
                <Typography.H7>منصرف شدم</Typography.H7>
              </Buttons.Outlined>
              <Buttons.Contained
                className="button_medium_v01"
                onClick={() => {
                  deleteAlert.deleteFn();
                  setDeleteAlert((draft) => ({ ...draft, isShow: false }));
                }}
              >
                <Typography.H7>حذف</Typography.H7>
              </Buttons.Contained>
            </footer>
          </article>
        </div>
        {children}
      </>
    );
  }
  return (
    <>
      {toast.isShow ? (
        <div className="toast-box">
          <article className="d-flex flex-column align-items-center">
            <section className="color-white mb-3 toast-message-box">
              <Typography.H4>{toast?.message.toString()}</Typography.H4>
            </section>
            <div className="small-toast-box">
              <section className="anime-small-child"></section>
              <section className="anime-child"></section>
              <section className="anime-small-child"></section>
              <section className="anime-small-child"></section>
              <section className="anime-child"></section>
              <section className="anime-small-child"></section>
            </div>
          </article>
        </div>
      ) : null}
      {children}
    </>
  );
};
