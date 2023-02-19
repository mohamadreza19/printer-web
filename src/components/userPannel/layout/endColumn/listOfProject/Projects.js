import Project from "./Project";

export default function () {
  return (
    <div
      style={{
        maxHeight: "32rem",
        // overflow: "auto",
        overflowY: "scroll",
      }}
      className="w-100 mt-2"
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(() => {
        return <Project />;
      })}
    </div>
  );
}
