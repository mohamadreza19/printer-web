import { css } from "@emotion/react";
import languageAction from "../../../recoil/actions/languageAction";
import { useDynamicCssClass, useLanguage } from "../../../recoil/readStore";
import useLanguageReducer from "../../../recoil/reducer/useLanguageReducer";
import Icons from "../../../styles/__ready/Icons";
import Typography from "../../../styles/__ready/Typography";
import useCachedLanguage from "../../../utility/useCachedLanguage";

export default function () {
  const language = useLanguage();
  const cssClass = useDynamicCssClass();
  const { set } = useCachedLanguage();
  const languageSet = useLanguageReducer();

  const lanArr = [
    ["fa", "فارسی"],
    ["en", "English"],
    ["tr", "Turkish"],
  ];
  return (
    <div className={"w-100  " + cssClass.ms_3}>
      <section className="d-flex align-item-center">
        <div>
          <Icons.Language />
        </div>
        {lanArr.map((item, idex) => {
          return (
            <Typography.H7
              onClick={() => {
                set(item[0]);
                const action = {
                  type: languageAction.CHANGE_LANUAGE,
                  payload: item[0],
                };
                languageSet(action);
              }}
              key={idex}
              className={`cur-pointer color-primary ${
                item[0] !== language ? "disabled_v1 " : " "
              }
                ${"mx-2"}

                `}
            >
              {item[1]}
            </Typography.H7>
          );
        })}
      </section>
    </div>
  );
}
