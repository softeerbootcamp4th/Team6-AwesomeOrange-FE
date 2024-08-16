import { DEFAULT_END_TIME } from "../businessLogic/constants.js";

const STEP = 5;

export function getDefaultState()
{
	return {
		start: 0,
		end: DEFAULT_END_TIME,
		startCheck: false,
		endCheck: false,
	}
}

export function fcfsBatchControlReducer(state, action)
{
	switch(action.type)
	{
		case "toggle_start_time":
			return {...state, startCheck : action.value};
		case "toggle_end_time":
			return {...state, endCheck : action.value};
		case "set_start_time":{
			if(!state.startCheck) return state;
			const value = Math.round(action.value / STEP) * STEP;
			if(state.end > value) return {...state, start: value};
			if(state.end - STEP < 0) return {...state, start: 0, end: STEP};
			return {...state, start: state.end - STEP};
		}
		case "set_end_time":{
			if(!state.endCheck) return state;
			const value = Math.round(action.value / STEP) * STEP;
			if(state.start < value) return {...state, end: value};
			if(state.start + STEP > DEFAULT_END_TIME) return {...state, start: DEFAULT_END_TIME - STEP, end: DEFAULT_END_TIME};
			return {...state, end: state.start + STEP};
		}
		case "apply": {
			return action.value;
		}
	}
}

export function getBatchTimeConfig(state)
{
	const result = {};
	if(state.startCheck) result.start = state.start;
	if(state.endCheck) result.end = state.end;
	return result;
}