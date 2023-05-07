import { useRecoilState } from "recoil";
import { rails } from "../../userEditorStore/cellsStore";
import railAction from "../../actions/editor/railAction";
import shortid from "shortid";
export default function () {
  const [rail, setRail] = useRecoilState(rails);

  function setRailReducer(payload = { railId: "" }, action = "") {
    if (action == railAction.ADDRAIL) {
      let id;
      if (rail.present.length < 1) {
        id = "1";
      } else {
        id = rail.present[rail.present.length - 1].id;
      }

      let intId = +id + 1;

      const newRail = {
        id: intId.toString(),
        cells: [],
      };
      const newRails = [...rail.present, newRail];
      return setRail((draft) => ({ ...draft, present: newRails }));
    }
    if (action == railAction.DELETERAIL) {
      const newRails = rail.present.filter(
        (rail) => rail.id !== payload.railId
      );
      setRail((draft) => ({ ...draft, present: newRails }));
    }
  }
  return setRailReducer;
}
