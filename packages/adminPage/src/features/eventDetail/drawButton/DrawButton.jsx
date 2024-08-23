import { useState, useEffect, useRef } from "react"; 
import { useParams } from "react-router-dom";
import { fetchServer } from "@common/dataFetch/fetchServer.js";

import Button from "@common/components/Button.jsx";
import openModal from "@common/modal/openModal.js";
import AlertModal from "@admin/modals/AlertModal.jsx";

import DrawResultModal from "./DrawResultModal.jsx";
import ErrorBoundary from "@common/components/ErrorBoundary.jsx";
import Suspense from "@common/components/Suspense.jsx";
import Spinner from "@common/components/Spinner.jsx";
import DelaySkeleton from "@common/components/DelaySkeleton.jsx";

function ResultModalContainer({eventId})
{
  return <div className="w-[calc(100vw-8rem)] h-[calc(100vh-8rem)] p-8 bg-white relative">
    <ErrorBoundary fallback={<div>에러남</div>}>
      <Suspense
        fallback={
          <div className="w-full h-full flex justify-center items-center">
            <DelaySkeleton>
              <Spinner />
            </DelaySkeleton>
          </div>
        }
      >
        <DrawResultModal eventId={eventId} />
      </Suspense>
    </ErrorBoundary>
  </div>
}

function DrawButton() {
  const { eventId } = useParams();
  const [drawState, setDrawState] = useState("BEFORE_END");
  const interval = useRef(null);
  const timeout = useRef(null);

  useEffect( ()=>{
    fetchServer(`/api/v1/admin/draw/${eventId}/status`)
      .then( ({status})=>setDrawState(status) )
      .catch( (e)=>{
        setDrawState("ERROR");
        } );
  }, [] );

  useEffect( ()=>{
    return ()=>{
      clearInterval(interval.current);
      clearTimeout(timeout.current);
    }
  }, [] );

  async function onSubmit()
  {
    function shortPooling()
    {
      fetchServer(`/api/v1/admin/draw/${eventId}/status`)
        .then( ({status})=>{
          setDrawState(status);
          if(status !== "IS_DRAWING") {
            clearInterval(interval.current);
          }
        } )
        .catch( (e)=>{
          setDrawState("ERROR");
          clearInterval(interval.current);
        } );
    }

    try {
      await fetchServer(`/api/v1/admin/draw/${eventId}/draw`, { method: "post" });
      setDrawState("IS_DRAWING");
      openModal(<AlertModal title="성공" description="성공적으로 추첨 요청이 전송되었습니다." />);
      timeout.current = setTimeout( ()=>{
        shortPooling();
        interval.current = setInterval( shortPooling, 5000 );
      }, 500 );
    }
    catch {
      openModal(<AlertModal title="오류" description="추첨에 오류가 발생했습니다." />);
    }
  }

  switch(drawState)
  {
    case "BEFORE_END": return null;
    case "AVAILABLE": return (
      <Button className="w-32 h-8 px-4 py-1" onClick={onSubmit}>
        추첨하기
      </Button>
    );
    case "IS_DRAWING": return <div className="w-32 h-8 px-4 py-1 bg-neutral-600 text-neutral-400">추첨 진행중...</div>;
    case "COMPLETE": return (
      <Button className="w-32 h-8 px-4 py-1" onClick={() => openModal(<ResultModalContainer eventId={eventId} />)}>
        결과 보기
      </Button>
    );
    default: return <div className="w-32 h-8 px-4 py-1 bg-neutral-600 text-neutral-400">에러</div>;
  }
}

export default DrawButton;
