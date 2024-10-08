import QnAArticle from "./QnAArticle.jsx";
import content from "./content.json";

function QnASection() {
  return (
    <section className="w-full px-6 py-20 lg:py-[7.5rem] flex flex-col items-center gap-5">
      <h2 className="text-head-s lg:text-head-m font-bold">자주 묻는 질문</h2>
      {content.map((item) => (
        <QnAArticle key={item.question} {...item} />
      ))}
    </section>
  );
}

export default QnASection;
