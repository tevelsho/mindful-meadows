"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function GardenModal({
  isOpen,
  onClose,
  children,
  id,
}: {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  id: number;
}) {
  let [userName, setUserName] = useState("");
  let [userEmotion, setUserEmotion] = useState([]);
  let [userSummary, setUserSummary] = useState("");

  useEffect(() => {
    fetch("dataset/users.json")
      .then((res) => res.json())
      .then(
        (
          json: {
            id: number;
            name: string;
            emotions: [];
            summary: string;
          }[]
        ) => {
          json.forEach((user) => {
            if (user.id === id) {
              setUserName(user.name);
              setUserEmotion(user.emotions);
              setUserSummary(user.summary);
              console.log(user.name);
            }
          });
        }
      );

    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);
  const modalVariants: Variants = {
    initial: {
      opacity: 0,
      scale: 0.9,
      filter: "blur(10px)", // Start with blur
      zIndex: -1,
      rotateY: 90, // Rotate the modal on the Y-axis
      transformOrigin: "center", // Ensure the rotation happens from the center
    },
    animate: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)", // Remove blur
      zIndex: 10,
      rotateY: 0, // No rotation when fully visible
      transition: {
        duration: 0.3, // Faster animation
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      filter: "blur(10px)", // Add blur on exit
      rotateY: -90, // Exit with counterclockwise rotation
      zIndex: -1,
      transition: {
        duration: 0.2, // Faster exit
        ease: "easeIn",
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} // Fade-in effect
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-lg"
          onClick={onClose} // Close when clicking the background
        >
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={modalVariants}
            className="relative w-[90%] md:w-4/5 h-1/2 p-4 md:p-12 bg-gray-100 rounded-2xl shadow-xl border-[1px] border-border overflow-scroll border-black font-sans flex flex-col"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <button onClick={onClose} className="absolute top-6 right-8">
              ✕
            </button>
            <div className="flex flex-row">
              <div className="w-7/12 flex-grow">
                <h2 className="font-bold text-3xl">{userName}</h2>
                <h3 className="pb-12">Choir's CCA Community Garden</h3>
                <h3 className="underline text-xl pb-4">{`${userName} is feeling ${userEmotion}`}</h3>
                <div>
                  <p className="text-lg">{userSummary}</p>
                  <p className="text-right italic text-sm">
                    AI Generated Summary <br /> User chose to share
                  </p>
                </div>
              </div>
              <div className="w-5/12 flex flex-col items-center justify-center">
                flower placeholder
              </div>
            </div>
            <div className="mt-auto">
              <button className="px-8 py-4 bg-blue-500 text-white rounded-lg">
                This button to be neobrutalised
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
