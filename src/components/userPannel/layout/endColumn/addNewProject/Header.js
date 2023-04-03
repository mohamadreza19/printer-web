import Icons from "../../../../../styles/__ready/Icons";
import Typography from "../../../../../styles/__ready/Typography";

export default function ({ ms_2 = " ", addNewProject = " " }) {
  return (
    <div className="w-100  px-4">
      <section className=" d-flex border-bottom-gray pb-3">
        <Icons.AddNewProject classNameForPath="fill_black" />
        <Typography.H8 className={"font-500 " + ms_2}>
          {addNewProject}
        </Typography.H8>
      </section>
    </div>
  );
}
