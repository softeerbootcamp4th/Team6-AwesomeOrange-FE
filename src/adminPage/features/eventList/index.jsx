import { useReducer, useDeferredValue } from "react";
import { Link } from "react-router-dom";

import { searchReducer, setDefaultState, searchStateToQuery } from "./queryReducer.js";
import checkReducer from "./checkReducer.js";

import SearchBar from "./SearchBar.jsx";
import Filter from "./Filter.jsx";
import SearchResult from "./table";
import DeleteButton from "./DeleteButton.jsx";
import Button from "@common/components/Button.jsx";
import Suspense from "@common/components/Suspense.jsx";
import ErrorBoundary from "@common/components/ErrorBoundary.jsx";

function EventList() {
  const [state, dispatch] = useReducer(searchReducer, null, setDefaultState);
  const [checkSet, setCheck] = useReducer(checkReducer, new Set());
  const query = useDeferredValue(searchStateToQuery(state));
  const resetCheck = () => setCheck({ type: "reset" });

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex justify-end">
        <Link to="./create">
          <Button>+ 이벤트 등록</Button>
        </Link>
      </div>
      <SearchBar
        onSearch={(value) => {
          dispatch({ type: "set_query", value });
          resetCheck();
        }}
      />
      <Filter state={state.filter} dispatch={dispatch} />
      <div className="flex justify-end">
        <DeleteButton selected={checkSet} reset={resetCheck} />
      </div>
      <ErrorBoundary fallback={<div>Error</div>}>
        <Suspense fallback={<div>login</div>}>
          <SearchResult
            query={query}
            queryState={state}
            queryDispatch={dispatch}
            checkState={checkSet}
            checkDispatch={setCheck}
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default EventList;
