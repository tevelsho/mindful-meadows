"use client";
import React, { useState } from "react";
import QRCode from "react-qr-code";
import { motion, AnimatePresence } from "framer-motion";

export default function Page() {
  const initialRewards = [
    {
      id: 1,
      brand: "Nike",
      description: "10% Discount for 3500 Points",
      isRedeemed: true,
      qrData: "NIKE_DISCOUNT_3500",
    },
    {
      id: 2,
      brand: "Nike",
      description: "10% Discount for 3500 Points",
      isRedeemed: false,
      qrData: "NIKE_DISCOUNT_3500_ACTIVE",
    },
    {
      id: 3,
      brand: "Nike",
      description: "10% Discount for 3500 Points",
      isRedeemed: true,
      qrData: "NIKE_DISCOUNT_3500_2",
    },
    {
      id: 4,
      brand: "Halal",
      description: "5% Cashback for 500 Points",
      isRedeemed: false,
      qrData: "HALAL_CASHBACK_500",
    },
    {
      id: 5,
      brand: "Halal",
      description: "5% Cashback for 500 Points",
      isRedeemed: false,
      qrData: "HALAL_CASHBACK_500_2",
    },
  ];

  const [rewards, setRewards] = useState(initialRewards);
  const [showModal, setShowModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState<null | typeof rewards[0]>(
    null
  );

  const handleRedeem = (rewardId: number) => {
    const reward = rewards.find((r) => r.id === rewardId);
    if (!reward) return;
    setSelectedReward(reward);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedReward(null);
  };

  return (
    <main
      className="
        min-h-screen
        w-full
        bg-[#ecdbcb]
        bg-grid
        bg-cover
        p-8
        mt-20
      "
    >
      <div className="max-w-4xl mx-auto space-y-8 ">
        <div className="p-6 space-y-8">
          <div className="flex flex-col items-center">
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 42 42" className="w-full h-full transform -rotate-90">
                <circle
                  cx="21"
                  cy="21"
                  r="16"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="6"
                />
                <circle
                  cx="21"
                  cy="21"
                  r="16"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="6"
                  strokeDasharray="66, 100"
                  strokeDashoffset="25"
                  strokeLinecap="round"
                />
                <circle
                  cx="21"
                  cy="21"
                  r="16"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="6"
                  strokeDasharray="34, 100"
                  strokeDashoffset="91"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-gray-800">7158</span>
                <p className="text-xs text-gray-600">Total Earned</p>
              </div>
            </div>
            <p className="mt-2 text-gray-600 font-semibold">Total Earned</p>
          </div>

          <div className="flex flex-row items-center justify-center space-x-8 ">
            <div className="flex flex-col items-center">
              <div className="flex items-center space-x-2">
                <span className="inline-block w-3 h-3 rounded-full bg-[#6366f1]" />
                <span className="text-gray-500">Earned</span>
              </div>
              <span className="text-2xl font-bold text-gray-800">7158</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center space-x-2">
                <span className="inline-block w-3 h-3 rounded-full bg-[#ef4444]" />
                <span className="text-gray-500">Spent</span>
              </div>
              <span className="text-2xl font-bold text-gray-800">5422</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center space-x-2">
                <span className="inline-block w-3 h-3 rounded-full bg-[#10b981]" />
                <span className="text-gray-500">Have</span>
              </div>
              <span className="text-2xl font-bold text-gray-800">1736</span>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <h2 className="text-2xl text-center font-bold text-gray-800">Rewards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rewards.map((reward) => (
              <div
                key={reward.id}
                className="
                  bg-[#FAF9F6]
                  border-2
                  border-black
                  rounded-lg
                  shadow-[4px_4px_0_0_rgba(0,0,0,1)]
                  flex
                  flex-col
                  items-center
                  p-4
                  space-y-3
                "
              >
                <div className="w-14 h-14 bg-black/10 flex items-center justify-center rounded-md">
                  <span className="text-sm font-bold text-gray-600">{reward.brand}</span>
                </div>
                <p className="text-gray-700 text-sm text-center">{reward.description}</p>
                {reward.isRedeemed ? (
                  <button
                    className="
                      px-3
                      py-2
                      bg-gray-200
                      text-gray-500
                      border-2
                      border-gray-400
                      rounded-md
                      shadow-[2px_2px_0_0_rgba(0,0,0,1)]
                      font-semibold
                      cursor-not-allowed
                    "
                  >
                    Redeemed
                  </button>
                ) : (
                  <button
                    onClick={() => handleRedeem(reward.id)}
                    className="
                      px-3
                      py-2
                      bg-green-100
                      text-black
                      border-2
                      border-black
                      rounded-md
                      shadow-[2px_2px_0_0_rgba(0,0,0,1)]
                      font-semibold
                      hover:scale-105
                      transition-transform
                    "
                  >
                    Redeem Now
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showModal && selectedReward && (
          <motion.div
            className="
              fixed
              inset-0
              z-50
              flex
              items-center
              justify-center
              bg-black/60
              backdrop-blur-sm
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            onClick={closeModal}
          >
            <motion.div
              className="
                relative
                w-[90%]
                max-w-sm
                bg-[#FAF9F6]
                border-2
                border-black
                rounded-lg
                shadow-[4px_4px_0_0_rgba(0,0,0,1)]
                p-6
                flex
                flex-col
                items-center
                space-y-4
              "
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-gray-800">Your QR Code</h3>
              <QRCode
                value={selectedReward.qrData}
                size={180}
                bgColor="#FAF9F6"
                fgColor="#000000"
                level="L"
              />
              <p className="text-sm text-gray-600 text-center">
                Show this QR code to the seller to redeem:
                <br />
                <span className="font-semibold">{selectedReward.description}</span>
              </p>
              <button
                onClick={closeModal}
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
                "
              >
                Go Back
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
