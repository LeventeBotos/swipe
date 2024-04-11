import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";

const db = [
  {
    name: "Richard Hendricks",
    url: "https://gamingtales.tech/logo.png",
  },
  {
    name: "Erlich Bachman",
    url: "https://gamingtales.tech/logo.png",
  },
  {
    name: "Monica Hall",
    url: "https://gamingtales.tech/logo.png",
  },
  {
    name: "Jared Dunn",
    url: "https://gamingtales.tech/logo.png",
  },
  {
    name: "Dinesh Chugtai",
    url: "https://gamingtales.tech/logo.png",
  },
];

function Simple() {
  const [characters, setCharacters] = useState(db);
  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);

    setLastDirection(direction);
    setCharacters(
      characters.filter((character) => character.name !== nameToDelete)
    );
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  return (
    <div className="flex flex-col justify-evenly items-center">
      {characters.map((character) => (
        <TinderCard
          key={character.name}
          className="swipe"
          onSwipe={(dir) => swiped(dir, character.name)}
          onCardLeftScreen={() => outOfFrame(character.name)}
        >
          <div
            style={{ backgroundImage: "url(" + character.url + ")" }}
            className="card"
          >
            <h3>{character.name}</h3>
          </div>
        </TinderCard>
      ))}

      {lastDirection ? (
        <h2 className="infoText">You swiped {lastDirection}</h2>
      ) : (
        <h2 className="infoText" />
      )}
    </div>
  );
}

export default Simple;
