import { Editor_Cell_Input } from "../../../../../../../../../../../../../styles/__ready/Textfields";

export default function ({
  content = "test",
  isSelected = false,
  HandleChangeInputValue = () => {},
}) {
  console.log(content);
  return (
    <main className="w-100 h-100 d-flex justify-content-center align-item-center  ">
      <Editor_Cell_Input
        value={content}
        disabled={isSelected}
        onChange={HandleChangeInputValue}
      />
    </main>
  );
}
