import React, { useState } from "react";

const App = () => {
  const [happiness, setHappiness] = useState(50);
  const [hungryLevel, setHungryLevel] = useState(50);
  const [cleanLevel, setCleanLevel] = useState(50);
  const [status, setStatus] = useState("Dog is Happy");

  const updateStatus = () => {
    if (cleanLevel === 0) {
      setStatus("Dog is Dirty");
    } else if (hungryLevel === 0) {
      setStatus("Dog is Hungry");
    } else {
      setStatus("Dog is Happy");
    }
  };

  const playWithDog = () => {
    setHappiness((prevHappiness) => Math.min(prevHappiness + 20, 100));
    setHungryLevel((prevLevel) => {
      const newLevel = Math.max(prevLevel - 20, 0);
      if (newLevel === 0) {
        setStatus("Dog is Hungry");
      }
      return newLevel;
    });
    setCleanLevel((prevLevel) => {
      const newLevel = Math.max(prevLevel - 10, 0);
      if (newLevel === 0 && hungryLevel > 0) {
        setStatus("Dog is Dirty");
      }
      return newLevel;
    });
  };

  const feedDog = () => {
    setHappiness((prevHappiness) => Math.min(prevHappiness + 10, 100));
    setHungryLevel((prevLevel) => Math.min(prevLevel + 100, 100));
    setCleanLevel((prevLevel) => Math.max(prevLevel - 20, 0));
    updateStatus();
  };

  const cleanDog = () => {
    setHappiness((prevHappiness) => Math.max(prevHappiness - 60, 0));
    setCleanLevel((prevLevel) => Math.min(prevLevel + 20, 100));
    updateStatus();
  };

  const isCleanLevelMax = cleanLevel === 100;
  const isHungryLevelMax = hungryLevel === 100;
  const isCleanLevelZero = cleanLevel === 0;
  const isHungry = hungryLevel === 0;

  return (
    <>
      <h1>Status: {status}</h1>
      <p>Hungry Level: {hungryLevel}</p>
      <p>Clean Level: {cleanLevel}</p>
      <p>Happiness Level: {happiness}</p>
      <button onClick={playWithDog} disabled={isCleanLevelZero || isHungry}>
        Play With Dog
      </button>
      <button onClick={cleanDog} disabled={isHungry || isCleanLevelMax}>
        Clean Dog
      </button>
      <button onClick={feedDog} disabled={isCleanLevelZero || isHungryLevelMax}>
        Feed Dog
      </button>
    </>
  );
};

export default App;
