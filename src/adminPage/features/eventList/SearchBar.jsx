import { useState } from "react";
import Input from "@common/components/Input.jsx";
import search from "./assets/search.svg";

function SearchBar({ onSearch = () => {} }) {
  const [query, setQuery] = useState("");

  return (
    <form
      className="relative flex items-center"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(query);
      }}
    >
      <Input
        text={query}
        setText={setQuery}
        placeholder="이벤트 이름/ID(숫자 6자리)를 입력하시오"
        name="search"
      />
      <button
        type="submit"
        className="absolute size-8 right-4 flex justify-center items-center"
      >
        <img src={search} alt="검색" className="size-6" draggable="false" />
      </button>
    </form>
  );
}

export default SearchBar;
