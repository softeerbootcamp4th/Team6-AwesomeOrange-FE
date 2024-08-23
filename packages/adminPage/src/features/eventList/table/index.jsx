import TableHeader from "./TableHeader.jsx";
import SearchResultBody from "./SearchResultBody.jsx";
import Pagination from "@admin/components/Pagination.jsx";

import { useQuery } from "@common/dataFetch/getQuery.js";
import { fetchServer } from "@common/dataFetch/fetchServer.js";
import serverTimeStore from "@admin/serverTime/store.js";

function SearchResult({ query, queryState, queryDispatch, checkState, checkDispatch }) {
  const { contents, totalPages } = useQuery(`admin-event-list@${query}`, () => fetchServer(query), {
    deferred: true,
  });

  const checkSelect = () => {
    const keys = contents
      .filter(({ startTime }) => {
        return new Date(startTime) > serverTimeStore.getState().serverTime;
      })
      .map(({ eventId }) => eventId);
    checkDispatch({ type: "toggle_keys", keys });
  };

  return (
    <>
      <TableHeader state={queryState.sort} dispatch={queryDispatch} checkSelect={checkSelect} />
      <SearchResultBody
        data={contents}
        checkState={checkState}
        setCheck={(key) => {
          return (value) => checkDispatch({ type: "check_key", key, value });
        }}
      />
      <div className="flex justify-center items-center">
        <Pagination
          currentPage={queryState.page}
          setPage={(value) => queryDispatch({ type: "set_page", value })}
          maxPage={totalPages}
        />
      </div>
    </>
  );
}

export default SearchResult;
