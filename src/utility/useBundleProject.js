import { useRecoilState } from "recoil";
import project_store from "../recoil/store/user/project_store";
import { rails } from "../recoil/userEditorStore/cellsStore";
import { EditProject_Mutation } from "../reactQuery/user/callPutServices";

export default function () {
  const [project_state, setProject_state] = useRecoilState(project_store);
  const [rails_state, setRails_state] = useRecoilState(rails);
  //   const mutate = EditProject_Mutation();
  function handlePutProject() {
    const rail_with_modifid_idString_to_number = rails_state.present.map(
      (rail) => {
        console.log(rail);
        return { customLabels: rail.customLabels, frontId: +rail.frontId };
      }
    );
    const bundled_project = {
      ...project_state,
      rails: rail_with_modifid_idString_to_number,
    };
    console.log(bundled_project);
    return bundled_project;
  }

  return handlePutProject;
}
