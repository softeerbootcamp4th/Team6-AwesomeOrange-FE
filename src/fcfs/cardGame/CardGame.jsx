import { useState } from "react";
import CardGameTitle from "./CardGameTitle.jsx";
import Card from "./Card.jsx";

import openModal from "@/modal/openModal.js";
import FcfsWinModal from "../modals/FcfsWinModal.jsx";
import FcfsLoseModal from "../modals/FcfsLoseModal.jsx";
import FcfsInvalidModal from "../modals/FcfsInvalidModal.jsx";
import AuthModal from "@/auth/AuthModal.jsx";

import useFcfsStore from "../store.js";
import * as Status from "../constants.js";
import { EVENT_ID } from "@/common/constants.js";
import { fetchServer, handleError } from "@/common/dataFetch/fetchServer.js";

function getLocked(eventStatus, isParticipated, offline) {
  if (offline) return false;
  if (isParticipated) return true;
  if (eventStatus === Status.PROGRESS || eventStatus === Status.OFFLINE)
    return false;
  return true;
}

const submitCardgameErrorHandle = {
  400: "banned",
  401: "unauthorized",
  offline: "offline",
};

function CardGame({ offline }) {
  // states
  const eventStatus = useFcfsStore((store) => store.eventStatus);
  const isParticipated = useFcfsStore((store) => store.isParticipated);
  const [flipState, setFlipState] = useState([false, false, false, false]);
  const [transLocked, setTransLocked] = useState(false);
  const [offlineMode, setOfflineMode] = useState(offline);
  const [offlineAnswer, setOfflineAnswer] = useState(3);

  // derived values
  const isOffline = offlineMode || eventStatus === Status.OFFLINE;
  const isLocked = getLocked(eventStatus, isParticipated, offlineMode);

  function reset() {
    if (transLocked || !isOffline) return;
    setFlipState([false, false, false, false]);
    setOfflineAnswer(Math.floor(Math.random() * 4) + 1);
  }

  function getCardAnswerOffline(index) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(offlineAnswer === index), 1000);
    });
  }

  async function getCardAnswerOnline(index) {
    const fetchConfig = { method: "post", body: { eventAnswer: index } };
    try {
      const { answerResult, winner } = await fetchServer(
        `/api/v1/event/fcfs/${EVENT_ID}`,
        fetchConfig,
      ).catch(handleError(submitCardgameErrorHandle));
      if (answerResult) {
        if (winner) openModal(<FcfsWinModal />);
        else openModal(<FcfsLoseModal />);
      }
      return answerResult;
    } catch (e) {
      switch (e.message) {
        case submitCardgameErrorHandle[400]:
          openModal(<FcfsInvalidModal />);
          break;
        case submitCardgameErrorHandle[401]:
          openModal(
            <AuthModal onComplete={() => getCardAnswerOnline(index)} />,
          );
          break;
        case submitCardgameErrorHandle["offline"]:
          setOfflineMode(true);
          reset();
          return false;
      }
      throw e;
    }
  }

  const cardProps = {
    locked: isLocked || transLocked,
    setGlobalLock: setTransLocked,
    getCardAnswer: isOffline ? getCardAnswerOffline : getCardAnswerOnline,
  };

  return (
    <>
      <div className="h-32 flex justify-center items-center">
        <CardGameTitle
          status={
            offlineMode
              ? Status.OFFLINE
              : isParticipated
                ? Status.ALREADY
                : eventStatus
          }
        />
      </div>
      <div className="relative grid grid-cols-2 min-[1140px]:grid-cols-4 gap-10">
        {[1, 2, 3, 4].map((index, i) => (
          <Card
            index={index}
            isFlipped={flipState[i]}
            setFlipped={(flipState) =>
              setFlipState((state) => {
                const newState = [...state];
                newState[i] = flipState;
                return newState;
              })
            }
            key={`card ${index}`}
            {...cardProps}
          />
        ))}
        <button
          className="absolute size-16 rounded-full bg-white right-0 -bottom-20"
          hidden={!isOffline}
          onClick={reset}
        >
          리셋하기
        </button>
      </div>
    </>
  );
}

export default CardGame;
