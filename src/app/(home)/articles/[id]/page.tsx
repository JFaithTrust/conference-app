"use client";

import { TbArrowNarrowLeft } from "react-icons/tb";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoCalendarOutline } from "react-icons/io5";
import CountdownTimer from "@/app/(home)/home_components/CountdownTimer";
import { getConferenceById } from "@/fetch_api/fetchConference";
import { ApplicationType, ConferenceType, DirectionType } from "@/types";
import { getDirectionByConferenceId } from "@/fetch_api/fetchDirtection";
import { formatDate } from "@/functions/formats";
import { format } from "date-fns";
import Loading from "../../home_components/loading/Loading";
import { getApplicationByConferenceId, getApplicationById } from "@/fetch_api/fetchApplications";
import { Button } from "@/components/ui/button";

const ArticleDetail = ({ params }: { params: { id: number } }) => {
  const [conference, setConference] = useState<ConferenceType>();
  const [direction, setDirection] = useState<DirectionType[]>([]);
  const [applications, setApplications] = useState<ApplicationType>();
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    const getSourceData = async () => {
      const application = await getApplicationById(params.id);
      setApplications(application);
      setLoading(false);
    };
    getSourceData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex flex-col px-[140px] py-[20px] gap-[20px]">
        <div
          className="flex flex-row gap-1 py-[9px] rounded-sm items-center justify-center cursor-pointer w-fit"
          onClick={handleBack}
        >
          <TbArrowNarrowLeft className="w-5 h-5 text-black" size={24} />
          <h2 className="text-black">Back</h2>
        </div>
        <div className="flex flex-col p-[30px] gap-[48px] rounded-xl bg-mainwhite shadow-[0_0_4px_2px_#DCDBFA]">
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col px-[140px] py-[20px] gap-[20px]">
      <div
        className="flex flex-row gap-1 py-[9px] rounded-sm items-center justify-center cursor-pointer w-fit"
        onClick={handleBack}
      >
        <TbArrowNarrowLeft className="w-5 h-5 text-black" size={24} />
        <h2 className="text-black">Back</h2>
      </div>
      {conference && (
        <div className="flex flex-col p-[30px] gap-[48px] rounded-xl bg-mainwhite shadow-[0_0_4px_2px_#DCDBFA]">
          <h1 className="text-justify text-4xl font-semibold leading-[100%] font-source-serif-pro">
            {conference.name}
          </h1>
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-3xl font-medium leading-[100%] font-roboto border-[1px] border-solid border-violet-200 px-[30px] py-[16px] rounded-md">
              {formatDate(conference.deadlineForThesis, false)}
            </h2>
            <CountdownTimer
              targetDate={conference.deadlineForThesis}
              classNames="border-[1px] border-solid border-violet-200 text-3xl"
            />
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col p-3 gap-y-1">
              <h3 className="text-sm font-normal">Conference start time</h3>
              <div className="flex flex-row gap-x-3 items-center">
                <div className="border-[1px] border-solid border-violet-200 rounded-md px-[30px] py-[16px]">
                  <span className="leading-[100%] font-main-text font-semibold text-2xl">
                    {formatDate(conference.startsAt, true)}
                  </span>
                </div>
                <div className="border-[1px] border-solid border-violet-200 rounded-md px-[20px] py-[16px]">
                  <IoCalendarOutline
                    className="w-7 h-7 text-typeyellow"
                    size={24}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col p-3 gap-y-1">
              <h3 className="text-sm font-normal">Conference end time</h3>
              <div className="flex flex-row gap-x-3 items-center">
                <div className="border-[1px] border-solid border-violet-200 rounded-md px-[30px] py-[16px]">
                  <span className="leading-[100%] font-main-text font-semibold text-2xl">
                    {format(conference.endsAt, "dd.MM.yyyy")}
                  </span>
                </div>
                <div className="border-[1px] border-solid border-violet-200 rounded-md px-[20px] py-[16px]">
                  <IoCalendarOutline
                    className="w-7 h-7 text-typeyellow"
                    size={24}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col p-3 gap-y-6 border-[1px] border-solid border-violet-200 rounded-md">
            <p>Konferensiya yo&apos;nalishlari</p>
            <div>
              <ul className="text-xl font-semibold list-disc ml-5">
                {direction.map((item) => (
                  <li key={item.id}>{item.name}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-y-3">
              <p className="text-xl font-semibold">
                ANJUMANDA ISHTIROK ETISH TARTIBI:
              </p>
              <p className="text-lg text-justify">{conference.requirements}</p>
            </div>
          </div>
          <div className="flex flex-col p-3 gap-y-6 border-[1px] border-solid border-violet-200 rounded-md">
            <p>Konferensiya haqida ma&apos;lumot</p>
            <div className="flex flex-col gap-y-3">
              <p className="text-lg text-justify">{conference.description}</p>
            </div>
            <p>Manzil: {conference.address}</p>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default ArticleDetail;
