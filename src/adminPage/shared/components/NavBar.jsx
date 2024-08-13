import NavBarItem from "./NavBarItem.jsx";

function NavBar()
{
	return <nav className="w-36 h-screen sticky flex-shrink-0 top-0 bg-black flex flex-col items-center p-4 gap-4">
		<p className="text-white py-4 border-b-2 border-white">관리자 페이지</p>
		<ul className="w-full flex flex-col justify-center">
			<NavBarItem to="/events">events</NavBarItem>
			<NavBarItem to="/comments">기대평</NavBarItem>
			<NavBarItem>LOGOUT</NavBarItem>
		</ul>
	</nav>
}


export default NavBar;