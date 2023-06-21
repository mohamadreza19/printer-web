import { useRecoilValue } from "recoil";
import { useDynamicCssClass } from "../../../../../recoil/readStore";
import Buttons from "../../../../../styles/__ready/Buttons";
import Icons from "../../../../../styles/__ready/Icons";
import Textfields from "../../../../../styles/__ready/Textfields";
import Typography from "../../../../../styles/__ready/Typography";
import { adminRole } from "../../../../../recoil/recoilStore";
import { useNavigate } from "react-router-dom";

export default function ({ headerContent, setSearch = () => {} }) {
  const { header, goToAdminList, goToUserList, searchBoxPlaceHolder } =
    headerContent;
  const cssClass = useDynamicCssClass();
  const role = useRecoilValue(adminRole);
  const navigate = useNavigate();
  return (
    <header className="w-100 d-flex justify-content-between pb-3 px-3 border-bottom-gray ">
      <article className="d-flex align-items-center">
        <section className="d-flex align-items-center">
          <Icons.UserList classNameForPath="fill_black" />
          <Typography.H7 className={cssClass.ms_2}>{header}</Typography.H7>
        </section>
      </article>
      <article className=" d-flex align-items-center">
        <section className={"d-flex align-items-center " + cssClass.me_2}>
          {role === "superAdmin" ? (
            <Buttons.Outlined
              className="button_extra-large_v2"
              onClick={() => navigate("/admin/list-manager")}
            >
              <Typography.H8>{goToAdminList}</Typography.H8>
            </Buttons.Outlined>
          ) : null}
        </section>
        <section className="search_box">
          <Textfields.v2_SearchBox
            placeholder={searchBoxPlaceHolder}
            onClickAndGetValeFn={setSearch}
          />
        </section>
      </article>
    </header>
  );
}
