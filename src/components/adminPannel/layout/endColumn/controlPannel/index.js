import Header from "./Header";
import MainHeader from "./MainHeader";
import Products from "./Products";

export default function () {
  return (
    <div className="w-100 ">
      <Header />
      <main className="w100 mt-4 py-3 px-4 bg-white border-r-top-30">
        <MainHeader />
        <Products />
      </main>
    </div>
  );
}
