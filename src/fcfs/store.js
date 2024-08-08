import create from "zustand";
import IntervalController from "@/common/IntervalController.js";
import {fetchServer} from "@/common/dataFetch/fetchServer.js";
import {getQuerySuspense} from "@/common/dataFetch/getQuery.js";
import { EVENT_ID } from "@/common/constants.js";

async function getServerPresiseTime()
{
	const startClientTime = performance.now();
	const {timestamp: serverTime} = await fetch("/api/serverTime").then( e=>e.json() );
	const networkPayloadTime = performance.now() - startClientTime;

	return serverTime + networkPayloadTime; 
}

const fcfsStore = create( (set, get)=>({
	countdown: 0,
	currentDateTime: 0,
	eventStatus: "ended",
	// counter: new IntervalController(1000),
	getData: () => {
		const promiseFn = async function () {
			const [serverTime, eventInfo] = await Promise.all( [ 
				getServerPresiseTime(), 
				fetchServer(`/api/v1/event/fcfs/${EVENT_ID}/info`) 
			]);
			// get().counter.end();
			// const counter = new IntervalController(1000);
			// counter.addEventListener( "interval", ()=>{
			// 	console.log("memory leak");
			// 	set( state=>{ countdown: state.countdown-1 } )
			// } );
			// counter.start();
			set( { currentDateTime: new Date(eventInfo.nowDateTime), countdown:0, eventStatus: eventInfo.eventStatus  } );
		}
		getQuerySuspense("test-chore", promiseFn);
	},
	setEventStatus: (eventStatus)=>set({eventStatus}) 
}) );

export default fcfsStore;