function AlertModalContainer({title, description, image, children})
{
	const containerStyle = "w-[calc(100%-1rem)] max-w-[31.25rem] h-[calc(100svh-2rem)] p-10 shadow bg-white relative flex flex-col justify-between items-center"
	return <div className={`${containerStyle} ${image == null ? "max-h-[15.625rem]" : "max-h-[31.25rem]" }`}>
      <div className="flex flex-col gap-2 items-center">
        <p className="text-body-l font-bold text-neutral-700">{title}</p>
        <p className="w-full max-w-80 text-body-s font-medium text-neutral-400 text-center">
          {description}
        </p>
      </div>
      {image && <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center pointer-events-none">
        {image}
      </div>}
      {children}
    </div>
}

export default AlertModalContainer;