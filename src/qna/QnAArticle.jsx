import { useState, useRef } from "react";
import arrow from "./assets/arrow.svg";

function QnAArticle({question, answer})
{
	const [opened, setOpened] = useState(false);
	const [visible, setVisible] = useState(false);
	const timeoutRef = useRef(null);

	function onClick()
	{
		if(!opened) {
			setVisible(true);
			clearTimeout(timeoutRef.current);
			requestAnimationFrame(()=>setOpened(true));
		}
		else {
			setOpened(false);
			timeoutRef.current = setTimeout(()=>setVisible(false), 200);
		}
	}
	const staticArticleStyle = `text-neutral-400 text-justify relative
	before:w-full before:h-full before-block before:absolute before:bg-white before:pointer-events-none
	before:scale-y-0 before:transition-transform before:duration-200 before:ease-linear before:origin-bottom`;
	const staticIconStyle = "size-10 transition-transform ease-in-out-cubic";

	return <article className="w-full max-w-[1200px] flex flex-col gap-8 py-6 text-body-s md:text-body-m lg:text-body-l">
		<div className="flex justify-between">
			<h3 className="flex gap-3 font-bold text-black">
				<span className="text-blue-400">Q.</span>
				{question}
			</h3>
			<img className={`${staticIconStyle} ${opened ? "rotate-0" : "rotate-180"}`}
			src={arrow}
			alt={opened ? "닫기" : "열기"}
			onClick={onClick}
			draggable="false"/>
		</div>
		<p className={`${staticArticleStyle} ${opened ? "before:scale-y-0" : "before:scale-y-100"} ${visible ? "block" : "hidden"}`}>{answer}</p>
	</article>
}

export default QnAArticle;