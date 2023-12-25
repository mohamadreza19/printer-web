import { useNavigate } from "react-router-dom";
import useAdmin_CachedToken from "../../../../utility/useAdmin_CachedToken";
import RowOne from "./RowOne";
import RowThree from "./RowThree";
import RowTwo from "./RowTwo";

export default function () {
  const { value: admintoken, set } = useAdmin_CachedToken();
  const navigate = useNavigate();
  function singOut() {
    set("");
    navigate("/admin/login");
  }
  return (
    <div className="w-100 h-100 px-3 py-4 bg_secondray d-flex flex-column ">
      <article>
        <RowOne />
        <RowTwo />
      </article>
      <RowThree singOut={singOut} />
    </div>
  );
}
