import useUserStore from "@main/auth/store.js";
import useDrawStore from "./store.js";

function InteractionEventJoinDataFetcher() {
  const isLogin = useUserStore((store) => store.isLogin);
  const getData = useDrawStore((store) => store.getJoinData);
  getData(isLogin);
  return null;
}

export default InteractionEventJoinDataFetcher;
