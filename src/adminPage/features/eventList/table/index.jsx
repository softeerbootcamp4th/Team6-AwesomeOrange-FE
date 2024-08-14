import { useDeferredValue } from "react";

import TableHeader from "./TableHeader.jsx";
import SearchResultBody from "./SearchResultBody.jsx";
import Pagination from "@admin/components/Pagination.jsx";

import { useQuery } from "@common/dataFetch/getQuery.js";
import { fetchServer } from "@common/dataFetch/fetchServer.js";

function SearchResult({query,
queryState,
queryDispatch,
checkState,
checkDispatch})
{
	const dataList = useQuery("admin-event-list", ()=>fetchServer(query), {
		dependencyArray: [query],
		deferred: true
	});
	const page = 10;

	const checkSelect = () =>{
		const keys = dataList.map( ({eventId})=>eventId );
		checkDispatch({ type:"toggle_keys", keys });
	}

	return <>
		<TableHeader state={queryState.sort} dispatch={queryDispatch} checkSelect={checkSelect} />
		<SearchResultBody data={dataList} checkState={checkState} setCheck={ (key)=>{
			return (value)=>checkDispatch({type:"check_key", key, value});
		} } />
		<div className="flex justify-center items-center">
			<Pagination currentPage={queryState.page} setPage={value=>queryDispatch({type:"set_page", value})} maxPage={page} />
		</div>
	</>
}

export default SearchResult;