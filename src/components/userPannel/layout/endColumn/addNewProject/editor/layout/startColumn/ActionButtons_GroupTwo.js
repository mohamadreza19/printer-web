import { useShowInfoPopUp_reducer } from "../../../../../../../../recoil/userEditorStore/showInfoPopUp_store";
import Icons from "../../../../../../../../styles/__ready/Icons";

export default function () {
  const { SHOW } = useShowInfoPopUp_reducer();
  const Info = () => {
    function onClick() {
      SHOW();
    }
    return (
      <section
        className="editor-action-buttons editor-action-buttons-bg-white border-r-20 d-flex justify-content-center align-items-center mt-3 "
        onClick={onClick}
      >
        <Icons.Info size="medium_v1" />
      </section>
    );
  };
  const Backing = () => {
    return (
      <section className="editor-action-buttons editor-action-buttons-bg-white border-r-20 d-flex justify-content-center align-items-center mt-3 ">
        <Icons.Backing size="medium_v1" />
      </section>
    );
  };
  return (
    <div className="w-100 d-flex flex-column align-items-center ">
      <Info />
      <Backing />
    </div>
  );
}
