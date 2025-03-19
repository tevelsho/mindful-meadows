"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const iconMappings: Record<string, React.ReactNode> = {
  frustration: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="#2E6F40"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-5 9.86a4.5 4.5 0 0 0 -3.214 1.35a1 1 0 1 0 1.428 1.4a2.5 2.5 0 0 1 3.572 0a1 1 0 0 0 1.428 -1.4a4.5 4.5 0 0 0 -3.214 -1.35zm-2.99 -4.2l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm6 0l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007z" />
    </svg>
  ),
  sadness: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="#2E6F40"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10 -10 10a10 10 0 1 1 0 -20m3.707 12.293a1 1 0 0 0 -1.262 -.125l-.945 .63l-.945 -.63l-.116 -.066a1 1 0 0 0 -.994 .066l-.945 .63l-.945 -.63a1 1 0 0 0 -1.262 .125l-1 1a1 1 0 0 0 0 1.414l.094 .083a1 1 0 0 0 1.32 -.083l.42 -.42l.818 .545l.116 .066a1 1 0 0 0 .994 -.066l.945 -.63l.945 .63l.116 .066a1 1 0 0 0 .994 -.066l.817 -.545l.42 .42a1 1 0 0 0 1.415 -1.414z" />
    </svg>
  ),
  exhaustion: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="#2E6F40"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10 -10 10a10 10 0 1 1 0 -20m2.5 13l-1.5 -1.5l-1.5 1.5m3 -6h-4m2 0v2m2 -4h-6m2 0v2" />
    </svg>
  ),
};
function Bear() {
  const { scene } = useGLTF("/models/teddybear.glb");
  return <primitive object={scene.clone()} scale={[0.01, 0.01, 0.01]} />;
}

