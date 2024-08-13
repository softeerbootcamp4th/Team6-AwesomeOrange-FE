function Container({children})
{
	return <div className="w-full min-h-screen flex">
		<div>내비게이션 바</div>
		<div className="w-full h-full min-h-screen flex-grow flex justify-center items-center">
			{children}
		</div>
	</div>
}

export default Container;