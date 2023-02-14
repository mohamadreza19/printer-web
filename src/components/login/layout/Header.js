import {
  useContent_Based_Language,
  useDynamicCssClass,
} from "../../../recoil/readStore";
import { flexModel_1 } from "../../../styles/cssClass";
import Buttons from "../../../styles/__ready/Buttons";

export default function () {
  const cssClass = useDynamicCssClass();
  const content = useContent_Based_Language();

  return (
    <header
      className={
        "w-100 d-flex justify-content-between pb-4 px-4 align-items-center "
      }
    >
      <div>
        <section className="logo ">
          <img src="/svg/icon.svg" className="w-100" />
        </section>
      </div>
      <div className={cssClass.me_2}>
        <Buttons.Outlined>
          <img src="/svg/icon/support.svg" className={cssClass.me_2} />
          <section>{content.login.header.supportButton}</section>
        </Buttons.Outlined>
      </div>
    </header>
  );
}
