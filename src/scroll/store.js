import { create } from "zustand";

export const useSectionStore = create((set) => ({
  sectionList: [null, null, null, null],
  currentSection: -1,
  updateCurrentSection: (newSection) => set({ currentSection: newSection }),
  uploadSection: (index, section) =>
    set((state) => {
      const updatedList = [...state.sectionList];
      updatedList[index] = section;
      return { sectionList: updatedList };
    }),
}));
