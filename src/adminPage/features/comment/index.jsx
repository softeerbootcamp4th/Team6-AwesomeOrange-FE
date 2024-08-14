import { useState } from "react";

export default function AdminComment() {
  const [formString, setFormString] = useState("");
  const [isSpread, setIsSpread] = useState(false);
  const searchList = [
    {
      id: "HD_2409_01",
      name: "이벤트",
    },
    {
      id: "HD_2409_02",
      name: "이벤트",
    },
    {
      id: "HD_2409_03",
      name: "이벤트",
    },
  ];

  function onChangeForm(e) {
    const filteredString = e.target.value.replace(/[^0-9]/g, "");

    if (!filteredString) {
      setFormString("");
    } else if (filteredString.length <= 4) {
      setFormString("HD_" + filteredString);
    } else if (filteredString.length <= 6) {
      setFormString(
        "HD_" + filteredString.slice(0, 4) + "_" + filteredString.slice(4),
      );
    }
  }

  function searchComment(e, eventId) {
    e.preventDefault();

    if (eventId) console.log(eventId + " 검색");
    else console.log(formString + " 검색");
  }

  return (
    <form onSubmit={searchComment} className="relative mt-10 flex">
      <input
        type="text"
        inputMode="numeric"
        onChange={onChangeForm}
        onFocus={() => setIsSpread(true)}
        onBlur={() => setIsSpread(false)}
        value={formString}
        placeholder="ID (숫자 6자리)"
        className={`outline outline-1 outline-neutral-500 px-4 py-2 w-full ${isSpread ? "rounded-t-md" : "rounded-md"}`}
      />

      <div
        className={`absolute top-full outline outline-1 w-full outline-neutral-500 rounded-b-md px-3 py-2 flex flex-col gap-2 ${!isSpread && "hidden"}`}
      >
        {searchList.map((evt) => (
          <li
            key={evt.id}
            onMouseDown={() => setFormString(evt.id)}
            className="list-none w-full hover:bg-blue-200 rounded px-1 flex"
          >
            <span className="w-40">{evt.id}</span>
            <span>{evt.name}</span>
          </li>
        ))}
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