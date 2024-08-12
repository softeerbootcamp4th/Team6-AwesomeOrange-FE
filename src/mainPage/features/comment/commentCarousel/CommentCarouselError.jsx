function CommentCarouselError() {
  return (
    <div className="w-full h-[29rem] flex justify-center items-center px-6">
      <div className="w-full max-w-[1200px] h-96 bg-neutral-50 flex flex-col justify-center items-center gap-4">
        <img
          src="/icons/error.svg"
          alt="불러오기 오류"
          width="120"
          height="120"
        />
        <p className="text-body-l text-red-500 font-bold">
          기대평 정보를 불러오지 못했어요!
        </p>
      </div>
    </div>
  );
}

export default CommentCarouselError;
