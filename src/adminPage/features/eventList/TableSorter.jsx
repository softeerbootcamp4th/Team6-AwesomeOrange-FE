function TableSorter({className, children, state, setState})
{
	function onClick()
	{
		if(state === "asc") return setState( "desc" );
		if(state === "desc") return setState( "none" );
		return setState( "asc" );
	}
	return <button className={`${className ?? ""}`} onClick={ onClick }>
		{children}
		{state === "asc" ? "^" : state === "desc" ? "V" : ""}
	</button>
}

export default TableSorter;