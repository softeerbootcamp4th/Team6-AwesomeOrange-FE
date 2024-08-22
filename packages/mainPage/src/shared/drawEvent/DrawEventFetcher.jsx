import useAuthStore from "@main/auth/store.js";
import useDrawStore from "./store.js";

function InteractionEventJoinDataFetcher() {
  const userId = useAuthStore((store) => store.userId);
  const getData = useDrawStore((store) => store.getJoinData);

  getData(userId);
  return null;
}

export default InteractionEventJoinDataFetcher;
