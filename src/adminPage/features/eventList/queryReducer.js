export function setDefaultState() {
  return {
    query: "",
    filter: {
      fcfs: true,
      draw: true,
    },
    sort: {
      eventId: "none",
      name: "none",
      startTime: "none",
      endTime: "none",
      eventType: "none",
    },
    page: 1,
  };
}

export function searchReducer(state, action) {
  switch (action.type) {
    case "set_query":
      return { ...state, query: action.value };
    case "set_filter":
      return {
        ...state,
        filter: { ...state.filter, [action.target]: !!action.value },
      };
    case "set_sort":
      return {
        ...state,
        sort: {
          ...state.sort,
          [action.target]:
            action.value === "asc" || action.value === "desc" ? action.value : "none",
        },
      };
    case "set_page":
      return {
        ...state,
        page: Number.isNaN(+action.value) ? 1 : +action.value,
      };
  }
  throw Error("unknown action.");
}

export function searchStateToQuery(state) {
  const path = "/api/v1/admin/events";
  const paramObj = {
    search: state.query,
    filter: Object.entries(state.filter)
      .filter(([, value]) => value)
      .map(([key]) => key)
      .join(","),
    sort: Object.entries(state.sort)
      .filter(([, value]) => value !== "none")
      .map(([key, value]) => `${key}:${value}`)
      .join(","),
    page: state.page - 1,
    size: 10,
  };
  if (state.query === "") delete paramObj.search;

  const searchParams = new URLSearchParams(paramObj);
  return `${path}?${searchParams.toString()}`;
}
