import Icons from "../../../../../styles/__ready/Icons";
import Typography from "../../../../../styles/__ready/Typography";

export default function ({ ms_2 = " ", addNewProject = " " }) {
  return (
    <div className={"w-100 d-flex  border-bottom-gray pb-3 " + ms_2}>
      <Icons.AddNewProject classNameForPath="fill_black" />
      <Typography.H7 className={ms_2}>{addNewProject}</Typography.H7>
    </div>
  );
}
