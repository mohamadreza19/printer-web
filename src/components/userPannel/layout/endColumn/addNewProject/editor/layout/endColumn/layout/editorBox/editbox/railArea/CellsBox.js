import CellBox from "./cellBox";

export default function ({ children, key, cell }) {
  return (
    <div key={key} className="edit-rail d-flex">
      {cell.map((c, index) => {
        return <CellBox key={index} cell={c} cellWidth={74} />;
      })}
    </div>
  );
}