export default function GardenModal({
  isOpen,
  onClose,
  id,
}: {
  isOpen: boolean;
  onClose: () => void;
  id: number;
}) {
  const [userName, setUserName] = useState("");
  const [userEmotions, setUserEmotions] = useState<string[]>([]);
  const [userSummary, setUserSummary] = useState("");

  // For the "Water Flower" sub-modal
  const [isWaterOpen, setIsWaterOpen] = useState(false);
  const [encouragingMessage, setEncouragingMessage] = useState("");

  // For the post message sent
  const [postMessage, setPostMessage] = useState(false);

  // Fetch user data from local JSON
  useEffect(() => {
    fetch("dataset/users.json")
      .then((res) => res.json())
      .then(
        (
          json: {
            id: number;
            name: string;
            emotions: string[];
            summary: string;
          }[]
        ) => {
          json.forEach((user) => {
            if (user.id === id) {
              setUserName(user.name);
              setUserEmotions(user.emotions);
              setUserSummary(user.summary);
            }
          });
        }
      );

    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen, id]);

  const progressValues = userEmotions.reduce<{ [key: string]: number }>(
    (acc, emotion) => {
      acc[emotion] = Math.floor(Math.random() * 100) + 1;
      return acc;
    },
    {}
  );

  const handleWaterFlower = () => {
    setIsWaterOpen(true);
  };

  const closeWaterModal = () => {
    setIsWaterOpen(false);
    setEncouragingMessage("");
  };

  const handleSendMessage = () => {
    console.log(`Encouraging message for ${userName}:`, encouragingMessage);
    setTimeout(() => setPostMessage(true), 150);
    setLoading(true);
    closeWaterModal();
    setTimeout(() => setLoading(false), 2000);
  };

  const [loading, setLoading] = useState(false);

  return (
    <>
      {/* MAIN Garden Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-lg"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateY: -90 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="
                relative
                w-[75%]
                md:w-2/5
                h-auto
                p-6
                md:p-8
                bg-green-100
                border-4
                border-black
                shadow-[2px_2px_0_0_rgba(0,0,0,1)]
                rounded-2xl
                font-sans
                flex
                flex-col
                text-left
              "
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="
                  absolute
                  top-4
                  right-4
                  p-2
                  bg-purple-200
                  rounded-md
                  border-2
                  border-black
                  shadow-[2px_2px_0_0_rgba(0,0,0,1)]
                  hover:scale-105
                  transition-transform
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M18 6l-12 12" />
                  <path d="M6 6l12 12" />
                </svg>
              </button>

              {/* User Name & Summary */}
              <h2 className="font-bold text-3xl text-black pb-4">{userName}</h2>
              <p className="pb-6 text-gray-800">{userSummary}</p>

              {/* Emotion Progress Bars */}
              <div className="space-y-6 w-full">
                {userEmotions.map((emotion, index) => (
                  <div key={index} className="flex flex-col space-y-2">
                    {/* Emotion Label */}
                    <span className="font-semibold text-black text-sm uppercase tracking-wide">
                      {emotion}
                    </span>
                    <div className="flex items-center space-x-4">
                      <div
                        className="
                          w-12
                          h-12
                          flex
                          items-center
                          justify-center
                          border-2
                          border-black
                          bg-white
                          rounded-lg
                          shadow-[2px_2px_0_0_rgba(0,0,0,1)]
                        "
                      >
                        {iconMappings[emotion] || iconMappings["frustration"]}
                      </div>
                      <div
                        className="
                          w-3/4
                          bg-white
                          border-2
                          border-black
                          rounded-lg
                          shadow-[2px_2px_0_0_rgba(0,0,0,1)]
                        "
                      >
                        <div
                          className="h-6 bg-blue-200 rounded-lg"
                          style={{ width: `${progressValues[emotion]}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col items-start">
                <button
                  onClick={handleWaterFlower}
                  className="
                    px-5
                    py-3
                    bg-green-200
                    text-black
                    border-2
                    border-black
                    rounded-md
                    shadow-[2px_2px_0_0_rgba(0,0,0,1)]
                    hover:scale-105
                    transition-transform
                  "
                >
                  Water {userName}&apos;s flower
                  <p className="text-sm text-gray-600">
                    (Write an encouraging message)
                  </p>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isWaterOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm font-sans"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={closeWaterModal}
          >
            <motion.div
              className="
                relative
                w-[90%]
                max-w-2xl
                bg-lined-paper
                border-2
                border-black
                rounded-lg
                shadow-xl
                p-6
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
              <button
                onClick={closeWaterModal}
                className="
                  absolute
                  top-4
                  right-4
                  p-2
                  bg-red-200
                  rounded-md
                  border-2
                  border-black
                  shadow-[2px_2px_0_0_rgba(0,0,0,1)]
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

              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Encouraging Message
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Send a short encouraging note to help water{" "}
                <strong>{userName}</strong>&apos;s flower.
              </p>

              {/* Text area */}
              <textarea
                rows={16}
                value={encouragingMessage}
                onChange={(e) => setEncouragingMessage(e.target.value)}
                placeholder="Type your message here..."
                className="
                  w-full
                  p-2
                  mb-3
                  border
                  border-gray-300
                  rounded
                  focus:outline-none
                  text-gray-800
                  bg-white
                  resize-none
                "
              />
              {/* Insert picture field */}
              <div>
                <h3 className="pb-2 text-sm">
                  Insert an image of an accompanying object, something that is
                  sentimental to you and the recipient. A 3D object will be
                  generated using AI and sent.
                </h3>

                <input
                  type="file"
                  className="
                    w-full
                    p-2
                    mb-3
                    border
                    border-gray-300
                    rounded
                    focus:outline-none
                    text-gray-800
                    bg-white
                  "
                />
              </div>
              <img
                src="/graphics/paper-plane.png"
                alt="Paper Plane"
                className="w-2/3 "
              />

              <div className="flex justify-end">
                <button
                  onClick={handleSendMessage}
                  className="
                    px-5
                    py-2
                    bg-blue-100
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
                  Send Message
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {postMessage && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm font-sans"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={() => setPostMessage(false)}
          >
            <motion.div
              className="
          relative
          w-[90%]
          max-w-2xl
          h-1/2
          bg-lined-paper
          border-2
          border-black
          rounded-lg
          shadow-xl
          p-6
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
              {loading ? (
                // Loader
                <div className="flex items-center justify-center w-full h-full">
                  <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
              ) : (
                <>
                  <h2 className="font-bold text-center text-2xl text-gray-800">
                    Message Successfully Sent
                  </h2>
                  <p className="text-center text-gray-600">
                    Your message has been sent to {userName}.
                  </p>
                  <p className="text-center text-black font-bold">
                    49 Points Earned
                  </p>
                  <div className="flex flex-row h-full w-full gap-2">
                    <div className="flex flex-col w-1/2 self-center border-r border-neutral-300 pr-4">
                      <h3 className="font-bold">Message:</h3>
                      <p>
                        Hey man hope you are doing better. Remember this teddy
                        bear? We got it after playing at Timezone for a day, it
                        was one of the best highlights of my life, hope this
                        helps you to remember better days. Cheers.
                      </p>
                    </div>

                    <div className="flex flex-col w-1/2 self-center pl-4">
                      <h3 className="font-bold">Your generated 3D model!</h3>
                      <Canvas camera={{ position: [3, 4, 3], fov: 80 }} shadows>
                        <ambientLight intensity={1.5} />
                        <directionalLight
                          position={[10, 10, 5]}
                          intensity={2.5}
                          castShadow
                        />
                        <pointLight position={[0, 5, 0]} intensity={5} />
                        <pointLight position={[-5, 5, 5]} intensity={4} />
                        <pointLight position={[5, 5, -5]} intensity={4} />
                        <Bear />
                        <OrbitControls />
                      </Canvas>
                    </div>
                  </div>
                  <button
                    onClick={() => setPostMessage(false)}
                    className="
            px-4
            py-2
            bg-blue-100
            text-black
            border-2
            border-black
            rounded-md
            shadow-[2px_2px_0_0_rgba(0,0,0,1)]
            font-semibold
            hover:scale-105
            transition-transform
            self-center
            mt-auto
          "
                  >
                    Close
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
