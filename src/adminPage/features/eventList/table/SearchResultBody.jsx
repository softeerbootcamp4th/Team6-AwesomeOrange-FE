import SearchResultItem from "./SearchResultItem.jsx";

function SearchResultBody({ data, checkState, setCheck }) {
  return (
    <div className="w-full h-80">
      {data.map((item) => (
        <SearchResultItem
          key={item.eventId}
          checked={checkState.has(item.eventId)}
          setCheck={setCheck(item.eventId)}
          {...item}
        />
      ))}
    </div>
  );
}

export default SearchResultBody;
