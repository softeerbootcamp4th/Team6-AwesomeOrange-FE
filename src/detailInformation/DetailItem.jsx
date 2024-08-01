function DetailItem({ img, title, description }) {
  return (
    <article className="w-full h-full p-8 md:p-12 relative flex flex-col justify-end">
      <img
        src={img}
        alt={title}
        className="absolute w-full h-full -z-10 top-0 left-0 object-cover"
        width="1920"
        height="1080"
      />
      <div className="text-white w-full flex flex-col gap-4">
        <h3 className="whitespace-pre-wrap text-title-s font-bold md:text-title-m lg:text-title-l">
          {title}
        </h3>
        <p className="whitespace-pre-wrap text-body-s font-medium md:text-body-m lg:text-body-l">
          {description}
        </p>
      </div>
    </article>
  );
}

export default DetailItem;
