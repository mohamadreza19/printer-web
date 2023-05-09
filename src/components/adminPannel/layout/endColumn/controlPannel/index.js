import { useEffect } from "react";
import { AdminProjects } from "../../../../../helper/AdminApiQueries";
import useToastReducer from "../../../../../recoil/reducer/useToastReducer";
import Header from "./Header";
import MainHeader from "./MainHeader";
import Products from "./Products";

export default function () {
  const setLoading = useToastReducer();
  const { data, isLoading, error } = AdminProjects();

  useEffect(() => {
    if (isLoading) {
      setLoading({
        isShow: true,
        message: "",
      });
    }
    if (data) {
      setLoading({
        isShow: false,
        message: "",
      });
    }
  }, [isLoading, error, data]);

  if (data)
    return (
      <div
        className="w-100 h-100 "
        style={{
          // height: "72.2%",

          border: "1px solid blue",
        }}
      >
        <Header />
        <main
          className="w-100  mt-4 py-3 px-4 bg-white border-r-top-30"
          style={{
            // height: "72.2%",
            height: "50%",
            overflowY: "scroll",
            border: "1px solid red",
          }}
        >
          <MainHeader />
          <Products products={data.items} />
        </main>
      </div>
    );
}
