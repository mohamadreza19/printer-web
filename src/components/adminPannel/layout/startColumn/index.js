import RowOne from "./RowOne";
import RowThree from "./RowThree";
import RowTwo from "./RowTwo";

export default function () {
  return (
    <div className="w-100 h-100 px-3 py-4 bg_secondray d-flex flex-column justify-content-between">
      <article>
        <RowOne />
        <RowTwo />
      </article>
      <RowThree />
    </div>
  );
}
