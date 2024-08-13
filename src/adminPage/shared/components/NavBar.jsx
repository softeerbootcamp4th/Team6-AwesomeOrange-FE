import { Link } from "react-router-dom";

function NavBar()
{
	return <nav className="w-36 h-screen sticky flex-shrink-0 top-0 bg-black flex flex-col items-center p-4 gap-4">
		<p className="text-white py-4 border-b-2 border-white">관리자 페이지</p>
		<ul className="w-full flex flex-col justify-center text-neutral-200">
			<li className="w-full h-12 flex justify-center items-center"><Link >event</Link></li>
			<li className="w-full h-12 flex justify-center items-center"><Link >기대평</Link></li>
			<li className="w-full h-12 flex justify-center items-center"><button>LOGOUT</button></li>
		</ul>
	</nav>
}


export default NavBar;