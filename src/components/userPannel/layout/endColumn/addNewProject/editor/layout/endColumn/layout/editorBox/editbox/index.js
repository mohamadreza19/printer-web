import {} from "../../../../../../../../../../../styles/__ready/EditorIcons";
import Typography from "../../../../../../../../../../../styles/__ready/Typography";
import RailArea from "./railArea";
import useCells from "../../../../../../../../../../../recoil/readStore/editor/Readcells";
export default function () {
  const cells = useCells();

  return (
    <div className=" bg-white scrollable-x-large position-relative">
      <main className={"w-100  dir-ltr pe-7rem pt-5   border-r-bottom-20"}>
        <RailArea cells={cells} />
      </main>
    </div>
  );
}
