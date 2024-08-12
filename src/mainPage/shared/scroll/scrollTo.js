import { useSectionStore } from "./store";

export default function scrollTo(scrollIndex) {
  const state = useSectionStore.getState();
  const sectionDOM = state.sectionList[scrollIndex];
  sectionDOM.scrollIntoView({ behavior: "smooth" });
}
