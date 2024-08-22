import { createContext } from "react";
import { setDefaultState } from "./reducer.js";

export const EventEditContext = createContext(setDefaultState());
export const EventEditDispatchContext = createContext(() => console.error("context 지정 안 됨"));
export const EventEditModeContext = createContext("create");
