import SearchResultItem from "./SearchResultItem.jsx";

import { useQuery } from "@common/dataFetch/getQuery.js";
import { fetchServer } from "@common/dataFetch/fetchServer.js";

function SearchResult({query, checkState, dispatch})
{
	const dataList = useQuery("admin-event-list", ()=>fetchServer(query), [query] );
	return <div className="w-full h-80">
		{dataList.map( data=><SearchResultItem 
			key={data.eventId} 
			checked={checkState.has(data.eventId)} 
			setCheck={ (value)=>dispatch({type:"check_key", key:data.eventId, value}) } 
			{...data}
		/> )}
	</div>
}

export default SearchResult;