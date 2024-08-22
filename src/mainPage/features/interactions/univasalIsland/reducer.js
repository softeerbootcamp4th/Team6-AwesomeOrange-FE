import { clamp } from "@common/utils.js";

const PHONE_INITIAL_X = 150;
const PHONE_INITIAL_Y = 100;

export function getDefaultState() {
  return {
    islandY: 0,
    phoneX: PHONE_INITIAL_X,
    phoneY: PHONE_INITIAL_Y,
    phoneIsSnapping: false,
    phoneShouldSnapped: false,
    islandKeyControlled: false,
  };
}

function islandReducer(state, action) {
  switch (action.type) {
    case "reset-snap":
      return { ...state, phoneShouldSnapped: false, islandKeyControlled: false };
    case "grab-key-island":
      return { ...state, islandKeyControlled: action.value };
    case "move-island": {
      const newY = typeof action.mutate === "function" ? action.mutate(state.islandY) : action.y;
      const islandY = clamp(newY, -50, 50);
      return {
        ...state,
        phoneShouldSnapped: false,
        islandY,
        phoneX: state.phoneIsSnapping ? 0 : state.phoneX,
        phoneY: state.phoneIsSnapping ? islandY : state.phoneY,
      };
    }
    case "move-phone":
      if (typeof action.mutate === "function") {
        const { x, y } = action.mutate({ x: state.phoneX, y: state.phoneY });
        return { ...state, phoneShouldSnapped: false, phoneX: x, phoneY: y };
      } else return { ...state, phoneX: action.x, phoneY: action.y };
    case "drop-phone": {
      let snap = action.isSnapped;
      if (action.valueSnap) {
        snap = Math.hypot(state.islandY - state.phoneY, state.phoneX) < 75;
      }
      if (snap)
        return {
          islandY: state.islandY,
          phoneX: 0,
          phoneY: state.islandY,
          phoneShouldSnapped: true,
          phoneIsSnapping: true,
          islandKeyControlled: false,
        };
      else return { ...state, phoneIsSnapping: false };
    }
    case "reset":
      return getDefaultState();
  }
}

export default islandReducer;
