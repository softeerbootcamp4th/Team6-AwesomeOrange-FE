import { useState } from "react";
import Input from "@common/components/Input.jsx";
import search from "./assets/search.svg";

function SearchBar({onSearch = ()=>{}})
{
	const [query, setQuery] = useState("");

	return <form className="relative flex items-center" onSubmit={(e)=>{
			e.preventDefault();
			onSearch(query);
			setQuery("");
		}}>
		<Input text={query} setText={setQuery} name="search"/>
		<button type="submit" className="absolute size-8 right-4 flex justify-center items-center">
			<img src={search} alt="검색" className="size-6" />
		</button>
	</form>
}

export default SearchBar;