import { useSelector } from 'react-redux';
import { getProject } from '../redux/project/project._slice';
import { getRails } from '../redux/project/history_changer_slice';

export default function () {
  const project = useSelector(getProject);
  const rails = useSelector(getRails);

  //   const mutate = EditProject_Mutation();
  function handlePutProject() {
    // const rail_with_modifid_idString_to_number = rails_state.present.map(
    //   (rail) => {
    //     return { customLabels: rail.customLabels, frontId: rail.frontId };
    //   }
    // );

    const bundled_project = {
      ...project,

      rails: rails,
    };

    return bundled_project;
  }

  return handlePutProject;
}
