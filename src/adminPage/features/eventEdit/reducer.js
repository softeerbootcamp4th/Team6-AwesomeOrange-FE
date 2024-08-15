import FcfsData from "./FcfsData.js";

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
			fcfs: new FcfsData(),
			draw: {}
		};
	}

	const tempState = {...defaultState};

	if(tempState.startTime !== null) tempState.startTime = new Date(tempState.startTime);
	if(tempState.endTime !== null) tempState.endTime = new Date(tempState.endTime);
	if(tempState.eventType === "fcfs")
	{
		tempState.fcfs = new FcfsData(defaultState.fcfs);
		tempState.draw = {};
	}
	if(tempState.eventType === "draw")
	{
		tempState.fcfs = new FcfsData();
		tempState.draw = {...defaultState.draw};
	}

	return tempState;
}

export function eventEditReducer(state, action) {
	switch(action.type) {
		case "set_name":
			return {...state, name:action.value};
		case "set_description":
			return {...state, description:action.value};
		case "set_start_date":{
			const newState = {...state, startTime: action.value};
			if(state.eventType === "fcfs") newState.fcfs = state.fcfs.verifyDate(action.value, state.endTime);
			return newState;
		}
		case "set_end_date":
			const newState = {...state, startTime: action.value};
			if(state.eventType === "fcfs") newState.fcfs = state.fcfs.verifyDate(state.startTime, action.value);
			return newState;
		case "set_url":
			return {...state, url: action.value};
		case "set_event_type":
			if(action.value === "draw")
			{
				return {...state, eventType: "draw", fcfs: new FcfsData()};
			}
			return {...state, eventType: "fcfs", draw: {}};
		case "set_event_frame":
			return {...state, eventFrameId: action.value};
		case "auto_fill_fcfs":
			return {...state, fcfs: FcfsData.fillDefault(state.startTime, state.endTime, action.config)};
		case "add_fcfs_item":
			return {...state, fcfs: state.fcfs.add(action.value)};
		case "delete_fcfs_item":
			return {...state, fcfs: state.fcfs.delete(action.key)};
		case "modify_fcfs_item":
			return {...state, fcfs: state.fcfs.modify(action.key, action.value)};
		case "modify_all_fcfs_item":
			return {...state, fcfs: state.fcfs.modifyAll(action.value)};
	}
}