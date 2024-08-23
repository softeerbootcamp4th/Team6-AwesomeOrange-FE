import { useEffect } from "react";
import { useSectionStore } from "./store";

export default function useSectionInitialize(SECTION_IDX, sectionRef) {
  const uploadSection = useSectionStore((state) => state.uploadSection);
  const setIsVisibleList = useSectionStore((state) => state.setIsVisibleList);
  useEffect(() => {
    const sectionDOM = sectionRef.current;
    if (sectionDOM) {
      uploadSection(SECTION_IDX, sectionRef.current);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisibleList(SECTION_IDX, entry.isIntersecting);
        });
      },
      { threshold: 0.01 },
    );

    if (sectionDOM) {
      observer.observe(sectionDOM);
    }
    return () => {
      if (sectionDOM) {
        observer.unobserve(sectionDOM);
      }
    };
  }, [SECTION_IDX, sectionRef, uploadSection, setIsVisibleList]);
}
