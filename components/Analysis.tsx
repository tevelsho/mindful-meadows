import React from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
// Define the data structure
interface SentimentData {
  date: string;
  sentiment: number;
  emotions: string;
}

// Sample data with emotions
const data: SentimentData[] = [
  { date: "Mar 10", sentiment: -0.5, emotions: "Frustration, Sadness" },
  { date: "Mar 11", sentiment: 0, emotions: "Neutral, Calm" },
  { date: "Mar 12", sentiment: 0.8, emotions: "Happiness, Excitement" },
  { date: "Mar 13", sentiment: 0.3, emotions: "Relief, Content" },
  { date: "Mar 14", sentiment: -0.8, emotions: "Despair, Anger, Regret" },
];
// Define tooltip props
interface CustomTooltipProps {
  active?: boolean;
  payload?: { payload: SentimentData }[];
}

// Custom Tooltip Component
const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { date, sentiment, emotions } = payload[0].payload;
    return (
      <div className="bg-white p-2 border border-gray-300 shadow-md rounded-md text-sm">
        <p className="font-bold">{date}</p>
        <p>
          Sentiment: <span className="font-semibold">{sentiment}</span>
        </p>
        <p>
          Emotions: <span className="text-blue-500">{emotions}</span>
        </p>
      </div>
    );
  }
  return null;
};

const Analysis = () => {
  return (
    <motion.div
      className="
        relative
        w-[90%]
        max-w-6xl
        h-[90%]
        bg-white
        border
        border-gray-300
        rounded-lg
        shadow-xl
        flex
        flex-row
        overflow-hidden
        font-sans
      "
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col w-1/3">
        <div
          className="
            p-6
            md:p-8
            border-r
            border-gray-300
            bg-lined-paper
            h-full
            flex
            flex-col
          "
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4 ">
            Journal Analysis{" "}
            <span className="font-normal text-neutral-500">(Text)</span>
          </h2>
          <img
            src="/graphics/cat.png"
            alt="Cat"
            className="w-full h-auto pt-32"
          />
          <p className="font-normal text-neutral-500 text-sm pb-2 mt-auto text-center">
            We’ve also curated a personalized music playlist based on this
            analysis, which you can toggle from the bottom right
          </p>
        </div>
        <div
          className="
            p-6
            md:p-8
            bg-lined-paper
            relative
            border-r
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
      </div>
      <div className="flex flex-col p-8 pb-2 font-sans">
        <h2 className="font-bold text-lg pb-2">
          Sentiment
          <span className="text-neutral-500 font-normal"> - Negative</span>
        </h2>
        <h2 className="font-bold text-lg pb-2">
          Emotions
          <span className="text-neutral-500 font-normal">
            - Despair, Anger, Regret
          </span>
        </h2>
        {/* <h2 className="font-bold text-lg pb-2">
          Risk to self and others
          <span className="text-neutral-500 font-normal">- None</span>
        </h2> */}
        <h2 className="font-bold text-lg pb-2">
          Summary
          <span className="text-neutral-500 font-normal">
            - You have recently lost a hackathon despite putting in many hours.
            You feel tired and angry as your teammates were all slacking during
            the competition.
          </span>
        </h2>
        <h2 className="font-bold text-lg">Mindset Patterns</h2>
        <h3 className="font-normal text-neutral-500 text-sm pb-2">
          Cognitive and linguistic pattern analysis involves examining how
          people express their thoughts and emotions through language.
        </h3>
        <p className="text-neutral-500 text-lg ">
          <span className="line-through text-neutral-300">Reflection</span> |
          Rumination
        </p>
        <p className="text-neutral-500 text-lg pb-2">
          <span className="line-through text-neutral-300">Optimism</span> |
          Pessimism
        </p>
        <p className="font-normal text-neutral-500 text-sm pb-2">
          ie. You are more likely to engage in repetitive negative thinking,
          often focusing on past mistakes instead of constructive
          self-evaluation
        </p>

        <h2 className="font-bold text-lg">Trends over time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis domain={[-1, 1]} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="sentiment"
              stroke="#82ca9d"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
        <h2 className="font-bold text-lg">Recommendations</h2>
        <p>
          It’s understandable to feel frustrated after putting in so much
          effort. Instead of focusing on what went wrong, try shifting your
          perspective: <br></br> <br></br> 1) Reframe the Experience – What
          skills did you improve? What can you learn from this. <br></br> 2)
          Take a Break – Step away, rest, and recharge before your next
          challenge. <br></br> 3) Channel Frustration Into Growth – Identify
          ways to improve teamwork and set new goals. <br></br> 4) Focus on
          Progress – Small wins matter.
          <br></br>
          <br></br>
          Track your mindset and celebrate improvements. Every setback is a
          setup for a comeback. How can you turn this into a learning
          experience? 💡
        </p>
      </div>
    </motion.div>
  );
};

export default Analysis;
