import Project from "./Project";

export default function () {
  return (
    <div className="w-100 mt-2 px-4 scrollable-medium-test ">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 6].map(() => {
        return <Project />;
      })}
    </div>
  );
}
