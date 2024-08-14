import TableHeader from "./TableHeader.jsx";
import SearchResultBody from "./SearchResultBody.jsx";

import { useQuery } from "@common/dataFetch/getQuery.js";
import { fetchServer } from "@common/dataFetch/fetchServer.js";

function SearchResult({query,
queryState,
queryDispatch,
checkState,
checkDispatch})
{
	const dataList = useQuery("admin-event-list", ()=>fetchServer(query), [query] );

	const checkSelect = () =>{
		const keys = dataList.map( ({eventId})=>eventId );
		checkDispatch({ type:"toggle_keys", keys });
	}

	return <>
		<TableHeader state={queryState.sort} dispatch={queryDispatch} checkSelect={checkSelect} />
		<SearchResultBody data={dataList} checkState={checkState} setCheck={ (key)=>{
			return (value)=>checkDispatch({type:"check_key", key, value});
		} } />
	</>
}

export default SearchResult;