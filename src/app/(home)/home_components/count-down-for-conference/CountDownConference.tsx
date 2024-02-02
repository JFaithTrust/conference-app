"use client";

import { cn } from "@/lib/utils";
import React, { useState, useEffect, use } from "react";

interface CountdownProps {
  targetDate: string;
}

const CountDownConference: React.FC<CountdownProps> = ({ targetDate }) => {
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());
  const [isClient, setIsClient] = useState(false);

  function calculateRemainingTime() {
    const targetDateTime = new Date(targetDate).getTime();
    const currentDateTime = new Date().getTime();
    return Math.max(0, targetDateTime - currentDateTime);
  }

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [targetDate]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  const addLeadingZero = (value: number) => (value < 10 ? `0${value}` : value);

  return (
    <>
      {isClient && (
        <div className="rounded-lg bg-mainindigo shadow-[0px_0px_4px_1px_#dcdbfa] shrink-0 flex flex-row items-start justify-center py-0 pr-3 pl-0 gap-[6px] text-xs text-mainwhite">
          <div className="rounded-3xl overflow-hidden flex flex-col items-center justify-center py-1.5 px-3">
            <div className="relative leading-[100%]">
              {addLeadingZero(days) || 0}
            </div>
            <div className="relative text-3xs tracking-[0.1em] leading-[100%]">
              Kun
            </div>
          </div>
          <div className="overflow-hidden flex flex-col items-center justify-center py-1.5 px-0">
            <div className="relative leading-[100%]">
              {addLeadingZero(hours) || "00"}
            </div>
            <div className="relative text-3xs leading-[100%]">Soat</div>
          </div>
          <div className="overflow-hidden flex flex-col items-center justify-center py-2.5 px-0">
            <div className="relative leading-[50%]">:</div>
          </div>
          <div className="overflow-hidden flex flex-col items-center justify-center py-1.5 px-0">
            <div className="relative leading-[100%]">
              {addLeadingZero(minutes) || "00"}
            </div>
            <div className="relative text-3xs leading-[100%]">Minut</div>
          </div>
          <div className="overflow-hidden flex flex-col items-center justify-center py-2.5 px-0">
            <div className="relative leading-[50%]">:</div>
          </div>
          <div className="overflow-hidden flex flex-col items-center justify-center py-1.5 px-0">
            <div className="relative leading-[100%]">
              {addLeadingZero(seconds) || "00"}
            </div>
            <div className="relative text-3xs leading-[100%]">Soniya</div>
          </div>
        </div>
      )}
    </>
  );
};

export default CountDownConference;
