import SearchResultItem from "./SearchResultItem.jsx";

import { useQuery } from "@common/dataFetch/getQuery.js";
import { fetchServer } from "@common/dataFetch/fetchServer.js";

function SearchResult({query})
{
	const dataList = useQuery("admin-event-list", ()=>fetchServer(query), [query] );
	return <div className="w-full h-80">
		{dataList.map( data=><SearchResultItem key={data.eventId} {...data} /> )}
	</div>
}

export default SearchResult;