import Projects from "./Projects";
import SearchBox from "./SearchBox";

export default function () {
  return (
    <div className="w-100   h-100">
      {/* <main className="bg-white  mt-3 p-4 border-r-top-30"> */}
      <SearchBox />
      <Projects />

      {/* </main> */}
    </div>
  );
}
