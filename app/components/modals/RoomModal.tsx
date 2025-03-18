"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// three js
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function RoomModal({
  isOpen,
  onClose,
  id,
}: {
  isOpen: boolean;
  onClose: () => void;
  id: number;
}) {
  const [userName, setUserName] = useState("");
  // asset
  const [asset, setAsset] = useState("");

  // message
  const [message, setMessage] = useState("");
  const teddyBearThumb = useLoader(GLTFLoader, "/models/teddybear.glb");

  useEffect(() => {
    fetch("dataset/message.json")
      .then((res) => res.json())
      .then(
        (
          json: {
            id: number;
            name: string;
            asset: string;
            message: string;
          }[]
        ) => {
          json.forEach((user) => {
            if (user.id === id) {
              setUserName(user.name);
              setAsset(user.asset);
              setMessage(user.message);
            }
          });
        }
      );

    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen, id]);

  return (
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
              bg-pink-100 
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

            {/* User Name */}
            <div className="flex flex-row items-center">
              <div className="">
                <h2 className="font-bold text-3xl text-black pb-4">
                  {userName}
                </h2>
                <p className="pb-6 text-gray-800">{message}</p>
              </div>
              <Canvas camera={{ position: [3, 4, 3], fov: 80 }} shadows>
                <ambientLight intensity={1.5} />
                {/* ✅ Directional light to simulate sunlight */}
                <directionalLight
                  position={[10, 10, 5]}
                  intensity={2.5}
                  castShadow
                />
                {/* ✅ Extra point lights for brightness */}
                <pointLight position={[0, 5, 0]} intensity={5} />
                <pointLight position={[-5, 5, 5]} intensity={4} />
                <pointLight position={[5, 5, -5]} intensity={4} />

                <primitive
                  object={teddyBearThumb.scene.clone()}
                  scale={[0.01, 0.01, 0.01]}
                />
                <OrbitControls />
              </Canvas>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
