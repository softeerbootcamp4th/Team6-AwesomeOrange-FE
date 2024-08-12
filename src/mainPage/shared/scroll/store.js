import { create } from "zustand";

export const useSectionStore = create((set) => ({
  sectionList: [null, null, null, null, null],
  isVisibleList: [false, false, false, false, false],
  uploadSection: (index, section) =>
    set((state) => {
      const updatedList = [...state.sectionList];
      updatedList[index] = section;
      return { sectionList: updatedList };
    }),
  setIsVisibleList: (index, value) =>
    set((state) => {
      const updatedList = [...state.isVisibleList];
      updatedList[index] = value;
      return { isVisibleList: updatedList };
    }),
}));
