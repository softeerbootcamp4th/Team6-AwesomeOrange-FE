import QnAArticle from "./QnAArticle.jsx";
//import content from "./content.json";

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

function QnASection()
{
	return <section className="w-full px-4 py-[7.5rem] flex flex-col items-center">
		<QnAArticle question="hello, world!" answer={lorem} />
	</section>
}

export default QnASection