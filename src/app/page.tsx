"use client";

import { useState } from "react";

import Advanced from "./Test";
import Simple from "./Simple";

const profiles = [
  {
    id: 1,
    name: "John Doe",
    image: "https://gamingtales.tech/logo.png",
  },
  {
    id: 2,
    name: "John Doe",
    image: "https://gamingtales.tech/logo.png",
  },
  {
    id: 3,
    name: "John Doe",
    image: "https://gamingtales.tech/logo.png",
  },

  // Add more profile objects as needed
];

export default function Home() {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);

  const handleSwipeRight = () => {
    console.log("Liked!");
    // Add your logic here for handling swipe right
    // e.g., API call to like the profile
    setCurrentProfileIndex(currentProfileIndex + 1);
  };

  const handleSwipeLeft = () => {
    console.log("Disliked!");
    // Add your logic here for handling swipe left
    setCurrentProfileIndex(currentProfileIndex + 1);
  };

  const handleSwipeUp = () => {
    console.log("Show Profile!");
    // Add your logic here for handling swipe up
  };

  return (
    <div className="bg-[#1f1f1f] w-full  text-white h-screen flex flex-col items-center justify-center">
      <Simple />
    </div>
  );
}
