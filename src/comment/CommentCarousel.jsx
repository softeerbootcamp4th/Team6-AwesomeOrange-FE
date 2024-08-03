import { useRef } from "react";
import AutoScrollCarousel from "./autoScrollCarousel";

function CommentCarousel({comments})
{
	return <div className="w-full h-32">
		<AutoScrollCarousel speed={0.2} gap={20}>
			{comments.map( ({id, title, user})=>(
				<div className="w-48 bg-blue-400" key={id}>
					<p>{title}</p>
					<p>{user}</p>
				</div>
			) )}
		</AutoScrollCarousel>
	</div>
}

export default CommentCarousel;