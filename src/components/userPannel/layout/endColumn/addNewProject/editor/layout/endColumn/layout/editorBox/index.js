import { useDynamicCssClass } from "../../../../../../../../../../recoil/readStore";
// import Header from "./Header";
import Header from "./header/index";

export default function () {
  const cssClass = useDynamicCssClass();
  return (
    <div className="w-100 h-100  ">
      <Header />

      <main className={"w-100 bg-white dir-ltr pe-20  scrollable-x-latge"}>
        <div className="w-100 mt-10 " style={{}}>
          <article
            className="bg-info"
            style={{
              width: 800,
            }}
          >
            sda
          </article>
        </div>
      </main>
    </div>
  );
}
