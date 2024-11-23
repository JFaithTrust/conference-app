"use client";

import { TbArrowNarrowLeft } from "react-icons/tb";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoCalendarOutline } from "react-icons/io5";
import CountdownTimer from "@/app/(home)/home_components/CountdownTimer";
import CustomButton from "@/components/ui/CustomButton";
import useRegisterModal from "@/hooks/useRegisterModal";
import { getConferenceById } from "@/fetch_api/fetchConference";
import { ApplicationType, ConferenceType, DirectionType } from "@/types";
import { getDirectionByConferenceId } from "@/fetch_api/fetchDirtection";
import { formatDate } from "@/functions/formats";
import { format } from "date-fns";
import ArticleForm from "@/components/forms/ArticleForm";
import Loading from "../../home_components/loading/Loading";
import { getApplicationByConferenceId } from "@/fetch_api/fetchApplications";
import { Button } from "@/components/ui/button";

const ConferenceDetail = ({ params }: { params: { id: number } }) => {
  const [isAuth, setIsAuth] = useState(false);
  const registerModal = useRegisterModal();
  const [conference, setConference] = useState<ConferenceType>();
  const [direction, setDirection] = useState<DirectionType[]>([]);
  const [applications, setApplications] = useState<ApplicationType[]>([]);
  const [loading, setLoading] = useState(true);

  const onOpenRegisterModal = useCallback(() => {
    registerModal.onOpen();
  }, [registerModal]);

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    const getSourceData = async () => {
      const conference = await getConferenceById(params.id);
      const directions = await getDirectionByConferenceId(params.id);
      const application = await getApplicationByConferenceId(params.id);
      setConference(conference);
      setDirection(directions);
      setApplications(
        application.filter((item) => item.status === "ACCEPTED" && item.paymentStatus === "PAID")
      );
      setLoading(false);
    };
    getSourceData();
  }, [params.id]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("access_token");
      if (token) {
        setIsAuth(true);
      }
    }
  }, []);

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
          <div className={"flex flex-col gap-y-2 justify-end"}>
            <h3 className="text-sm font-normal">Ro&apos;yhatdan o&apos;tish vaqti</h3>
            <div className="flex flex-row justify-between items-center">
              <h2 className="text-3xl font-medium leading-[100%] font-roboto border-[1px] border-solid border-violet-200 px-[30px] py-[16px] rounded-md">
                {formatDate(conference.deadlineForThesis, false)}
              </h2>
              <CountdownTimer
                  targetDate={conference.deadlineForThesis}
                  classNames="border-[1px] border-solid border-violet-200 text-3xl"
              />
            </div>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col p-3 gap-y-1">
              <h3 className="text-sm font-normal">Konferensiya boshlanish vaqti</h3>
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
              <h3 className="text-sm font-normal">Konferensiya tugash vaqti</h3>
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
              <a href={'/conference.pdf'} target={"_blank"} className={"hover:underline text-blue-500"}>Konferensiya haqida to&apos;liq</a>
            </div>
            <p>Manzil: {conference.address}</p>
          </div>
          {applications.length > 0 && (
            <>
              <p className="text-xl font-semibold">Qabul qilingan maqolalar</p>
              <div className="flex flex-col gap-y-2">
                {applications.map((item) => (
                  <div
                    className="flex flex-row border-[1px] border-solid border-violet-200 rounded-md justify-between p-[12px] items-center"
                    key={item.id}
                  >
                    <h2 className="w-[200px] truncate overflow-hidden">{item.name}</h2>
                    <h2 className="w-[200px] truncate overflow-hidden">{item.owner?.fullName}</h2>
                    <h3 className="w-[100px]">{format(item.updatedAt || new Date, "dd-MM-yyyy")}</h3>
                    <Button
                      className="rounded-3xl px-[18px] py-[6px] bg-mainindigo hover:bg-mainindigo/85"
                      onClick={() => router.push(item.thesisFile?.downloadLink || "")}
                    >
                      Yuklab olish
                    </Button>
                  </div>
                ))}
              </div>
            </>
          )}

          <div style={{ position: "relative" }}>
            {isAuth !== true && (
              <div
                className={`flex items-center justify-center bg-black/30 rounded-xl absolute top-0 left-0 w-full h-full`}
              >
                <CustomButton
                  label="Ro'yxatdan o'tish"
                  onClick={onOpenRegisterModal}
                  mainable
                  outlined
                  classNames="px-[40px] py-[20px] font-bold text-2xl rounded-[5px] bg-transparent border-[5px] border-solid"
                />
              </div>
            )}

            <div className="flex flex-col rounded-xl p-[30px] gap-y-[30px] border-[1px] border-solid border-violet-200">
              <h2 className="text-3xl font-semibold">
                Maqolani jo&apos;natish
              </h2>
              <ArticleForm
                name={conference.name}
                id={conference.id}
                direction={direction}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConferenceDetail;
