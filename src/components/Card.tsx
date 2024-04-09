import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const SwipeableCard = ({
  profile,
  onSwipeRight,
  onSwipeLeft,
  onSwipeUp,
}: any) => {
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useTransform(x, [-100, 100], [0, 1]);

  const handleDragEnd = (event: any, info: any) => {
    setIsDragging(false);
    if (info.point.x > 50) {
      onSwipeRight();
    } else if (info.point.x < -50) {
      onSwipeLeft();
    } else if (info.point.y < -50) {
      onSwipeUp();
    }
  };

  return (
    <motion.div
      style={{
        x,
        y,
        opacity,
        position: "absolute",
        left: "50%",
        top: "50%",
        width: "300px",
        height: "400px",
        borderRadius: "8px",
        backgroundColor: "white",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        zIndex: isDragging ? 1 : 0,
        cursor: "grab",
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
    >
      {/* Content of your card */}
      <img
        src={profile.image}
        alt={profile.name}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
    </motion.div>
  );
};

export default SwipeableCard;
