"use client";

import React, { FC, useEffect, useState } from "react";
import CustomPagination from "@/components/ui/CustomPagination";
import { ConferenceType } from "@/types";
import Card from "./Card";

interface CardProps {
  card: ConferenceType[];
  loading: boolean
}

const Conference: FC<CardProps> = ({ card, loading }) => {
  const [isClient, setIsClient] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = card.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="self-stretch w-full overflow-hidden flex flex-col items-center justify-center py-[30px] px-[200px] gap-[30px] text-base font-source-serif-pro">
      <div className="self-stretch overflow-hidden flex flex-row items-center justify-between py-0 px-[618px] text-3xl">
        <div className="relative tracking-[0.02em] leading-[100%]">
          KONFERENSIYALAR
        </div>
      </div>
      <div className="self-stretch grid gap-y-6 gap-x-10 grid-cols-4">
        {currentPosts.map((item, index) => (
          <Card item={item} key={index} loading={loading} />
        ))}
      </div>
      {card.length > postsPerPage && isClient && (
        <CustomPagination
          totalPosts={card.length}
          postsPerPage={postsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Conference;
