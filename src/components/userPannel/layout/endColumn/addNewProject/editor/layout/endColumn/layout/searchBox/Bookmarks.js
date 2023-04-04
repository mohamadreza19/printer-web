import { useDynamicCssClass } from "../../../../../../../../../../recoil/readStore";
import { StarOne } from "../../../../../../../../../../styles/__ready/EditorIcons";
import Typography from "../../../../../../../../../../styles/__ready/Typography";

export default function () {
  const cssClass = useDynamicCssClass();
  return (
    <div
      className={
        "w-100 py-3  d-flex align-items-center editor-searchbox-bookmarks-scrollable  " +
        cssClass.ps_2
      }
    >
      <span className={cssClass.me_2}>
        <StarOne />
      </span>
      <section
        className={
          "editor-searchbox-gray-bookmark d-flex justify-content-center align-items-center " +
          cssClass.me_1
        }
      >
        <Typography.H9_5 className="color_black-v2">
          ترمینال پیچی
        </Typography.H9_5>
      </section>
      <section
        className={
          "editor-searchbox-gray-bookmark d-flex justify-content-center align-items-center " +
          cssClass.me_1
        }
      >
        <Typography.H9_5 className="color_black-v2">
          ترمینال پیچی
        </Typography.H9_5>
      </section>
      <section
        className={
          "editor-searchbox-gray-bookmark d-flex justify-content-center align-items-center " +
          cssClass.me_1
        }
      >
        <Typography.H9_5 className="color_black-v2">
          ترمینال پیچی
        </Typography.H9_5>
      </section>
    </div>
  );
}
