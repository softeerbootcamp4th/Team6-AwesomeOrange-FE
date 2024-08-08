import {create} from "zustand";
import CountdownController from "./countdown/CountdownController.js";
import {fetchServer, HTTPError, ServerCloseError} from "@/common/dataFetch/fetchServer.js";
import {getQuerySuspense} from "@/common/dataFetch/getQuery.js";
import { EVENT_ID } from "@/common/constants.js";

async function getServerPresiseTime()
{
	const startClientTime = performance.now();
	const {timestamp: serverTime} = await fetch("/api/serverTime").then( e=>e.json() );
	const networkPayloadTime = performance.now() - startClientTime;

	return new Date(serverTime).getTime() + networkPayloadTime; 
}

async function getFcfsEventInfo()
{
	try {
		const eventData = fetchServer(`/api/v1/event/fcfs/${EVENT_ID}/info`);
		return eventData;
	}
	catch(e) {
		if(e instanceof HTTPError && e.status === 404) return {nowDateTime: "9999-12-31T11:59:59.000Z", eventStatus: "unknown"};
		if(e instanceof ServerCloseError) return {currentEventTime: "9999-12-31T11:59:59.000Z", eventStatus: "unknown"};
		throw e;
	}
}

const fcfsStore = create( (set, get)=>({
	countdown: 0,
	currentServerTime: 0,
	currentEventTime: 0,
	eventStatus: "ended",
	getData: () => {
		const promiseFn = async function () {
			// get server time and event info
			const [serverTime, eventInfo] = await Promise.all( [ 
				getServerPresiseTime(), 
				getFcfsEventInfo()
			]);
			const currentServerTime = serverTime;
			const currentEventTime = new Date(eventInfo.nowDateTime).getTime();

			// get countdown and syncronize state
			const countdown = Math.ceil((currentEventTime - currentServerTime) / 1000);
			set( { currentServerTime, currentEventTime, countdown, eventStatus: eventInfo.eventStatus } );
		}
		return getQuerySuspense("fcfs-info-data", promiseFn, [set]);
	},
	setEventStatus: (eventStatus)=>set({eventStatus}) ,
	handleCountdown: ()=>set( state=>({countdown: state.countdown - 1}) )
}) );

export default fcfsStore;