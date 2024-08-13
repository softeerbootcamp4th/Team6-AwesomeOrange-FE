import { useReducer } from "react";

import { searchReducer, setDefaultState, searchStateToQuery } from "./reducer.js";

import SearchBar from "./SearchBar.jsx";
import Filter from "./Filter.jsx";
import Button from "@common/components/Button.jsx";
import Checkbox from "@common/components/Checkbox.jsx";



function EventList()
{
	const [ state, dispatch ] = useReducer( searchReducer, null, setDefaultState );

	return <div className="w-full h-full flex flex-col gap-4">
		<div className="flex justify-end">
			<Button>+ 이벤트 등록</Button>
		</div>
		<SearchBar />
		<Filter state={state.filter} dispatch={dispatch} />
	</div>
}

export default EventList;