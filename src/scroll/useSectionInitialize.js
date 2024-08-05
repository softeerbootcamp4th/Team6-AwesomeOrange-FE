import { useEffect } from "react";
import { useSectionStore } from "./store";

export default function useSectionInitialize(SECTION_IDX, sectionRef) {
  const uploadSection = useSectionStore((state) => state.uploadSection);
  const updateCurrentSection = useSectionStore(
    (state) => state.updateCurrentSection,
  );

  useEffect(() => {
    if (sectionRef.current) {
      uploadSection(SECTION_IDX, sectionRef.current);
    }

    const sectionDOM = sectionRef.current;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateCurrentSection(SECTION_IDX);
        }
      });
    }, {});

    if (sectionDOM) {
      observer.observe(sectionDOM);
    }
    return () => {
      if (sectionDOM) {
        observer.unobserve(sectionDOM);
      }
    };
  }, [SECTION_IDX, sectionRef, uploadSection, updateCurrentSection]);
}
