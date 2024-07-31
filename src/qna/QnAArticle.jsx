function QnAArticle({question, answer})
{
	return <article className="w-full max-w-[1200px] flex flex-col gap-8 py-6 text-body-s md:text-body-m lg:text-body-l">
		<div className="flex justify-between">
			<h3 className="flex gap-3 font-bold text-black">
				<span className="text-blue-400">Q.</span>
				{question}
			</h3>
			<div></div>
		</div>
		<p className="text-neutral-400 text-justify">{answer}</p>
	</article>
}

export default QnAArticle;