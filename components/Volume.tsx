"use client";

import React, { useState } from "react";

export const Volume = () => {
  const [isMuted, setIsMuted] = useState(false);

  return (
    <div
      onClick={() => setIsMuted(!isMuted)}
      className={`
        fixed
        bottom-8
        left-12
        z-50
        cursor-pointer
        transition-transform
        duration-300
        transform
        no-underline
        text-black
        border-2
        border-black
        rounded-full
        px-3
        py-1
        shadow-[2px_2px_0_0_rgba(0,0,0,1)]
        hover:scale-105
        ${isMuted ? "bg-red-200" : "bg-green-700"}
      `}
    >
      {isMuted ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="
            icon icon-tabler icons-tabler-outline icon-tabler-volume-off
            rotate-[-190deg] scale-x-[-1]
          "
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 8a5 5 0 0 1 1.912 4.934m-1.377 2.602a5 5 0 0 1 -.535 .464" />
          <path d="M17.7 5a9 9 0 0 1 2.362 11.086m-1.676 2.299a9 9 0 0 1 -.686 .615" />
          <path d="M9.069 5.054l.431 -.554a.8 .8 0 0 1 1.5 .5v2m0 4v8a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l1.294 -1.664" />
          <path d="M3 3l18 18" />
        </svg>
      ) : (
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
          className="
            icon icon-tabler icons-tabler-outline icon-tabler-volume
            rotate-[-190deg] scale-x-[-1]
          "
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 8a5 5 0 0 1 0 8" />
          <path d="M17.7 5a9 9 0 0 1 0 14" />
          <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />
        </svg>
      )}
    </div>
  );
};
