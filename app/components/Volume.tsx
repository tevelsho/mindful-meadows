"use client";
import React, { useState } from "react";

export const Volume = () => {
  const [showPlayer, setShowPlayer] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleVolumeClick = () => {
    setShowPlayer((prev) => !prev);
  };

  const toggleHeart = () => {
    setLiked((prev) => !prev);
  };

  return (
    <>
      <div
        onClick={handleVolumeClick}
        className="
          fixed
          bottom-8
          left-12
          z-50
          cursor-pointer
          transition-transform
          duration-300
          transform
          text-white
          border-2
          border-black
          rounded-full
          px-3
          py-1
          shadow-[2px_2px_0_0_rgba(0,0,0,1)]
          hover:scale-105
          bg-green-700
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="rotate-[-190deg] scale-x-[-1]"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 8a5 5 0 0 1 0 8" />
          <path d="M17.7 5a9 9 0 0 1 0 14" />
          <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />
        </svg>
      </div>
      <div
        className={`
          fixed
          bottom-28
          left-12
          z-50
          w-80
          h-72
          border-2
          border-black
          rounded-md
          shadow-[2px_2px_0_0_rgba(0,0,0,1)]
          bg-[#304529]
          text-white
          p-6
          flex
          flex-col
          items-center
          gap-4
          transition-all
          duration-300
          ease-out
          transform
          ${
            showPlayer
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }
        `}
      >
        <h2 className="text-2xl font-bold">Happy Time</h2>
        <p className="text-sm text-white">Yapmeister feat. Beethoven</p>
        <div className="flex items-center w-72 justify-between px-1">
          <span className="text-xs text-white">0:12</span>
          <span className="text-xs text-white">3:08</span>
        </div>
        <div className="relative w-72 h-2 bg-white border-2 border-white rounded-full">
          <div
            className="absolute left-0 top-0 h-full bg-lime-200"
            style={{ width: "35%" }}
          />
        </div>
        <div className="flex items-center justify-center w-full mt-4 space-x-8">
          <button className="text-white hover:text-gray-600 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 19l-9-7 9-7v14zM22 5v14" />
            </svg>
          </button>
          <button className="text-white hover:text-gray-600 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 3l14 9-14 9V3z" />
            </svg>
          </button>
          <button className="text-white hover:text-gray-600 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 19l9-7-9-7v14zM2 5v14" />
            </svg>
          </button>
          <button
            onClick={toggleHeart}
            className="text-white hover:text-gray-600 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M20.42 4.58c-1.52-1.52-3.6-2.08-5.47-1.68-1.34.28-2.6 1.08-3.47 2.18-0.87-1.1-2.13-1.9-3.47-2.18-1.87-0.4-3.95.16-5.47 1.68-2.1 2.1-2.1 5.5 0 7.6l8.94 8.94 8.94-8.94c2.1-2.1 2.1-5.5 0-7.6z"
                fill={liked ? "red" : "none"}
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};
