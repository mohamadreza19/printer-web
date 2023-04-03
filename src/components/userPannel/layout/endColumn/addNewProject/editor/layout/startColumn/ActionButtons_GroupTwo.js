import Icons from "../../../../../../../../styles/__ready/Icons";

export default function () {
  const Info = () => {
    return (
      <section className="editor-action-buttons editor-action-buttons-bg-white border-r-20 d-flex justify-content-center align-items-center mt-3 ">
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
