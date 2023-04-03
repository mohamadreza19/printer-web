import { useLanguage } from "../../../../../../../../recoil/readStore";
import Icons from "../../../../../../../../styles/__ready/Icons";

export default function ({ selectedActionButton, setSelectedActionButton }) {
  const language = useLanguage();
  const Select = () => {
    let changedColor = {
      bg: " ",
      iconFill: " ",
    };
    changedColor =
      selectedActionButton == "select"
        ? (changedColor = {
            bg: "editor-action-buttons-bg-primary",
            iconFill: "fill_white",
          })
        : (changedColor = {
            bg: "editor-action-buttons-bg-white",
            iconFill: "fill_primary ",
          });
    return (
      <section
        onClick={() => setSelectedActionButton("select")}
        className={
          "editor-action-buttons  border-r-20 d-flex justify-content-center align-items-center mt-3 " +
          changedColor.bg
        }
      >
        <Icons.Select_Cursor
          size="medium_v1"
          pathClassName={changedColor.iconFill}
        />
      </section>
    );
  };
  const Hand = () => {
    let changedColor = {
      bg: " ",
      iconFill: " ",
    };
    changedColor =
      selectedActionButton == "hand"
        ? (changedColor = {
            bg: "editor-action-buttons-bg-primary",
            iconFill: "fill_white",
          })
        : (changedColor = {
            bg: "editor-action-buttons-bg-white",
            iconFill: "fill_primary ",
          });
    return (
      <section
        onClick={() => setSelectedActionButton("hand")}
        className={
          "editor-action-buttons  border-r-20 d-flex justify-content-center align-items-center mt-0_8rem " +
          changedColor.bg
        }
      >
        <Icons.Hand size="medium_v1" pathClassName={changedColor.iconFill} />
      </section>
    );
  };
  const Text = () => {
    let changedColor = {
      bg: " ",
      iconFill: " ",
    };
    changedColor =
      selectedActionButton == "text"
        ? (changedColor = {
            bg: "editor-action-buttons-bg-primary",
            iconFill: "fill_white",
          })
        : (changedColor = {
            bg: "editor-action-buttons-bg-white",
            iconFill: "fill_primary ",
          });
    return (
      <section
        onClick={() => setSelectedActionButton("text")}
        className={
          "editor-action-buttons  border-r-20 d-flex justify-content-center align-items-center mt-0_8rem " +
          changedColor.bg
        }
      >
        <Icons.Text size="medium_v1" pathClassName={changedColor.iconFill} />
      </section>
    );
  };
  const Shape = () => {
    let changedColor = {
      bg: " ",
      iconFill: " ",
    };
    changedColor =
      selectedActionButton == "shape"
        ? (changedColor = {
            bg: "editor-action-buttons-bg-primary",
            iconFill: "fill_white",
          })
        : (changedColor = {
            bg: "editor-action-buttons-bg-white",
            iconFill: "fill_primary ",
          });
    return (
      <section
        onClick={() => setSelectedActionButton("shape")}
        className={
          "editor-action-buttons  border-r-20 d-flex justify-content-center align-items-center mt-0_8rem position-relative " +
          changedColor.bg
        }
      >
        <Icons.Shape size="medium_v1" pathClassName={changedColor.iconFill} />
        <div
          className={`position-absolute  ${
            language == "fa"
              ? "footer-shape-icon-box-rtl"
              : "footer-shape-icon-box-ltr"
          }`}
        >
          <Icons.Footer_Shape pathClassName={changedColor.iconFill} />
        </div>
      </section>
    );
  };

  return (
    <div className="w-100 d-flex flex-column align-items-center ">
      <Select />
      <Hand />
      <Text />
      <Shape />
    </div>
  );
}
