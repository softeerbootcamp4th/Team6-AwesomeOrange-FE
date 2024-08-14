import { useReducer, useDeferredValue } from "react";

import { searchReducer, setDefaultState, searchStateToQuery } from "./reducer.js";

import SearchBar from "./SearchBar.jsx";
import Filter from "./Filter.jsx";
import TableHeader from "./TableHeader.jsx";
import SearchResult from "./SearchResult.jsx";
import Button from "@common/components/Button.jsx";
import Suspense from "@common/components/Suspense.jsx";
import ErrorBoundary from "@common/components/ErrorBoundary.jsx";

function EventList() {
  const [state, dispatch] = useReducer(searchReducer, null, setDefaultState);
  const query = useDeferredValue(searchStateToQuery(state));

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex justify-end">
        <Button>+ 이벤트 등록</Button>
      </div>
      <SearchBar />
      <Filter state={state.filter} dispatch={dispatch} />
      <TableHeader state={state.sort} dispatch={dispatch} />
      <ErrorBoundary fallback={<div>Error</div>}>
        <Suspense fallback={<div>login</div>}>
          <SearchResult query={query} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default EventList;
