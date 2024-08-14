import { useReducer, useDeferredValue } from "react";

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

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex justify-end">
        <Button>+ 이벤트 등록</Button>
      </div>
      <SearchBar onSearch={ (value)=>{
        dispatch({type:"set_query", value});
        setCheck({type:"reset"});
      } } />
      <Filter state={state.filter} dispatch={dispatch} />
      <div className="flex justify-end">
        <DeleteButton selected={checkSet} />
      </div>
      <ErrorBoundary fallback={<div>Error</div>}>
        <Suspense fallback={<div>login</div>}>
          <SearchResult query={query} queryState={state} queryDispatch={dispatch} checkState={checkSet} checkDispatch={setCheck} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default EventList;
