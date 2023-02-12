import { flexModel_1 } from "../../../styles/cssClass";
import Icons from "../../../styles/__ready/Icons";
import Typography from "../../../styles/__ready/Typography";

export default function ({ text }) {
  return (
    <section
      className={flexModel_1 + "mb-3"}
      style={{
        width: "fit-content",
        height: "fit-content",
      }}
    >
      <div
        className="bg-gray2 align-self-start p-1 ms-3"
        style={{
          width: "fit-content",
          height: "fit-content",
          borderRadius: "50%",
        }}
      >
        <Icons.Language />
      </div>

      <Typography.H6>{text}</Typography.H6>
    </section>
  );
}
