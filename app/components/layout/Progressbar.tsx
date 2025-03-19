import React from "react";

export const ProgressBar = ({ progress = 84 }) => {
  const milestones = [0, 25, 50, 75, 100];

  return (
    <div className="fixed bottom-8 left-0 right-0 flex justify-center items-center z-40 font-sans">
      <div className="relative w-[50%] h-10 bg-[#f9f3ec] border-2 border-black rounded-full overflow-hidden shadow-lg">
        <div className="absolute -top-0 left-2 right-0 z-20 flex justify-between items-center px-2">
          {milestones.map((m) => (
            <div key={m} className="flex flex-col items-center">
              <span className="text-xs font-bold text-black mt-3">{m}%</span>
            </div>
          ))}
        </div>
        <div
          className="h-full transition-all duration-500"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(to right, #a8e6cf, #dcedc1)",
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)",
          }}
        ></div>
        <div
          className="absolute top-0 z-30 flex items-center space-x-1"
          style={{ left: `calc(${progress}% - 12px)` }}
        ></div>
      </div>
    </div>
  );
};
