"use client";
import React, { useState, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";

interface Character {
  name: string;
  url: string;
}

const db: Character[] = [
  {
    name: "Richard Hendricks",
    url: "./img/richard.jpg",
  },
  {
    name: "Erlich Bachman",
    url: "./img/erlich.jpg",
  },
  {
    name: "Monica Hall",
    url: "./img/monica.jpg",
  },
  {
    name: "Jared Dunn",
    url: "./img/jared.jpg",
  },
  {
    name: "Dinesh Chugtai",
    url: "./img/dinesh.jpg",
  },
];

function Advanced() {
  const [currentIndex, setCurrentIndex] = useState<number>(db.length - 1);
  const [lastDirection, setLastDirection] = useState<string | undefined>();
  // used for outOfFrame closure
  const currentIndexRef = useRef<number>(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((_, i) => React.createRef<any>()),
    []
  );

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction: string, nameToDelete: string, index: number) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name: string, idx: number) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    if (currentIndexRef.current >= idx && childRefs[idx].current)
      childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = async (dir: string) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current?.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current?.restoreCard();
  };

  return (
    <div className="bg-red-400 h-screen w-full">
      <h1 className="text-2xl font-bold">React Tinder Card</h1>
      <div className="flex flex-wrap justify-center">
        {db.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="swipe m-2"
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name, index)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}
          >
            <div
              style={{ backgroundImage: `url(${character.url})` }}
              className="card bg-cover bg-center relative w-64 h-96 rounded-md"
            >
              <h3 className="absolute bottom-4 left-4 text-white font-semibold">
                {character.name}
              </h3>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className="flex justify-center space-x-4 mt-4">
        <button
          className={`px-4 py-2 rounded ${
            !canSwipe && "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={() => swipe("left")}
          disabled={!canSwipe}
        >
          Swipe left!
        </button>
        <button
          className={`px-4 py-2 rounded ${
            !canGoBack && "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={goBack}
          disabled={!canGoBack}
        >
          Undo swipe!
        </button>
        <button
          className={`px-4 py-2 rounded ${
            !canSwipe && "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={() => swipe("right")}
          disabled={!canSwipe}
        >
          Swipe right!
        </button>
      </div>
      {lastDirection ? (
        <h2 className="text-xl mt-4">You swiped {lastDirection}</h2>
      ) : (
        <h2 className="text-xl mt-4">
          Swipe a card or press a button to get Restore Card button visible!
        </h2>
      )}
    </div>
  );
}

export default Advanced;
