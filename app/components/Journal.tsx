"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AudioRecords from "./AudioRecord";
import Analysis from "./Analysis";

const mentalHealthTips = [
  "Take a moment to breathe deeply and center yourself.",
  "Write down one thing you appreciate about yourself today.",
  "Remember: It's okay to feel. Emotions are part of being human.",
  "You are stronger than you think—celebrate small victories.",
  "Gratitude can shift your mood: note 3 things you're grateful for.",
];

function getRandomTip() {
  return mentalHealthTips[Math.floor(Math.random() * mentalHealthTips.length)];
}

function getToday9AM() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0, 0);
}

export default function Journal() {
  const [isOpen, setIsOpen] = useState(false);
  const [entryTitle, setEntryTitle] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [entryContent, setEntryContent] = useState("");
  const [dailyTip, setDailyTip] = useState("");
  const [postSubmit, setPostSubmit] = useState(false);

  useEffect(() => {
    const now = new Date();
    const today9am = getToday9AM();

    // Get stored data
    const stored = localStorage.getItem("journalData");
    if (stored) {
      // Parse the existing data
      const { completed, lastReset } = JSON.parse(stored);

      if (now >= today9am && new Date(lastReset) < today9am) {
        localStorage.setItem(
          "journalData",
          JSON.stringify({ completed: false, lastReset: now })
        );
        setDailyTip(getRandomTip());
        setIsOpen(true);
      } else {
        if (!completed) {
          setDailyTip(getRandomTip());
          setIsOpen(true);
        }
      }
    } else {
      localStorage.setItem(
        "journalData",
        JSON.stringify({ completed: false, lastReset: now })
      );
      setDailyTip(getRandomTip());
      setIsOpen(true);
    }
  }, []);

  const openJournal = () => {
    setDailyTip(getRandomTip());
    setIsOpen(true);
  };

  const closeJournal = () => {
    setIsOpen(false);
    setPostSubmit(false);
  };

  const handleSave = () => {
    console.log("Journal Entry Saved:", {
      entryTitle,
      entryDate,
      entryContent,
    });

    const now = new Date();
    localStorage.setItem(
      "journalData",
      JSON.stringify({ completed: true, lastReset: now })
    );

    setPostSubmit(true);

    //closeJournal();
  };

  const wordCount = entryContent.trim().split(/\s+/).filter(Boolean).length;

  return (
    <>
      <div className="fixed bottom-8 right-12 z-50">
        <button
          onClick={openJournal}
          className="
            px-6
            py-3
            bg-lime-100
            text-black
            font-bold
            border-2
            border-black
            rounded-lg
            shadow-[2px_2px_0_0_rgba(0,0,0,1)]
            hover:scale-105
            transition-transform
            font-sans
          "
        >
          Write your daily journal
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="
              fixed
              inset-0
              z-50
              flex
              font-sans
              items-center
              justify-center
              bg-black/60
              backdrop-blur-sm
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={closeJournal}
          >
            {!postSubmit && (
              <motion.div
                className="
                relative
                w-[90%]
                max-w-4xl
                h-auto
                bg-white
                border
                border-gray-300
                rounded-lg
                shadow-xl
                flex
                flex-col
                overflow-hidden
              "
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button (top-right) */}
                <button
                  onClick={closeJournal}
                  className="
                  absolute
                  top-4
                  right-4
                  p-2
                  bg-red-200
                  text-gray-700 
                  rounded
                  border
                  border-gray-400
                  shadow-sm
                  hover:scale-105
                  transition-transform
                "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6L6 18" />
                    <path d="M6 6l12 12" />
                  </svg>
                </button>

                {/* Two-Column Layout */}
                <div className="flex flex-row">
                  {/* Left Column */}
                  <div
                    className="
                    w-1/2
                    p-6
                    md:p-8
                    border-r
                    border-gray-300
                    bg-lined-paper
                  "
                  >
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                      Journal Details
                    </h2>

                    {/* Title */}
                    <label className="text-sm font-semibold text-gray-700">
                      Title
                    </label>
                    <input
                      type="text"
                      value={entryTitle}
                      onChange={(e) => setEntryTitle(e.target.value)}
                      placeholder="Give your entry a name..."
                      className="
                      w-full
                      p-2
                      mt-1
                      mb-3
                      border
                      border-gray-300
                      rounded
                      focus:outline-none
                      text-gray-800
                      bg-white
                    "
                    />

                    {/* Date */}
                    <label className="text-sm font-semibold text-gray-700">
                      Date
                    </label>
                    <input
                      type="date"
                      value={entryDate}
                      onChange={(e) => setEntryDate(e.target.value)}
                      className="
                      w-full
                      p-2
                      mt-1
                      mb-3
                      border
                      border-gray-300
                      rounded
                      focus:outline-none
                      text-gray-800
                      bg-white
                    "
                    />

                    {/* Gentle Reminder */}
                    <div className="mt-4 p-3 border border-gray-300 rounded bg-indigo-200">
                      <h3 className="font-semibold text-gray-800 mb-1">
                        Gentle Reminder
                      </h3>
                      <p className="text-sm text-gray-600">{dailyTip}</p>
                    </div>

                    {/* Placeholder image below the Gentle Reminder */}
                    <img
                      src="/graphics/cat.png"
                      alt="Cat"
                      className="mt-6 w-full h-auto"
                    />
                  </div>

                  <div
                    className="
                    w-1/2
                    p-6
                    md:p-8
                    bg-lined-paper
                    relative
                  "
                  >
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                      Reflection
                    </h2>
                    <textarea
                      rows={16}
                      value={entryContent}
                      onChange={(e) => setEntryContent(e.target.value)}
                      placeholder="How are you feeling today? Reflect on your day, your progress, or anything on your mind..."
                      className="
                      w-full
                      p-2
                      border
                      border-gray-300
                      rounded
                      focus:outline-none
                      resize-none
                      text-gray-800
                      bg-white
                      mb-3
                    "
                    />
                    {/* Word count */}
                    <p className="text-sm text-gray-600 mb-2">
                      Word Count:{" "}
                      <span className="font-semibold">
                        {entryContent
                          ? entryContent.trim().split(/\s+/).filter(Boolean)
                              .length
                          : 0}
                      </span>
                    </p>

                    <p className="font-normal text-sm mt-8 text-gray-600">
                      Voice out how you feel instead!
                    </p>

                    {/* Audio Recorder */}
                    <AudioRecords />

                    <div className="absolute bottom-6 right-6">
                      <button
                        onClick={handleSave}
                        className="
                        px-5
                        py-3
                        bg-lime-100
                        text-black
                        border-2
                        border-black
                        rounded-md
                        shadow-[2px_2px_0_0_rgba(0,0,0,1)]
                        hover:scale-105
                        transition-transform
                        font-bold

                      "
                      >
                        Save Entry
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            {postSubmit && <Analysis />}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
