import { Link } from "react-router-dom";
import Icons from "../../../../../styles/__ready/Icons";

export default function () {
  return (
    <div className="c-pointer">
      <Link to={"/admin/control-pannel"}>
        <Icons.Raad />
      </Link>
    </div>
  );
}
