import CommentCarouselError from "./CommentCarouselError.jsx";
import decoration from "./assets/decoration.svg";

const data = [{"id":94,"content":"fugiat do esse aliqua. id aliqua. nulla ea aliquip officia","userName":"tempor","createdAt":"2024-06-26T05:34:51.706Z"},{"id":136,"content":"esse eiusmod mollit qui cillum mollit nisi","userName":"ullamco","createdAt":"2024-07-04T16:23:59.027Z"},{"id":242,"content":"enim enim ex exercitation pariatur. cillum et sunt ea","userName":"ex","createdAt":"2024-06-08T19:06:46.095Z"},{"id":379,"content":"ad dolor in dolor in ipsum non ullamco adipiscing id","userName":"dolor","createdAt":"2024-06-19T23:01:51.266Z"},{"id":405,"content":"cupidatat voluptate voluptate nostrud ipsum sed cupidatat","userName":"dolore","createdAt":"2024-06-18T03:36:14.118Z"},{"id":519,"content":"veniam, qui laboris aliqua. reprehenderit officia eiusmod fugiat","userName":"labore","createdAt":"2024-07-21T07:53:21.315Z"},{"id":612,"content":"irure commodo incididunt adipiscing id","userName":"consequat.","createdAt":"2024-06-24T18:56:09.705Z"},{"id":732,"content":"quis sit ipsum est commodo nisi culpa","userName":"amet,","createdAt":"2024-07-16T10:39:22.315Z"},{"id":803,"content":"labore nisi adipiscing minim dolore nostrud veniam, dolore est","userName":"incididunt","createdAt":"2024-07-04T08:05:52.031Z"},{"id":917,"content":"fugiat esse cupidatat in Lorem pariatur. dolore elit,","userName":"occaecat","createdAt":"2024-07-18T23:02:54.028Z"},{"id":1097,"content":"in qui mollit quis dolore","userName":"aute","createdAt":"2024-06-23T11:55:29.284Z"},{"id":1181,"content":"dolor officia in ut exercitation in do aliquip nulla consectetur exercitation","userName":"irure","createdAt":"2024-07-13T15:51:01.118Z"},{"id":1262,"content":"Duis exercitation amet, pariatur. incididunt Lorem","userName":"sint","createdAt":"2024-07-03T12:37:10.643Z"},{"id":1355,"content":"eiusmod do ex incididunt adipiscing elit, sunt","userName":"in","createdAt":"2024-07-19T08:56:57.667Z"},{"id":1490,"content":"ex in in nostrud officia veniam, laborum.","userName":"Duis","createdAt":"2024-07-26T08:51:32.817Z"},{"id":1524,"content":"laborum. sunt dolore esse fugiat ipsum","userName":"Lorem","createdAt":"2024-07-04T05:01:22.505Z"},{"id":1682,"content":"non deserunt esse id aliqua. et adipiscing laboris","userName":"aliqua.","createdAt":"2024-06-24T05:11:57.790Z"},{"id":1708,"content":"cupidatat eiusmod sit nisi tempor in culpa magna eu ad","userName":"eiusmod","createdAt":"2024-06-23T16:52:38.719Z"},{"id":1884,"content":"veniam, deserunt cupidatat laboris voluptate dolor velit incididunt officia esse","userName":"occaecat","createdAt":"2024-06-13T00:47:45.831Z"},{"id":1906,"content":"labore nulla cillum ipsum commodo","userName":"Ut","createdAt":"2024-06-30T13:52:23.132Z"}];

function CommentSection() {
  return <section className="w-full flex flex-col items-center py-24 lg:py-60 gap-40">
    <div className="w-full flex flex-col items-center">
      <div className="relative flex flex-col gap-3 lg:gap-9 text-center font-bold items-center">
        <p className="text-body-m text-neutral-600 w-fit py-3 lg:py-5">
          기대평 작성하기
        </p>
        <h2 className="text-head-s lg:text-head-m text-black">
          UNIQUE한 <br className="hidden sm:inline"/>
          IONIQ 5의 <br className="inline sm:hidden"/>
          <span className="sketch-line">기대평</span>을 남겨주세요
        </h2>
        <img
          src={decoration}
          alt="heart"
          className="size-20 lg:size-28 absolute -top-2 sm:top-4 lg:top-10 -left-2 sm:left-12"
        />
      </div>
      <p className="text-body-m sm:text-title-s text-neutral-800 font-medium mt-10">기대평을 등록하면 추첨 이벤트의 당첨 확률이 올라갑니다.</p>
      <CommentCarouselError comments={data} />
    </div>
  </section>;
}

export default CommentSection;
