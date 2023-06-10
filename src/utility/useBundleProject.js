import { useRecoilState } from "recoil";
import project_store from "../recoil/store/user/project_store";
import { rails } from "../recoil/userEditorStore/cellsStore";
import { EditProject_Mutation } from "../reactQuery/user/callPutServices";
import { ColumnFour_justify_start } from "../recoil/userEditorStore/EditorHeaderActionButton";

export default function () {
  const [project_state, setProject_state] = useRecoilState(project_store);
  const [justify, setJustify] = useRecoilState(ColumnFour_justify_start);
  const [rails_state, setRails_state] = useRecoilState(rails);
  //   const mutate = EditProject_Mutation();
  function handlePutProject() {
    const rail_with_modifid_idString_to_number = rails_state.present.map(
      (rail) => {
        return { customLabels: rail.customLabels, frontId: +rail.frontId };
      }
    );
    const bundled_project = {
      ...project_state,
      rails: rail_with_modifid_idString_to_number,
      direction: justify,
    };

    return bundled_project;
  }

  return handlePutProject;
}
