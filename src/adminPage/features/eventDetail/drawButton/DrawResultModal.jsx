import { fetchServer } from "@common/dataFetch/fetchServer.js";
import { useQuery } from "@common/dataFetch/getQuery.js";

function DrawResultModal({eventId})
{
	const drawResultData = useQuery(`event-detail-draw-result-${eventId}`, ()=>{
		return fetchServer(`/api/v1/admin/draw/${eventId}/winners`);
	});

	return <div className="w-24 h-8 bg-white">{drawResultData.length === 0 ? "none" : "yes"}</div>;
}

export default DrawResultModal;