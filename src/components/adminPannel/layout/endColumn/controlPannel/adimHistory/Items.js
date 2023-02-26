import Item from "./Item";

export default function () {
  return (
    <div className="w-100  scrollable1">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
        <Item key={item} />
      ))}
    </div>
  );
}
