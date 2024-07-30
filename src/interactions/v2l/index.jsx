import ClientOnly from "@/common/ClientOnly.jsx";
import InteractionDescription from "../InteractionDescription.jsx";
import Puzzle from "./Puzzle.jsx";
import style from "./style.module.css";
//import PuzzleSkeleton from "./PuzzleSkeleton.jsx";

function V2LInteraction({ interactCallback, $ref }) {
  return (
    <article className="relative w-full h-full overflow-hidden flex items-center flex-col">
      <InteractionDescription
        order="4"
        title="언제 어디서나, 편리하게"
        description="The new IONIQ 5로 전자기기를 작동시킬 수 있을까요?"
        directive="타일을 클릭하여 The new IONIQ 5로 선풍기를 작동시켜보세요!"
      />
      <div className={`absolute ${style.container} origin-top`}>
        <ClientOnly fallback={<div>스켈레톤 그릴 예정</div>}>
          <Puzzle $ref={$ref} interactCallback={interactCallback} />
        </ClientOnly>
      </div>
    </article>
  );
}

export default V2LInteraction;
