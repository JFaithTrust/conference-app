"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getConferenceById } from "@/fetch_api/fetchConference";
import { getDirectionByConferenceId } from "@/fetch_api/fetchDirtection";
import { ConferenceType, DirectionType } from "@/types";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

const ConferenceDetail = ({ params }: { params: { id: number } }) => {
  const [confereceData, setConfereceData] = useState<ConferenceType>();
  const [directions, setDirections] = useState<DirectionType[]>([]);

  const router = useRouter();

  useEffect(() => {
    const getConferencesData = async () => {
      const data = await getConferenceById(params.id);
      const directions = await getDirectionByConferenceId(params.id);
      setConfereceData(data);
      setDirections(directions);
    };
    getConferencesData();
  }, [params.id]);

  return (
    <>
      {confereceData && (
        <div className="flex flex-col gap-y-[18px] px-[30px]">
          <Button
            className="w-fit px-[18px] py-[12px] flex gap-y-2"
            variant="active"
            onClick={() => router.back()}
          >
            <FaArrowLeftLong className="text-white w-6 h-4" />
            Back
          </Button>
          <div className="flex p-[18px] flex-col gap-y-[18px] bg-mainwhite rounded-xl border-[1px] border-solid border-[#DCDBFA]">
            <h2 className="font-semibold font-source-serif-pro text-3xl">
              Konferensiya haqida ma&apos;lumotlar
            </h2>
            <div className="flex flex-col gap-y-2">
              <span className="text-xl font-semibold font-source-serif-pro">
                Konferensiya nomi :{" "}
              </span>
              <span>{confereceData.name}</span>
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="text-xl font-semibold font-source-serif-pro">
                Yo&apos;nalishlar :{" "}
              </span>
              <ul className="flex flex-col gap-y-1 list-disc pl-5">
                {directions &&
                  directions.map((direction) => (
                    <li key={direction.id}>{direction?.name}</li>
                  ))}
              </ul>
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="text-xl font-semibold font-source-serif-pro">
                Manzil :{" "}
              </span>
              <span>{confereceData.address}</span>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col px-[12px] py-1.5 gap-y-1 bg-herowhite rounded-xl border-[1px] border-solid border-[#DEDBFF] items-center">
                <span className="font-semibold font-source-serif-pro text-lg">
                  Konferensiya boshlanish vaqti
                </span>
                <div className="flex flex-row justify-between items-center w-full gap-x-3">
                  <Button className="rounded-lg p-3 bg-white text-black border-[1px] border-solid hover:bg-slate-50 border-violet-200 w-full">
                    <span>{format(confereceData.startsAt, "dd-MM-yyyy")}</span>
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-col px-[12px] py-1.5 gap-y-1 bg-herowhite rounded-xl border-[1px] border-solid border-[#DEDBFF] items-center">
                <span className="font-semibold font-source-serif-pro text-lg">
                  Konferensiya tugash vaqti
                </span>
                <div className="flex flex-row justify-between items-center w-full gap-x-3">
                  <Button className="rounded-lg p-3 bg-white text-black border-[1px] border-solid hover:bg-slate-50 border-violet-200 w-full">
                    <span>{format(confereceData.endsAt, "dd-MM-yyyy")}</span>
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-col px-[12px] py-1.5 gap-y-1 bg-herowhite rounded-xl border-[1px] border-solid border-[#DEDBFF] items-center">
                <span className="font-semibold font-source-serif-pro text-lg">
                  Registratsiya vaqti
                </span>
                <div className="flex flex-row justify-between items-center w-full gap-x-3">
                  <Button className="rounded-lg p-3 bg-white text-black border-[1px] border-solid hover:bg-slate-50 border-violet-200 w-full">
                    <span>
                      {format(confereceData.deadlineForThesis, "dd-MM-yyyy")}
                    </span>
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-col px-[12px] py-1.5 gap-y-1 bg-herowhite rounded-xl border-[1px] border-solid border-[#DEDBFF] items-center">
                <span className="font-semibold font-source-serif-pro text-lg">
                  To&apos;lov
                </span>
                <div className="flex flex-row justify-between items-center w-full gap-x-3">
                  <Button className="rounded-lg p-3 bg-white text-black border-[1px] border-solid hover:bg-slate-50 border-violet-200">
                    <span>{confereceData.cost}</span>
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="description" className="text-lg font-semibold">
                Konferensiya haqida
              </Label>
              <Textarea
                className="resize-none border-[1px] border-solid border-violet-200"
                value={confereceData.description}
                readOnly
              />
            </div>
            <div>
              <Label htmlFor="description" className="text-lg font-semibold">
                Konferensiya haqida
              </Label>
              <Textarea
                className="resize-none border-[1px] border-solid border-violet-200"
                value={confereceData.requirements}
                readOnly
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConferenceDetail;
