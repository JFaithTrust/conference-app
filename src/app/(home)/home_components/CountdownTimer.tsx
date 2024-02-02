"use client";

import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";

interface CountdownProps {
  targetDate: string;
  shadowColor?: string;
  classNames?: string;
}

const CountdownTimer: React.FC<CountdownProps> = ({
  targetDate,
  shadowColor,
  classNames
}) => {
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
      <div
      className={cn("rounded-xl bg-mainwhite shrink-0 flex flex-row items-start justify-center py-0 pr-[18px] pl-0 text-4xl", shadowColor, classNames )}
    >
      <div className="overflow-hidden flex flex-col items-center justify-center py-3 px-[30px]">
        <h2 className="relative leading-[100%]">{addLeadingZero(days) || 0}</h2>
        <span className="relative text-xl tracking-[0.1em] leading-[100%]">
          Kun
        </span>
      </div>
      <div className="overflow-hidden flex flex-col items-center justify-center py-3 px-1">
        <h2 className="relative leading-[100%]">
          {addLeadingZero(hours) || "00"}
        </h2>
        <span className="relative text-lg leading-[100%]">Soat</span>
      </div>
      <div className="overflow-hidden flex flex-col items-center justify-center py-[19px] px-1">
        <span className="relative leading-[50%]">:</span>
      </div>
      <div className="overflow-hidden flex flex-col items-center justify-center py-3 px-1">
        <h2 className="relative leading-[100%]">
          {addLeadingZero(minutes) || "00"}
        </h2>
        <span className="relative text-lg leading-[100%]">Minut</span>
      </div>
      <div className="overflow-hidden flex flex-col items-center justify-center py-[19px] px-1">
        <span className="relative leading-[50%]">:</span>
      </div>
      <div className="overflow-hidden flex flex-col items-center justify-center py-3 px-1">
        <h2 className="relative leading-[100%]">{addLeadingZero(seconds) || "00"}</h2>
        <span className="relative text-lg leading-[100%]">Soniya</span>
      </div>
    </div>
    )}
    </>
  );
};

export default CountdownTimer;
