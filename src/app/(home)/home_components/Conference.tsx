"use client";

import React, { FC, useEffect, useState } from "react";
import CustomButton from "@/components/ui/CustomButton";
import CustomPagination from "@/components/ui/CustomPagination";
import { ConferenceType } from "@/types";
import { FaLocationDot } from "react-icons/fa6";
import CountDownConference from "./count-down-for-conference/CountDownConference";
import { useRouter } from "next/navigation";
import { formatDate } from "@/functions/formats";

interface CardProps {
  card: ConferenceType[];
}

const Conference: FC<CardProps> = ({ card }) => {
  const [isClient, setIsClient] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = card.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      {isClient && (
        <div className="self-stretch w-full overflow-hidden flex flex-col items-center justify-center py-[30px] px-[200px] gap-[30px] text-base font-source-serif-pro">
          <div className="self-stretch overflow-hidden flex flex-row items-center justify-between py-0 px-[618px] text-3xl">
            <div className="relative tracking-[0.02em] leading-[100%]">
              KONFERENSIYALAR
            </div>
          </div>
          <div className="self-stretch grid gap-y-6 gap-x-10 grid-cols-4">
            {currentPosts.map((item, index) => (
              <div
                key={index}
                className="rounded-3xl [background:linear-gradient(151.61deg,_rgba(255,_255,_255,_0.6),_rgba(255,_255,_255,_0))] shadow-[-5px_-5px_250px_rgba(255,_255,_255,_0.05)_inset] [backdrop-filter:blur(66.2px)] box-border w-[325px] overflow-hidden shrink-0 flex flex-col items-start justify-center p-[18px] gap-[12px] border-[3px] border-solid border-mainindigo/70"
              >
                <div className="self-stretch flex flex-row items-center justify-between">
                  <div className="rounded-lg overflow-hidden flex flex-col items-center justify-center py-2.5 px-1.5">
                    <div className="relative leading-[100%]">
                      {formatDate(item.deadlineForThesis, false)}
                    </div>
                  </div>
                  <CountDownConference targetDate={item.deadlineForThesis} />
                </div>
                <div className="self-stretch flex flex-col items-start justify-center p-[5px] gap-[12px] text-center">
                  <b className="self-stretch relative leading-[120%]">
                    {item.name}
                  </b>
                  <div className="self-stretch relative text-sm leading-[120%] text-justify">
                    {item.description}
                  </div>
                </div>
                <div className="rounded-md flex flex-row items-center justify-start gap-[10px] text-justify text-sm text-mainindigo/95">
                  <FaLocationDot className="w-5 h-[25px] object-cover text-typered" />
                  <div className="leading-[120%]">
                    <span>Manzil: </span>
                    {item.address}
                  </div>
                </div>
                <CustomButton
                  label="To’liq ko’rish"
                  onClick={() => router.push(`/conferences/${item.id}`)}
                  success
                  type={"button"}
                  classNames="self-stretch rounded-xl shadow-[0px_0px_4px_2px_#dcdbfa] overflow-hidden flex flex-row items-center justify-center py-[9px] px-1.5 gap-[12px] text-mainwhite"
                />
              </div>
            ))}
          </div>
          {card.length > postsPerPage && (
            <CustomPagination
              totalPosts={card.length}
              postsPerPage={postsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Conference;