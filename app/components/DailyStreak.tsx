"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const starPath = (
    <path d="M17.108 22.085c-1.266 -.068 -2.924 -.859 -5.071 -2.355l-.04 -.027l-.037 .027c-2.147 1.497 -3.804 2.288 -5.072 2.356l-.178 .005c-2.747 0 -3.097 -2.64 -1.718 -7.244l.054 -.178l-.1 -.075c-6.056 -4.638 -5.046 -7.848 2.554 -8.066l.202 -.005l.115 -.326c1.184 -3.33 2.426 -5.085 4.027 -5.192l.156 -.005c1.674 0 2.957 1.76 4.182 5.197l.114 .326l.204 .005c7.6 .218 8.61 3.428 2.553 8.065l-.102 .075l.055 .178c1.35 4.512 1.04 7.137 -1.556 7.24l-.163 .003z" />
);

const flamePath = (
    <path d="M10 2c0 -.88 1.056 -1.331 1.692 -.722c1.958 1.876 3.096 5.995 1.75 9.12l-.08 .174l.012 .003c.625 .133 1.203 -.43 2.303 -2.173l.14 -.224a1 1 0 0 1 1.582 -.153c1.334 1.435 2.601 4.377 2.601 6.27c0 4.265 -3.591 7.705 -8 7.705s-8 -3.44 -8 -7.706c0 -2.252 1.022 -4.716 2.632 -6.301l.605 -.589c.241 -.236 .434 -.43 .618 -.624c1.43 -1.512 2.145 -2.924 2.145 -4.78" />
);

// Flame icon with a gradient fill for the button
const buttonFlameIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="72"
        height="72"
        viewBox="0 0 24 24"
    >
        <defs>
            <linearGradient id="buttonFlameGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#F8A530" />
                <stop offset="100%" stopColor="#FFD700" />
            </linearGradient>
        </defs>
        <g fill="url(#buttonFlameGradient)">
            {flamePath}
        </g>
    </svg>
);

export const DailyStreak = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleStreak = () => setIsOpen(!isOpen);

    return (
        <>
            <div className="fixed bottom-4 left-36 z-49">
                <button
                    onClick={toggleStreak}
                    className="
            hover:scale-105
            transition-transform
          "
                >
                    {buttonFlameIcon}
                </button>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="
              fixed inset-0
              z-50
              flex items-center justify-center
              bg-black/60
              backdrop-blur-sm
            "
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        onClick={toggleStreak}
                    >
                        <motion.div
                            className="
                relative
                w-[100%]
                max-w-xl
                bg-white
                border-2 border-black
                rounded-xl
                shadow-[2px_2px_0_0_rgba(0,0,0,1)]
                p-20
                flex flex-col
                items-center
                text-center
              "
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative mb-6 flex items-center justify-center w-48 h-48">
                                <div className="absolute top-0 left-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        className="text-yellow-400 animate-pulse"
                                        viewBox="0 0 24 24"
                                    >
                                        {starPath}
                                    </svg>
                                </div>
                                <div className="absolute top-0 right-8">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        fill="currentColor"
                                        className="text-yellow-300 animate-spin-slow"
                                        viewBox="0 0 24 24"
                                    >
                                        {starPath}
                                    </svg>
                                </div>
                                <div className="absolute bottom-6 left-14">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="text-orange-300 animate-pulse"
                                        viewBox="0 0 24 24"
                                    >
                                        {starPath}
                                    </svg>
                                </div>
                                <div className="absolute bottom-20 left-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="text-yellow-500 animate-pulse"
                                        viewBox="0 0 24 24"
                                    >
                                        {starPath}
                                    </svg>
                                </div>
                                <div className="absolute top-6 right-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="text-orange-200 animate-pulse"
                                        viewBox="0 0 24 24"
                                    >
                                        {starPath}
                                    </svg>
                                </div>
                                <div className="absolute bottom-14 right-0">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="22"
                                        height="22"
                                        fill="currentColor"
                                        className="text-orange-400 animate-pulse"
                                        viewBox="0 0 24 24"
                                    >
                                        {starPath}
                                    </svg>
                                </div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute bottom-8 w-48 h-48"
                                    viewBox="0 0 24 24"
                                >
                                    <defs>
                                        <linearGradient
                                            id="flameGradient"
                                            x1="0%"
                                            y1="100%"
                                            x2="0%"
                                            y2="0%"
                                        >
                                            <stop offset="0%" stopColor="#F8A530" />
                                            <stop offset="100%" stopColor="#FFD700" />
                                        </linearGradient>
                                    </defs>
                                    <g fill="url(#flameGradient)">
                                        {flamePath}
                                    </g>
                                </svg>
                                <span className="relative z-10 text-6xl font-bold text-white">
                  1
                </span>
                            </div>
                            <div className="flex items-center justify-center mb-6">
                                {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => {
                                    const isActive = i === 0;
                                    return (
                                        <div
                                            key={i}
                                            className="relative flex items-center justify-center w-20 h-20"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                className={`
                          absolute bottom-4 left-0 w-20 h-20
                          ${
                                                    isActive
                                                        ? "text-[#F8A530] fill-current"
                                                        : "text-gray-200 fill-current"
                                                }
                        `}
                                            >
                                                {flamePath}
                                            </svg>
                                            <span
                                                className={`
                          relative z-10 font-bold
                          ${isActive ? "text-white" : "text-gray-500"}
                        `}
                                            >
                        {day}
                      </span>
                                        </div>
                                    );
                                })}
                            </div>
                            <h2 className="text-2xl font-bold text-red-400 mb-4">
                                1 Day Streak!
                            </h2>
                            <p className="text-gray-500 text-normal">
                                Water other people&apos;s plants for a week straight for bonus points (or show off that streak)!
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
