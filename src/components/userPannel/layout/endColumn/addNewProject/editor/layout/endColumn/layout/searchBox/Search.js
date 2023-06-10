import { EditorSearchBox } from "../../../../../../../../../../styles/__ready/Textfields";

export default function ({ setSearch }) {
  return (
    <div className="w-100  d-flex justify-content-center align-items-center">
      <EditorSearchBox setSearch={setSearch} />
    </div>
  );
}
