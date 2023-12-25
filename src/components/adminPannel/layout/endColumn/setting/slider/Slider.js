import React from "react";
import Typography from "../../../../../../styles/__ready/Typography";
import SlidesList from "./SlidesList";
import UploadImageArea from "./UploadImageArea";

function AddSlider() {
  return (
    <div
      className="w-100 d-flex flex-column justify-content-between pb-6"
      style={{
        // height: "81vh",
        maxHeight: "728.71px",
        overflowY: "auto",
        borderBottomLeftRadius: "25px",
        borderBottomRightRadius: "25px",
      }}
    >
      <header className="w-100 px-5 mt-3 mb-5">
        <Typography.H5 className="font-500">لیست عکس های اسلایدر</Typography.H5>
        <SlidesList />
      </header>
      <main className=" d-flex  flex-column justify-content-center align-items-center">
        <UploadImageArea />
      </main>
    </div>
  );
}

export default AddSlider;
