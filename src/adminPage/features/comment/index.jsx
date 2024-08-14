import { useState } from "react";
import { fetchServer } from "@common/dataFetch/fetchServer";

export default function AdminComment() {
  const [formString, setFormString] = useState("");
  const [isSpread, setIsSpread] = useState(false);
  const [searchList, setSearchList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  function autoCorrect() {
    fetchServer(`/api/v1/admin/events/hints?search=${formString}`)
      .then((res) => {
        setSearchList(res);
        setIsSpread(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function onChangeForm(e) {
    const filteredString = e.target.value.replace(/[^0-9]/g, "");

    if (!filteredString) {
      setFormString("");
    } else if (filteredString.length <= 6) {
      setFormString("HD_" + filteredString);
    } else if (filteredString.length <= 9) {
      setFormString(
        "HD_" + filteredString.slice(0, 6) + "_" + filteredString.slice(6),
      );
    } else return;

    if (filteredString.length >= 6) {
      autoCorrect();
    } else setIsSpread(false);
  }

  function onKeyDownForm(e) {
    if (!isSpread) return;
    switch (e.key) {
      case "ArrowUp":
        setSelectedIndex((idx) => idx - 1);
        break;
      case "ArrowDown":
        setSelectedIndex((idx) => idx + 1);
        break;
    }
  }

  function searchComment(e) {
    e.preventDefault();

    console.log(formString + " 검색");
  }

  return (
    <form onSubmit={searchComment} className="relative mt-10 flex">
      <input
        type="text"
        inputMode="numeric"
        onKeyDown={onKeyDownForm}
        onChange={onChangeForm}
        value={formString}
        placeholder="ID (숫자 9자리)"
        className={`z-10 outline outline-1 outline-neutral-500 px-4 py-2 w-full ${isSpread ? "rounded-t-md" : "rounded-md"}`}
      />

      <div
        className={`absolute max-h-40 top-full outline outline-1 overflow-y-auto w-full outline-neutral-500 rounded-b-md px-3 py-2 flex flex-col gap-2 ${!isSpread && "hidden"}`}
      >
        {searchList.map((evt, index) => (
          <li
            key={evt.id}
            onMouseEnter={() => setSelectedIndex(index)}
            onMouseDown={() => setFormString(evt.id)}
            className={`list-none w-full rounded px-1 flex ${selectedIndex === index && "bg-blue-200"}`}
          >
            <span className="w-40">{evt.id}</span>
            <span>{evt.name}</span>
          </li>
        ))}

        <span
          className={`${searchList.length && "hidden"} text-neutral-300 text-body-s`}
        >
          일치하는 검색 결과가 없습니다.
        </span>
      </div>

      <img
        onClick={searchComment}
        src="/icons/search.png"
        alt="검색"
        className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
      />
    </form>
  );
}
