import { useEffect } from "react";
import { useSectionStore } from "./store";

export default function useSectionInitialize(SECTION_IDX, sectionRef) {
  const uploadSection = useSectionStore((state) => state.uploadSection);
  const setCurrentSection = useSectionStore((state) => state.setCurrentSection);
  const currentSection = useSectionStore((state) => state.currentSection);

  useEffect(() => {
    const sectionDOM = sectionRef.current;
    if (sectionDOM) {
      uploadSection(SECTION_IDX, sectionRef.current);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 미구현
          }
        });
      },
      { threshold: 0.05 },
    );

    if (sectionDOM) {
      observer.observe(sectionDOM);
    }
    return () => {
      if (sectionDOM) {
        observer.unobserve(sectionDOM);
      }
    };
  }, [
    SECTION_IDX,
    sectionRef,
    uploadSection,
    setCurrentSection,
    currentSection,
  ]);
}
