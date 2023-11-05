import { useEffect } from "react";
import { Admin_User_Image } from "../../../../../reactQuery/common/callGetService";
import {
  useDynamicCssClass,
  useLanguage,
} from "../../../../../recoil/readStore";
import Buttons from "../../../../../styles/__ready/Buttons";
import Icons from "../../../../../styles/__ready/Icons";
import Typography from "../../../../../styles/__ready/Typography";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "react-use-localstorage";

//need edit image url
export default function ({
  label = {
    id: 1,
    name: {
      english: "",
      persian: "",
      turkish: "",
    },
    width: 0,
    height: 0,
    nameId: "",
    pictures: [],
    bookmarked: false,
  },
  PrintLabel = () => {},
  handleAdd_Bookmark = () => {},
  handleDeleteBookmark = () => {},
}) {
  const [editor_access, setEditor_access] = useLocalStorage("editor_access");
  const cssClass = useDynamicCssClass();
  const language = useLanguage();
  const imageResponse = Admin_User_Image("user");
  const navigate = useNavigate();
  const DynamicName = () => {
    if (language == "fa") {
      return (
        <Typography.Body2 className="font-500 h_41px">
          {label.name.persian}
        </Typography.Body2>
      );
    }
    if (language == "en") {
      return (
        <Typography.Body2 className="font-500 h_41px">
          {label.name.english}
        </Typography.Body2>
      );
    }
    if (language == "tr") {
      return (
        <Typography.Body2 className="font-500 h_41px">
          {label.name.turkish}
        </Typography.Body2>
      );
    }
  };
  // useEffect(() => {
  //   const option = {
  //     fileId: label.pictures[0].id,
  //   };
  //   imageResponse.mutate(option);
  // }, []);
  function handlePrintLabel(labelObj, image) {
    setEditor_access("project-templates/edit");
    const id = labelObj.id;
    const width = labelObj.width;
    const labelImg = image;

    // PrintLabel("LABEL", id, {
    //   width,
    //   labelImg,
    // });
    navigate("/editor/" + id);
  }
  // if (imageResponse.isSuccess)
  return (
    <div
      style={{
        width: "220px",
        height: "164px",
        maxWidth: "220px",
        maxHeight: "164px",
      }}
      className="bg_gray2 border-r-25 mx-1 my-2"
    >
      <section className="w-100 d-flex align-item-center justify-content-center">
        <img
          style={{
            width: "180px",
            height: "46.74px",
            objectFit: "cover",
          }}
          src={"/image/image-placeholder.png"}
          className="mt-2 "
        />
      </section>

      <section
        style={{
          width: "220px",
          height: "101.22px",
          minHeight: "101.22px",
        }}
        className="bg-white border mt-3 border border-r-25"
      >
        <div className="w-100 d-flex align-item-center justify-content-between mt-2 px-3 ">
          <DynamicName />
          <span
            onClick={() => {
              handleAdd_Bookmark();
              handleDeleteBookmark();
            }}
          >
            <Icons.Star2
              className="align-self-start cur-pointer"
              isBookmarked={label.bookmarked}
            />
          </span>
        </div>
        <div className="w-100 d-flex align-item-center justify-content-between  px-2 pb-2">
          <Typography.Body2 className="font-400  font-English disabled_gray2 dir-ltr ms-2">
            <span
              //   style={{
              //     marginRight: "0.2rem",
              //   }}
              className={cssClass.ms_extraSmall}
            >
              {label.railWidth}×{label.railWidth}
              {/* {"210×150"} */}
            </span>
            <span>mn</span>
          </Typography.Body2>
          <Buttons.Contained_Custom
            className="icon-small-box-padding border-r-circle bg_primary "
            onClick={() => handlePrintLabel(label, imageResponse.data)}
          >
            <Icons.Print />
          </Buttons.Contained_Custom>
        </div>
      </section>
    </div>
  );
}
