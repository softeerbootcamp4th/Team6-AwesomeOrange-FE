function CommentCarouselError()
{
	return <div className="w-full h-[29rem] flex justify-center items-center px-6">
		<div className="w-full max-w-[1200px] h-96 bg-neutral-50 flex justify-center items-center">
			<p className="text-body-s md:text-body-m lg:text-body-l text-red-500">기대평 정보를 불러오지 못했어요!</p>
		</div>
	</div>
}

export default CommentCarouselError;