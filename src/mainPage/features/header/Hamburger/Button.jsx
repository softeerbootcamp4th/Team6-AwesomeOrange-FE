import { useState } from "react";
import style from "./style.module.css";

function HamburgerButton({children})
{
	const [opened, setOpened] = useState(false);
	return <>
		<button className="flex md:hidden justify-center items-center size-8 z-10" aria-label="open-menu" onClick={ ()=>setOpened((state)=>!state) }>
			<div className={style.hamburger} data-opened={opened} >
				<div></div>
			</div>
		</button>
		<div className="fixed -z-10 w-full top-0 left-0 bg-white flex md:hidden flex-col justify-center items-center gap-2">{opened && children}</div>
	</>
}

export default HamburgerButton;