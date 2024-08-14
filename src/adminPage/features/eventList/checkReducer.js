function checkReducer(state, action) {
  switch (action.type) {
    case "reset":
      return new Set();
    case "check_key":
      const newSet = new Set(state);
      if(action.value === true) newSet.add(action.key);
      else if(action.value === false) newSet.delete(action.key);
      else if(state.has(action.key)) newSet.delete(action.key);
      else newSet.add(action.key);
      return newSet;
  }
  throw Error("unknown action.");
}

export default checkReducer;