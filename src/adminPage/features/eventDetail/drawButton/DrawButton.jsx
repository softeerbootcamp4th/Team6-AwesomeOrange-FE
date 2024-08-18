import { useParams } from "react-router-dom";
import { fetchServer } from "@common/dataFetch/fetchServer.js";
import { useQuery, useMutation } from "@common/dataFetch/getQuery.js";
import Button from "@common/components/Button.jsx";
import openModal from "@common/modal/openModal.js";

import AlertModal from "@admin/modals/AlertModal.jsx";

import DrawResultModal from "./DrawResultModal.jsx";
import ErrorBoundary from "@common/components/ErrorBoundary.jsx";
import Suspense from "@common/components/Suspense.jsx";
import Spinner from "@common/components/Spinner.jsx";
import DelaySkeleton from "@common/components/DelaySkeleton.jsx";

function DrawButton()
{
	const { eventId } = useParams();
	const drawResultData = useQuery(`event-detail-draw-result-${eventId}`, ()=>{
		return fetchServer(`/api/v1/admin/draw/${eventId}/winners`);
	}, {deferred: true});

	const resultModal = <div className="w-[calc(100vw-8rem)] h-[calc(100vh-8rem)] p-8 bg-white relative">
		<ErrorBoundary fallback={<div>에러남</div>}>
			<Suspense fallback={<div className="w-full h-full flex justify-center items-center">
				<DelaySkeleton><Spinner /></DelaySkeleton>
			</div>}>
				<DrawResultModal eventId={eventId}/>
			</Suspense>
		</ErrorBoundary>
	</div>;

	const mutate = useMutation(`event-detail-draw-result-${eventId}`, 
		()=>fetchServer(`/api/v1/admin/draw/${eventId}/draw`, {method:"post"}),
		{
			onSuccess: ()=>openModal(resultModal),
			onFail: ()=>openModal(<AlertModal title="오류" description="추첨에 오류가 발생했습니다."/>)
		}
	);

	if(drawResultData.length === 0) return <Button className="w-32 h-8 px-4 py-1" onClick={mutate}>추첨하기</Button>
	return <Button className="w-32 h-8 px-4 py-1" onClick={()=>openModal(resultModal)}>결과 보기</Button>
}

export default DrawButton;