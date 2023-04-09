import CellsBox from "./CellsBox";
import Title from "./Title";

export default function ({ cells = [] }) {
  return (
    <div
      className="w-100 d-flex align-items-end mb-3"
      style={{
        height: "152.09px",
      }}
    >
      <article className="d-flex align-items-center">
        <Title children={"ریل اول"} />
        <CellsBox cell={cells} />
      </article>
    </div>
  );
}
