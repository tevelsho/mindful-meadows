"use client";
import { useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function GardenModal({
  isOpen,
  onClose,
  children,
  id,
}: {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  id: number;
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);
  const modalVariants: Variants = {
    initial: {
      opacity: 0,
      scale: 0.9,
      filter: "blur(10px)", // Start with blur
      zIndex: -1,
      rotateY: 90, // Rotate the modal on the Y-axis
      transformOrigin: "center", // Ensure the rotation happens from the center
    },
    animate: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)", // Remove blur
      zIndex: 10,
      rotateY: 0, // No rotation when fully visible
      transition: {
        duration: 0.3, // Faster animation
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      filter: "blur(10px)", // Add blur on exit
      rotateY: -90, // Exit with counterclockwise rotation
      zIndex: -1,
      transition: {
        duration: 0.2, // Faster exit
        ease: "easeIn",
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} // Fade-in effect
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-lg"
          onClick={onClose} // Close when clicking the background
        >
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={modalVariants}
            className="relative w-[90%] md:w-3/5 h-4/5 p-4 md:p-6 bg-gray-100 rounded-2xl shadow-xl border-2 border-border overflow-scroll"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            {id}
            <button
              onClick={onClose}
              className="absolute top-6 right-8 text-secondary hover:text-tertiary"
            >
              ✕
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
