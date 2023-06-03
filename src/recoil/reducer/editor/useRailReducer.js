import { useRecoilState } from "recoil";
// import { rails } from "../../userEditorStore/cellsStore";
import railAction from "../../actions/editor/railAction";
import shortid from "shortid";
import { rails } from "../../userEditorStore/cellsStore";
export default function () {
  const [rail, setRail] = useRecoilState(rails);

  function setRailReducer(payload = { railId: "" }, action = "") {
    if (action == railAction.ADDRAIL) {
      let frontId;
      if (rail.present.length < 1) {
        frontId = "1";
      } else {
        frontId = rail.present[rail.present.length - 1].frontId;
      }

      let intId = +frontId + 1;

      const newRail = {
        frontId: intId.toString(),
        customLabels: [],
      };
      const newRails = [...rail.present, newRail];
      return setRail((draft) => ({ ...draft, present: newRails }));
    }
    if (action == railAction.DELETERAIL) {
      const newRails = rail.present.filter(
        (rail) => rail.frontId !== payload.railId
      );
      setRail((draft) => ({ ...draft, present: newRails }));
    }
  }
  return setRailReducer;
}
