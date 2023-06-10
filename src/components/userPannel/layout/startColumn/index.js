import { useNavigate } from "react-router-dom";
import useCachedToken from "../../../../utility/useCachedToken";
import RowOne from "./RowOne";
import RowThree from "./RowThree";
import RowTwo from "./RowTwo";

export default function () {
  const { value: token, set } = useCachedToken();
  const navigate = useNavigate();
  function singOut() {
    set("");
    navigate("/login");
  }
  return (
    <div className="w-100 h-100 px-3 py-4 bg_secondray d-flex flex-column justify-content-between">
      <article>
        <RowOne />
        <RowTwo />
      </article>
      <RowThree singOut={singOut} />
    </div>
  );
}
