"use client";
import React, { useState, useRef } from "react";

export default function AudioRecords() {
  const [permission, setPermission] = useState(false);
  const [recordingStatus, setRecordingStatus] = useState<"inactive" | "recording">("inactive");

  const [stream, setStream] = useState<MediaStream | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationIdRef = useRef<number | null>(null);

  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [audioURL, setAudioURL] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getMicrophonePermission = async () => {
    if (!("MediaRecorder" in window)) {
      alert("MediaRecorder API not supported in this browser.");
      return;
    }
    try {
      const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setPermission(true);
      setStream(micStream);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const startRecording = () => {
    if (!stream) return;
    setRecordingStatus("recording");

    const mimeType = "audio/webm";
    const recorder = new MediaRecorder(stream, { mimeType });
    mediaRecorder.current = recorder;

    const localChunks: Blob[] = [];
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        localChunks.push(e.data);
      }
    };

    recorder.onstop = () => {
      const audioBlob = new Blob(localChunks, { type: mimeType });
      const url = URL.createObjectURL(audioBlob);
      setAudioURL(url);
      setAudioChunks([]);
    };

    recorder.start();
    setAudioChunks(localChunks);

    // Set up wave analysis
    audioContextRef.current = new AudioContext();
    analyserRef.current = audioContextRef.current.createAnalyser();
    analyserRef.current.fftSize = 2048;

    const source = audioContextRef.current.createMediaStreamSource(stream);
    source.connect(analyserRef.current);

    drawWave();
  };

  const stopRecording = () => {
    setRecordingStatus("inactive");
    mediaRecorder.current?.stop();

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
    }
  };

  const drawWave = () => {
    if (!canvasRef.current || !analyserRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const analyser = analyserRef.current;
    const bufferLength = analyser.fftSize;
    const dataArray = new Uint8Array(bufferLength);

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    const draw = () => {
      if (!analyserRef.current) return;
      animationIdRef.current = requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(dataArray);

      // Fill background (currently black)
      ctx.fillStyle = "#000000"; 
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      // Red wave
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#ff4444";
      ctx.beginPath();

      const sliceWidth = WIDTH / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * HEIGHT) / 2;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        x += sliceWidth;
      }

      ctx.lineTo(WIDTH, HEIGHT / 2);
      ctx.stroke();
    };
    draw();
  };

  return (
    <div className="flex items-center mt-4 space-x-4 w-full">
      {/* Left side: record button area */}
      <div className="flex flex-col items-center">
        {/* If no permission or inactive => two circles, no pulse */}
        {(!permission || recordingStatus === "inactive") && (
          <button onClick={permission ? startRecording : getMicrophonePermission}
            className="flex flex-col items-center gap-1 hover:scale-105 transition-transform"
          >
            <div className="relative w-10 h-10 border-2 border-red-600 rounded-full flex items-center justify-center">
              <div className="bg-red-600 w-8 h-8 rounded-full" />
            </div>
            <span className="text-red-600 font-bold">REC</span>
          </button>
        )}

        {/* If recording => two circles with animate-pulse */}
        {permission && recordingStatus === "recording" && (
          <button onClick={stopRecording}
            className="flex flex-col items-center gap-1 hover:scale-105 transition-transform"
          >
            <div className="relative w-10 h-10 border-2 border-red-600 rounded-full flex items-center justify-center animate-pulse">
              <div className="bg-red-600 w-8 h-8 rounded-full" />
            </div>
            <span className="text-red-600 font-bold animate-pulse">REC</span>
          </button>
        )}
      </div>

      {/* Right side: the wave (canvas) */}
      <div className="flex-1">
        <canvas ref={canvasRef} width={600} height={100} />
      </div>

      {/* If we have an audio recording, show it top-right */}
      {audioURL && (
        <div className="absolute top-4 right-4 flex flex-col items-end">
          <audio src={audioURL} controls className="mb-2" />
          <a
            download
            href={audioURL}
            className="inline-block px-3 py-1 bg-lime-100 text-black border border-black rounded hover:scale-105 transition-transform"
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
}
