import { useState } from "react";
import { fetchServer } from "@common/dataFetch/fetchServer";
import { useNavigate } from "react-router-dom";

export default function AdminComment() {
  const navigate = useNavigate();
  const [formString, setFormString] = useState("");
  const [isSpread, setIsSpread] = useState(false);
  const [searchList, setSearchList] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(-1);

  function autoCorrect(str) {
    fetchServer(`/api/v1/admin/events/hints?search=${str}`)
      .then((res) => {
        setSearchList(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function onChangeForm(e) {
    let newString = e.target.value.replace(/[^0-9]/g, "");

    if (!newString) {
      newString = "";
    } else if (newString.length <= 6) {
      newString = "HD_" + newString;
    } else if (newString.length <= 9) {
      newString = "HD_" + newString.slice(0, 6) + "_" + newString.slice(6);
    } else return;

    if (newString !== formString) {
      if (newString.length >= 6) {
        setSelectedEvent(-1);
        setIsSpread(true);
        autoCorrect(newString);
      } else {
        setIsSpread(false);
      }
    }
    setFormString(newString);
  }

  function searchEvent(e, eventId) {
    e.preventDefault();

    const searchID = eventId ?? formString;
    navigate(`/comments/${searchID}`);
  }

  function onKeyDown(e) {
    if (!isSpread || !searchList.length || (e.key !== "ArrowUp" && e.key !== "ArrowDown")) return;
    e.preventDefault();
    let nextIndex = selectedEvent;

    if (e.key === "ArrowUp") {
      if (nextIndex === -1) nextIndex++;
      nextIndex = (nextIndex - 1 + searchList.length) % searchList.length;
    } else {
      nextIndex = (nextIndex + 1) % searchList.length;
    }

    setSelectedEvent(nextIndex);
    setFormString(searchList[nextIndex].eventId);
  }

  return (
    <form onSubmit={searchEvent} className="relative flex">
      <input
        type="text"
        inputMode="numeric"
        onChange={onChangeForm}
        value={formString}
        onKeyDown={onKeyDown}
        placeholder="ID (숫자 9자리)"
        className={`z-10 bg-neutral-50 focus:bg-white px-4 py-2 w-full ${isSpread ? "rounded-t-md" : "rounded-md"}`}
      />

      <div
        className={`absolute top-full border overflow-y-auto w-full rounded-b-md px-3 py-2 flex flex-col gap-2 ${!isSpread && "hidden"}`}
      >
        {searchList.map((evt, index) => (
          <li
            key={evt.eventId}
            onMouseEnter={() => setSelectedEvent(index)}
            onClick={(e) => searchEvent(e, evt.eventId)}
            className={`cursor-pointer list-none w-full rounded px-1 flex ${index === selectedEvent && "bg-blue-200"}`}
          >
            <span className="w-40">{evt.eventId}</span>
            <span>{evt.name}</span>
          </li>
        ))}

        <span className={`${searchList.length && "hidden"} text-neutral-300 text-body-s`}>
          일치하는 검색 결과가 없습니다.
        </span>
      </div>

      <img
        onClick={searchEvent}
        src="/icons/search.png"
        alt="검색"
        className="z-10 absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
      />
    </form>
  );
}
