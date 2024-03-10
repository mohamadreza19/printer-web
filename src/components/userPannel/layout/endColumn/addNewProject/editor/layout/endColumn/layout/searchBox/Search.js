import { useTranslation } from "react-i18next";
import { EditorSearchBox } from "../../../../../../../../../../styles/__ready/Textfields";

export default function ({ setSearch }) {
  const { t } = useTranslation();
  return (
    <div className="w-100  d-flex justify-content-center align-items-center">
      <EditorSearchBox setSearch={setSearch} placeholder={t("productName")} />
    </div>
  );
}
