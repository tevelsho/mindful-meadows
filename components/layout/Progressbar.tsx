import React from "react";

export const ProgressBar = ({ progress = 70 }) => {
  return (
    <div
      className="
        fixed
        left-0
        top-1/2
        -translate-y-1/2
        flex
        flex-col
        items-center
        z-50
        p-12
      "
    >
      <div
        className="
          relative
          h-96
          w-12
          bg-white
          border-4
          border-black
          rounded-full
          shadow-[8px_8px_0_0_rgba(0,0,0,1)]
        "
      >
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 rotate-[-20deg]">
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

        <div
          className="
            absolute
            bottom-0
            left-0
            w-full
            bg-lime-200
            border-t-2
            flex
            items-end
            justify-center
            rounded-full
          "
          style={{ height: `${progress}%` }}
        >
          <span className="mb-1 text-black font-bold">{progress}%</span>
        </div>

        {/* Milestone lines */}
        <div className="absolute left-0 w-full h-0.5 bg-black" style={{ top: "25%" }} />
        <div className="absolute left-0 w-full h-0.5 bg-black" style={{ top: "50%" }} />
        <div className="absolute left-0 w-full h-0.5 bg-black" style={{ top: "75%" }} />
      </div>
    </div>
  );
};
