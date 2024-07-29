function InteractionDescription({ order, title, description, directive }) {
  return (
    <div className="w-full max-w-[1200px] px-10 lg:px-20 flex gap-2 items-start mt-16 lg:mt-[6.25rem] ">
      <img src={`/icons/property${order}.svg`} alt={order} />
      <div className="flex flex-col gap-3.5 font-bold">
        <h3 className="text-neutral-400 text-title-m md:text-title-l">
          {title}
        </h3>
        <p className="text-white text-body-m md:text-body-l">{description}</p>
        <p className="text-neutral-200 text-body-s">{directive}</p>
      </div>
    </div>
  );
}

export default InteractionDescription;
