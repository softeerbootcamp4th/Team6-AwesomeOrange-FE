import { useRef } from "react";
import useSectionInitialize from "../scroll/useSectionInitialize";

export default function InteractionPage() {
  const SECTION_IDX = 0;
  const sectionRef = useRef(null);
  useSectionInitialize(SECTION_IDX, sectionRef);

  return <div ref={sectionRef} className="bg-black h-[2017px]"></div>;
}
