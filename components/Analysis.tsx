import React from "react";
import { motion } from "framer-motion";

const Analysis = () => {
  return (
    <motion.div
      className="
        relative
        w-[90%]
        max-w-4xl
        h-auto
        bg-white
        border
        border-gray-300
        rounded-lg
        shadow-xl
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
      <div
        className="
          w-1/2
          p-6
          md:p-8
          border-r
          border-gray-300
          bg-lined-paper
        "
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Journal Analysis
        </h2>

        <img src="/graphics/cat.png" alt="Cat" className="mt-6 w-full h-auto" />
      </div>

      <div
        className="
          w-1/2
          p-6
          md:p-8
          bg-lined-paper
          relative
        "
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Powered by NLPs
        </h2>

        <p className="font-normal text-sm mt-8 text-gray-600">
          ModernBERT for Emotion Analysis
          <br />
          Gemini LLM for recommendations
        </p>

        <div className="absolute bottom-6 right-6"></div>
      </div>
    </motion.div>
  );
};

export default Analysis;
