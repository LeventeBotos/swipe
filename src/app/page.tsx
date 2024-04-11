"use client";
import { useEffect, useState } from "react";
import { collection, query, getDocs, addDoc } from "firebase/firestore";
import { db, auth } from "./firebase";
import TinderCard from "react-tinder-card";

export default function Feed() {
  const [profiles, setProfiles] = useState<any[]>([
    {
      id: 1,
      name: "John Doe",
      img: "https://gamingtales.tech/logo.png",
    },
    {
      id: 2,
      name: "John Does",
      img: "https://gamingtales.tech/logo.png",
    },
    {
      id: 3,
      name: "John Doee",
      img: "https://gamingtales.tech/logo.png",
    },

    // Add more profile objects as needed
  ]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      const profilesCollection = collection(db, "users");
      const profilesQuery = query(profilesCollection);
      const snapshot = await getDocs(profilesQuery);
      const profilesData = snapshot.docs.map((doc) => doc.data());
      if (profilesData.length) setProfiles(profilesData);
    };
    fetchProfiles();

    const unsubscribe = auth.onAuthStateChanged((user: any) => setUser(user));
    return () => unsubscribe();
  }, []);

  const swiped = (direction: any, nameToDelete: any) => {
    switch (direction) {
      case "down":
        console.log("showing other photos");
        return 0;
      case "up":
        console.log("showing profile");
        return 0;
      case "left":
        console.log("dislike");
        return 0;
      case "right":
        console.log("like");
        return 0;
    }
    console.log("removing: " + nameToDelete);

    setProfiles(
      profiles.filter((character) => character.name !== nameToDelete)
    );
  };

  // const handleSwipe = async (direction: string, profileId: number) => {
  //   if (user) {
  //     const likeOrDislike =
  //       direction === "right" ? "likedProfiles" : "dislikedProfiles";
  //     const userPreferencesCollection = collection(db, "userPreferences");
  //     if (user) {
  //       await addDoc(userPreferencesCollection, {
  //         userId: user.uid,
  //         [likeOrDislike]: profileId,
  //       });
  //     } else {
  //       throw new Error("Error with user");
  //     }
  //   }
  // };

  return (
    <div className="flex bg-[#1f1f1f] justify-center items-center h-screen">
      <div className="flex flex-col justify-evenly items-center">
        {profiles.map((profile, index) => (
          <TinderCard
            key={profile.name}
            className={`absolute card  `}
            onSwipe={(dir) => swiped(dir, profile.name)}

            // swipeThreshold={500}
            // onCardLeftScreen={() => outOfFrame(character.name)}
          >
            <div className="w-full h-full relative">
              <img
                src={profile.img}
                alt={profile.name}
                draggable="false"
                className=" w-full object-cover h-full rounded-lg shadow-lg"
              />
              <p className="absolute text-xl font-semibold text-white bottom-0 p-3 left-0 right-0 self-center z-10 ">
                {profile.name}
              </p>
            </div>
          </TinderCard>
        ))}
      </div>
      {/* {profiles.map((profile) => (
        <TinderCard
          key={profile.id}
          // onSwipe={(direction) => handleSwipe(direction, profile.id)}
          onSwipe={(direction) => console.log(direction, profile.id)}
        >
          <img
            src={profile.image}
            alt={profile.name}
            draggable="false"
            className="max-w-md  rounded-lg shadow-lg"
          />
        </TinderCard>
      ))} */}
    </div>
  );
}

// "use client";

// import { useState } from "react";

// import Advanced from "./Test";
// import Simple from "./Simple";

// const profiles = [
//   {
//     id: 1,
//     name: "John Doe",
//     image: "https://gamingtales.tech/logo.png",
//   },
//   {
//     id: 2,
//     name: "John Doe",
//     image: "https://gamingtales.tech/logo.png",
//   },
//   {
//     id: 3,
//     name: "John Doe",
//     image: "https://gamingtales.tech/logo.png",
//   },

//   // Add more profile objects as needed
// ];

// export default function Home() {
//   const [currentProfileIndex, setCurrentProfileIndex] = useState(0);

//   const handleSwipeRight = () => {
//     console.log("Liked!");
//     // Add your logic here for handling swipe right
//     // e.g., API call to like the profile
//     setCurrentProfileIndex(currentProfileIndex + 1);
//   };

//   const handleSwipeLeft = () => {
//     console.log("Disliked!");
//     // Add your logic here for handling swipe left
//     setCurrentProfileIndex(currentProfileIndex + 1);
//   };

//   const handleSwipeUp = () => {
//     console.log("Show Profile!");
//     // Add your logic here for handling swipe up
//   };

//   return (
//     <div className="bg-[#1f1f1f] w-full  text-white h-screen flex flex-col items-center justify-center">
//       <Simple />
//     </div>
//   );
// }
