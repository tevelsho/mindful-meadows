"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

export default function Journal() {
  const [isOpen, setIsOpen] = useState(false);

  // Journal fields
  const [entryTitle, setEntryTitle] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [entryMood, setEntryMood] = useState("Neutral");
  const [entryAffirmation, setEntryAffirmation] = useState("");
  const [entryGratitude, setEntryGratitude] = useState("");
  const [entryActionStep, setEntryActionStep] = useState("");
  const [entryContent, setEntryContent] = useState("");

  const [dailyTip, setDailyTip] = useState("");

  const openJournal = () => {
    setDailyTip(getRandomTip());
    setIsOpen(true);
  };
  const closeJournal = () => setIsOpen(false);

  const handleSave = () => {
    console.log("Journal Entry Saved:", {
      entryTitle,
      entryDate,
      entryMood,
      entryAffirmation,
      entryGratitude,
      entryActionStep,
      entryContent,
    });
    closeJournal();
  };

  const wordCount = entryContent.trim().split(/\s+/).filter(Boolean).length;

  return (
    <>
      <div className="fixed bottom-8 right-12">
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
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
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

              <div className="flex flex-row">
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

                  {/* Mood */}
                  <label className="text-sm font-semibold text-gray-700">
                    Mood
                  </label>
                  <select
                    value={entryMood}
                    onChange={(e) => setEntryMood(e.target.value)}
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
                  >
                    <option value="Happy">Happy</option>
                    <option value="Sad">Sad</option>
                    <option value="Stressed">Stressed</option>
                    <option value="Calm">Calm</option>
                    <option value="Anxious">Anxious</option>
                    <option value="Grateful">Grateful</option>
                    <option value="Neutral">Neutral</option>
                  </select>

                  {/* Gratitude */}
                  <label className="text-sm font-semibold text-gray-700">
                    What are you grateful for today?
                  </label>
                  <input
                    type="text"
                    value={entryGratitude}
                    onChange={(e) => setEntryGratitude(e.target.value)}
                    placeholder="E.g., Family, friends, a sunny day..."
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

                  {/* Action Step */}
                  <label className="text-sm font-semibold text-gray-700">
                    One small step I can take today
                  </label>
                  <input
                    type="text"
                    value={entryActionStep}
                    onChange={(e) => setEntryActionStep(e.target.value)}
                    placeholder="E.g., Go for a short walk, call a friend..."
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

                  {/* Affirmation */}
                  <label className="text-sm font-semibold text-gray-700">
                    Your Affirmation
                  </label>
                  <input
                    type="text"
                    value={entryAffirmation}
                    onChange={(e) => setEntryAffirmation(e.target.value)}
                    placeholder="e.g., 'I am strong and capable.'"
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
                </div>

                {/* Right Page: also .bg-lined-paper for that “realistic” look */}
                <div
                  className="
                    w-1/2
                    p-6
                    md:p-8
                    bg-lined-paper
                  "
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Reflection
                  </h2>
                  <textarea
                    rows={8}
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
                  <p className="text-sm text-gray-600 mb-4">
                    Word Count: <span className="font-semibold">{wordCount}</span>
                  </p>

                  <div className="flex justify-end">
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
