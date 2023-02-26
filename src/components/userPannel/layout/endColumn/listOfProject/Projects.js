import Project from "./Project";

export default function () {
  return (
    <div className="w-100 mt-2 scrollable">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(() => {
        return <Project />;
      })}
    </div>
  );
}
