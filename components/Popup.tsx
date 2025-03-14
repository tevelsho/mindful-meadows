"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Popup() {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    // Open the popup every time the page is loaded/refreshed
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User typed:", userInput);
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-lg"
          onClick={handleClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <motion.div
            className="
              relative
              w-[75%]
              md:w-2/5
              h-auto
              p-6
              md:p-8
              bg-yellow-200
              border-4
              border-black
              shadow-[4px_4px_0_0_rgba(0,0,0,1)]
              rounded-2xl
              font-sans
              flex
              flex-col
              text-left
            "
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popup
            initial={{ opacity: 0, scale: 0.9, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotateY: -90 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="
                absolute
                top-4
                right-4
                p-2
                bg-purple-200
                rounded-md
                border-2
                border-black
                shadow-[2px_2px_0_0_rgba(0,0,0,1)]
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
              </svg>
            </button>

            <h2 className="font-bold text-2xl mb-4 text-black">
              Checking in on you!
            </h2>
            <p className="mb-4 text-gray-800">
              We’d love to know how you’re feeling lately so we can pick the
              perfect music to match your mood. Please share your thoughts
              below:
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Write how you feel..."
                className="
                  w-full
                  h-24
                  p-2
                  bg-white
                  border-2
                  border-black
                  rounded-md
                  shadow-[2px_2px_0_0_rgba(0,0,0,1)]
                  focus:outline-none
                "
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="
                    px-4
                    py-2
                    bg-pink-200
                    text-black
                    border-2
                    border-black
                    rounded-md
                    shadow-[2px_2px_0_0_rgba(0,0,0,1)]
                    hover:scale-105
                    transition-transform
                  "
                >
                  Submit
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
