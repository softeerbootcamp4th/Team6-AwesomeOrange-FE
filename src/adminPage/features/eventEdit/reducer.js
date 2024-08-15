export function setDefaultState(defaultState) {
	if(defaultState === null) {
		return {
			name: "",
			description: "",
			startTime: null,
			endTime: null,
			url: "",
			eventType: "fcfs",
			eventFrameId: "",
			fcfs: [],
			draw: {}
		};
	}

	const tempState = {...defaultState};

	if(tempState.startTime !== null) tempState.startTime = new Date(tempState.startTime);
	if(tempState.endTime !== null) tempState.endTime = new Date(tempState.endTime);
	if(tempState.eventType === "fcfs")
	{
		tempState.fcfs = defaultState.fcfs.map( ({startTime, endTime, ...others})=>{
			return {
				...others,
				startTime: startTime === null ? null : new Date(startTime),
				endTime: endTime === null ? null : new Date(endTime)
			}
		} )
		tempState.draw = {};
	}
	if(tempState.eventType === "draw")
	{
		tempState.fcfs = [];
		tempState.draw = {...defaultState.draw};
	}

	return tempState;
}

function getDefaultFcfsArray(startTime, endTime, config = {start: 0, end: 1435, participantCount: 100})
{
	if(startTime === null || endTime === null) return [];

	const MINUTES = 60 * 1000;
	const ONE_DAY = 24 * 60 * MINUTES;

	const TIME_ZONE_OFFSET = new Date().getTimezoneOffset() * MINUTES;
	const startDate = Math.floor((startTime.valueOf() - TIME_ZONE_OFFSET) / ONE_DAY);
	const endDate = Math.floor((endTime.valueOf() - TIME_ZONE_OFFSET) / ONE_DAY);

	const length = endDate - startDate + 1;
	const trueStartDate = startDate * ONE_DAY + TIME_ZONE_OFFSET;

	return Array.from({length}, (_, i)=>({
		startTime: new Date(Math.max(trueStartDate + i * ONE_DAY + config.start * MINUTES, startTime.valueOf())),
		endTime: new Date(Math.min(trueStartDate + i * ONE_DAY + config.end * MINUTES, endTime.valueOf())), 
		participantCount: config.participantCount,
		prizeInfo: ""
	}));
}

export function eventEditReducer(state, action) {
	switch(action.type) {
		case "set_name":
			return {...state, name:action.value};
		case "set_description":
			return {...state, description:action.value};
		case "set_start_date":{
			const newState = {...state, startTime: action.value};
			return newState;
		}
		case "set_end_date":
			return {...state, endTime: action.value};
		case "set_url":
			return {...state, url: action.value};
		case "set_event_type":
			if(action.value === "draw")
			{
				return {...state, eventType: "draw", fcfs: []};
			}
			return
			{
				return {...state, eventType: "fcfs", draw: {}};
			}
		case "set_event_frame":
			return {...state, eventFrameId: action.value};
		case "auto_fill_fcfs":
			return {...state, fcfs: getDefaultFcfsArray(state.startTime, state.endTime, action.config)};
		case "add_fcfs_item":
			return {...state, fcfs: [...state.fcfs, action.value]};
	}
}