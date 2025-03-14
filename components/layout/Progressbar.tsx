import React from "react";

export const ProgressBar = ({ progress = 70 }) => {
  return (
    <div
      className="
        fixed
        left-12
        top-[55%]
        -translate-y-1/2
        flex
        flex-col
        items-center
        z-50
        font-sans
      "
    >
      {/* Trophy Icon on top (Ensuring it's in front) */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 rotate-[-10deg] z-50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="#FF6961"
          className="icon icon-tabler icons-tabler-filled icon-tabler-trophy"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M17 3a1 1 0 0 1 .993 .883l.007 .117v2.17a3 3 0 1 1 0 5.659v.171a6.002 6.002 0 0 1 -5 5.917v2.083h3a1 1 0 0 1 .117 1.993l-.117 .007h-8a1 1 0 0 1 -.117 -1.993l.117 -.007h3v-2.083a6.002 6.002 0 0 1 -4.996 -5.692l-.004 -.225v-.171a3 3 0 0 1 -3.996 -2.653l-.003 -.176l.005 -.176a3 3 0 0 1 3.995 -2.654l-.001 -2.17a1 1 0 0 1 1 -1h10zm-12 5a1 1 0 1 0 0 2a1 1 0 0 0 0 -2zm14 0a1 1 0 1 0 0 2a1 1 0 0 0 0 -2z" />
        </svg>
      </div>

      {/* Outer container (tube) */}
      <div
        className="
          relative
          h-[500px]
          w-10
          bg-white
          border-[3px]
          border-black
          rounded-full
          overflow-hidden
          flex
          items-center
        "
      >
        {/* Inner progress fill */}
        <div
          className="
            absolute
            bottom-0
            left-0
            w-full
            bg-amber-200
            rounded-full
            transition-all
            duration-500
          "
          style={{ height: `${progress}%` }}
        ></div>
      </div>

      {/* Progress Indicator with Arrow */}
      <div
        className="absolute left-full flex items-center space-x-1"
        style={{ top: `calc(${100 - progress}% - 12px)` }} // Dynamic positioning
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="icon icon-tabler icons-tabler-filled icon-tabler-arrow-badge-left"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M17 6h-6a1 1 0 0 0 -.78 .375l-4 5a1 1 0 0 0 0 1.25l4 5a1 1 0 0 0 .78 .375h6l.112 -.006a1 1 0 0 0 .669 -1.619l-3.501 -4.375l3.5 -4.375a1 1 0 0 0 -.78 -1.625z" />
        </svg>
        <span className="text-black font-bold">{progress}%</span>
      </div>
    </div>
  );
};
