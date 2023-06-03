import Items from "./items";

export default function ({
  data,
  hasNextPage,
  fetchNextPage,
  setOrder,
  displayPriority,
}) {
  return (
    <div className="w-100  ">
      <Items
        data={data}
        hasNextPage={hasNextPage}
        displayPriority={displayPriority}
        fetchNextPage={fetchNextPage}
        setOrder={setOrder}
      />
    </div>
  );
}
