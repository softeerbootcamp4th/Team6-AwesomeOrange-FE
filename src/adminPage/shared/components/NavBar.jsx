import { useNavigate } from "react-router-dom";

import NavBarItem from "./NavBarItem.jsx";
import useAuthStore, { logout } from "@admin/auth/store.js";

function NavBar()
{
	const navigate = useNavigate();
	const isLogin = useAuthStore( store=>store.isLogin );
	function onLogoutClick()
	{
		logout();
		navigate("/login");
	}

	return <nav className="w-36 h-screen sticky flex-shrink-0 top-0 bg-black flex flex-col items-center p-4 gap-4">
		<p className="text-white py-4 border-b-2 border-white">관리자 페이지</p>
		<ul className="w-full flex flex-col justify-center">
			<NavBarItem disabled={!isLogin} to="/events">events</NavBarItem>
			<NavBarItem disabled={!isLogin} to="/comments">기대평</NavBarItem>
			{isLogin && <NavBarItem onClick={onLogoutClick}>LOGOUT</NavBarItem>}
		</ul>
	</nav>
}


export default NavBar;