import { useState } from "react";
import { fetchServer } from "@common/dataFetch/fetchServer";
import { useNavigate } from "react-router-dom";

export default function AdminComment() {
  const navigate = useNavigate();
  const [formString, setFormString] = useState("");
  const [isSpread, setIsSpread] = useState(false);
  const [searchList, setSearchList] = useState([]);

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

  function searchEvent(e, eventId) {
    e.preventDefault();

    const eventIDRegex = /^HD_\d{6}_\d{3}$/;
    const searchID = eventId ? eventId : formString;

    if (eventIDRegex.test(searchID)) {
      navigate(`/comments/${searchID}`);
    }
  }

  return (
    <form onSubmit={searchEvent} className="relative flex">
      <input
        type="text"
        inputMode="numeric"
        onChange={onChangeForm}
        value={formString}
        placeholder="ID (숫자 9자리)"
        className={`z-10 bg-neutral-50 focus:bg-white px-4 py-2 w-full ${isSpread ? "rounded-t-md" : "rounded-md"}`}
      />

      <div
        className={`absolute max-h-40 top-full border overflow-y-auto w-full rounded-b-md px-3 py-2 flex flex-col gap-2 ${!isSpread && "hidden"}`}
      >
        {searchList.map((evt) => (
          <li
            key={evt.eventId}
            onClick={(e) => searchEvent(e, evt.eventId)}
            className={`cursor-pointer list-none w-full rounded px-1 flex hover:bg-blue-200`}
          >
            <span className="w-40">{evt.eventId}</span>
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
        onClick={searchEvent}
        src="/icons/search.png"
        alt="검색"
        className="z-10 absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
      />
    </form>
  );
}
