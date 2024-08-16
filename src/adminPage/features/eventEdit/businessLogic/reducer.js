import FcfsData from "./FcfsData.js";
import DrawGradeData from "./DrawGradeData.js";
import DrawPolicyData from "./DrawPolicyData.js";
import { MAX_GRADE } from "./constants.js";

function makeVoidDrawData() {
  return {
    metadata: new DrawGradeData(),
    policies: new DrawPolicyData(),
  };
}

function makeDrawData(rawData) {
  return {
    id: rawData.id,
    metadata: new DrawGradeData(rawData.metadata),
    policies: new DrawPolicyData(rawData.policies),
  };
}

export function setDefaultState(defaultState) {
  if (defaultState === null || defaultState === undefined) {
    return {
      name: "",
      description: "",
      startTime: null,
      endTime: null,
      url: "",
      eventType: "fcfs",
      eventFrameId: "",
      fcfs: new FcfsData(),
      draw: makeVoidDrawData(),
    };
  }

  const tempState = { ...defaultState };

  if (tempState.startTime !== null)
    tempState.startTime = new Date(tempState.startTime);
  if (tempState.endTime !== null)
    tempState.endTime = new Date(tempState.endTime);
  if (tempState.eventType === "fcfs") {
    tempState.fcfs = new FcfsData(defaultState.fcfs);
    tempState.draw = makeVoidDrawData();
  }
  if (tempState.eventType === "draw") {
    tempState.fcfs = new FcfsData();
    tempState.draw = makeDrawData(defaultState.draw);
  }

  return tempState;
}

export function eventEditReducer(state, action) {
  switch (action.type) {
    case "set_name":
      return { ...state, name: action.value };
    case "set_description":
      return { ...state, description: action.value };
    case "set_start_date": {
      const newState = { ...state, startTime: action.value };
      if (state.eventType === "fcfs")
        newState.fcfs = state.fcfs.verifyDate(action.value, state.endTime);
      return newState;
    }
    case "set_end_date": {
      const newState = { ...state, endTime: action.value };
      if (state.eventType === "fcfs")
        newState.fcfs = state.fcfs.verifyDate(state.startTime, action.value);
      return newState;
    }
    case "set_date_range": {
      const newState = {
        ...state,
        startTime: action.value[0],
        endTime: action.value[1],
      };
      if (state.eventType === "fcfs")
        newState.fcfs = state.fcfs.verifyDate(...action.value);
      return newState;
    }
    case "set_url":
      return { ...state, url: action.value };
    case "set_event_type":
      if (action.value === "draw") {
        return { ...state, eventType: "draw", fcfs: new FcfsData() };
      }
      return { ...state, eventType: "fcfs", draw: makeVoidDrawData() };
    case "set_event_frame":
      return { ...state, eventFrameId: action.value };
    case "auto_fill_fcfs":
      if (state.eventType === "draw") return state;
      return {
        ...state,
        fcfs: FcfsData.fillDefault(
          state.startTime,
          state.endTime,
          action.config,
        ),
      };
    case "add_fcfs_item":
      if (state.eventType === "draw") return state;
      return { ...state, fcfs: state.fcfs.add(action.value) };
    case "delete_fcfs_item":
      if (state.eventType === "draw") return state;
      return { ...state, fcfs: state.fcfs.delete(action.key) };
    case "modify_fcfs_item":
      if (state.eventType === "draw") return state;
      return { ...state, fcfs: state.fcfs.modify(action.key, action.value) };
    case "modify_all_fcfs_item": {
      if (state.eventType === "draw") return state;
      const { startTime, endTime } = state;
      return {
        ...state,
        fcfs: state.fcfs.modifyAll(action.value, { startTime, endTime }),
      };
    }
    case "modify_draw_total_grade":
      if (state.eventType === "fcfs") return state;
      if (action.value > MAX_GRADE || action.value < 0) return state;
      return {
        ...state,
        draw: {
          ...state.draw,
          metadata: state.draw.metadata.adjustCount(action.value),
        },
      };
    case "modify_draw_grade_item":
      if (state.eventType === "fcfs") return state;
      return {
        ...state,
        draw: {
          ...state.draw,
          metadata: state.draw.metadata.modify(action.value),
        },
      };
    case "add_draw_policy":
      if (state.eventType === "fcfs") return state;
      return {
        ...state,
        draw: {
          ...state.draw,
          policies: state.draw.policies.add({ action: "", score: 0 }),
        },
      };
    case "delete_draw_policy":
      if (state.eventType === "fcfs") return state;
      return {
        ...state,
        draw: {
          ...state.draw,
          policies: state.draw.policies.delete(action.key),
        },
      };
    case "modify_draw_policy":
      if (state.eventType === "fcfs") return state;
      return {
        ...state,
        draw: {
          ...state.draw,
          policies: state.draw.policies.modify(action.key, action.value),
        },
      };
  }
}
