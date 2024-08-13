import { useReducer } from "react";

import { searchReducer, setDefaultState } from "./reducer.js";

import SearchBar from "./SearchBar.jsx";
import Filter from "./Filter.jsx";
import TableHeader from "./TableHeader.jsx";
import Button from "@common/components/Button.jsx";

function EventList() {
  const [state, dispatch] = useReducer(searchReducer, null, setDefaultState);

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex justify-end">
        <Button>+ 이벤트 등록</Button>
      </div>
      <SearchBar />
      <Filter state={state.filter} dispatch={dispatch} />
      <TableHeader state={state.sort} dispatch={dispatch} />
    </div>
  );
}

export default EventList;
