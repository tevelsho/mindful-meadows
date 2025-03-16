"use client";
import React from "react";
import { useReactMediaRecorder } from "react-media-recorder";

const AudioRecords = () => {
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({ audio: true });

  const isRecording = status === "recording";

  // Toggle recording on/off
  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="my-4">
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16">
          {isRecording && (
            <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping" />
          )}

          <button
            onClick={handleToggleRecording}
            className={`
              relative
              inline-flex
              items-center
              justify-center
              w-16
              h-16
              rounded-full
              bg-red-300
              text-white
              border-2
              border-black
              shadow-[2px_2px_0_0_rgba(0,0,0,1)]
              hover:scale-105
              transition-transform
            `}
          >
            {/* Mic SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="icon icon-tabler icons-tabler-filled icon-tabler-microphone"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M19 9a1 1 0 0 1 1 1a8 8 0 0 1 -6.999 7.938l-.001 2.062h3a1 1 0 0 1 0 2h-8a1 1 0 0 1 0 -2h3v-2.062a8 8 0 0 1 -7 -7.938a1 1 0 1 1 2 0a6 6 0 0 0 12 0a1 1 0 0 1 1 -1m-7 -8a4 4 0 0 1 4 4v5a4 4 0 1 1 -8 0v-5a4 4 0 0 1 4 -4" />
            </svg>
          </button>
        </div>

        <p className="text-sm text-gray-600">Status: {status}</p>
      </div>
      {mediaBlobUrl && (
        <audio
          src={mediaBlobUrl}
          controls
          className="mt-4 w-full border border-gray-300 rounded"
        />
      )}
    </div>
  );
};

export default AudioRecords;
