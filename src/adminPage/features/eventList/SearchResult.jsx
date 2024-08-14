import { useQuery } from "@common/dataFetch/getQuery.js";
import { fetchServer } from "@common/dataFetch/fetchServer.js";

function SearchResultItem({name, eventId})
{
	return <div>
		<p>이름 : {name}</p>
		<p>ID : {eventId}</p>
	</div>
}

function SearchResult({query})
{
	const dataList = useQuery("admin-event-list", ()=>fetchServer(query), [query] );
	return <div>
		{dataList.map( data=><SearchResultItem key={data.eventId} {...data} /> )}
	</div>
}

export default SearchResult;