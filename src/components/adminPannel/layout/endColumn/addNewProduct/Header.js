import { useEffect, useState } from "react";
import {
  useContent_Based_Language,
  useDynamicCssClass,
  useLanguage,
} from "../../../../../recoil/readStore";
import Buttons from "../../../../../styles/__ready/Buttons";
import Icons from "../../../../../styles/__ready/Icons";
import Typography from "../../../../../styles/__ready/Typography";
import { ButtonSpinnerLoading } from "../../../../../styles/__ready/common/ButtonSpinnerLoading";
import { Check, Close, Error } from "@mui/icons-material";
import { AdminAddExcelFile_Mutation } from "../../../../../reactQuery/admin/callPostService";
export default function () {
  const [file, setFile] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDisplay_short_success_message, setIsDisplay_short_success_message] =
    useState(false);
  const language = useLanguage();
  const cssClass = useDynamicCssClass();
  const content =
    useContent_Based_Language().AdminPannel.end_col.addNew_Project_Or_Label
      .header;
  function onClickExcelUpload_Button() {
    document.getElementById("upload-excel-file").click();
  }

  const mutate = AdminAddExcelFile_Mutation();

  useEffect(() => {
    if (mutate.isLoading) {
      setLoading(true);
    }
    if (mutate.error) {
      setLoading(false);
      setError(mutate.error?.response.data.message);
    }
    if (mutate.isSuccess) {
      setLoading(false);
      setIsDisplay_short_success_message(true);
      setTimeout(() => {
        setIsDisplay_short_success_message(false);
      }, 4000);
    }
  }, [mutate.status]);
  useEffect(() => {
    if (file) {
      const option = {
        file,
      };
      mutate.mutate(option);
      setFile("");
    }
  }, [file]);
  const ContolledUploadExelButton = () => {
    if (loading) {
      return (
        <Buttons.Outlined
          className="button_extra-large_v1 justify-content-between"
          onClick={() => setLoading(false)}
        >
          <Close />
          <Typography.H9 language={language}>
            {mutate.onLoadedMeta?.percentage}%
          </Typography.H9>
          <ButtonSpinnerLoading />
        </Buttons.Outlined>
      );
    }
    if (error) {
      return (
        <Buttons.Outlined
          className="button_extra-large_v1 justify-content-between"
          onClick={() => setLoading(false)}
        >
          <span
            onClick={() => {
              setError("");
            }}
          >
            <Close />
          </span>
          <Typography.H10 language={language}>{error}</Typography.H10>
          {/* <Error /> */}
        </Buttons.Outlined>
      );
    }
    if (isDisplay_short_success_message) {
      return (
        <Buttons.Outlined
          className="button_extra-large_v1 justify-content-between"
          onClick={() => setLoading(false)}
        >
          <Close />
          <Typography.H9 language={language}>
            {mutate.onLoadedMeta?.percentage}%
          </Typography.H9>
          <Check />
        </Buttons.Outlined>
      );
    }
    return (
      <Buttons.Outlined
        className="button_extra-large_v1 "
        onClick={() => {
          onClickExcelUpload_Button();
          // setLoading(true);
        }}
      >
        <Typography.H8> {content.uploadSsExcelFile}</Typography.H8>
      </Buttons.Outlined>
    );
  };
  function onChangeInput(e) {
    setFile(e.target.files[0]);
  }
  return (
    <div className={"w-100  px-4 "}>
      <article className="d-flex  border-bottom-gray pb-2 d-flex justify-content-between">
        <section className="d-flex align-item-center">
          <Icons.AddNewProject classNameForPath="fill_black" />
          <Typography.H8 className={"font-500 " + cssClass.ms_2}>
            {content.addNewProductAndLabel}
          </Typography.H8>
        </section>
        <section className="d-flex align-item-center">
          <ContolledUploadExelButton />
        </section>
        <input
          id="upload-excel-file"
          type="file"
          className="d-none"
          accept=".xls,.xlsx"
          onChange={onChangeInput}
        />
      </article>
    </div>
  );
}
