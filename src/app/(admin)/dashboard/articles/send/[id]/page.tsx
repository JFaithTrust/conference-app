"use client";

import { getUserById } from "@/fetch_api/fetchUsers";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { ApplicationType } from "@/types";
import { getApplicationById } from "@/fetch_api/fetchApplications";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import axios from "@/fetch_api/axios";

const ArticleInfo = ({ params }: { params: { id: number } }) => {
  const [appData, setAppData] = useState<ApplicationType>();
  const router = useRouter();

  useEffect(() => {
    const getAppData = async () => {
      const data = await getApplicationById(params.id);
      setAppData(data);
    };
    getAppData();
  }, [params.id]);

  const handleUploadFile = async (id: number) => {
    axios.get(`/api/attachment/download/${id}`)
    // const data = await getUserById(appData?.owner.id);
    // console.log(data);
  }

  return (
    <>
      {appData && (
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
              Maqola haqida ma&apos;lumotlar
            </h2>
            <div className="flex flex-col gap-y-2">
              <span className="text-xl font-semibold font-source-serif-pro">
                Maqola nomi :{" "}
              </span>
              <span>{appData.name}</span>
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="text-xl font-semibold font-source-serif-pro">
                Konferensiya nomi :{" "}
              </span>
              <span>{appData.conference?.name}</span>
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="text-xl font-semibold font-source-serif-pro">
                Yo&apos;nalish nomi :{" "}
              </span>
              <span>{appData.direction?.name}</span>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col gap-y-2 w-[250px]">
                <span className="text-xl font-semibold font-source-serif-pro">
                  Jo&apos;natuvchi :{" "}
                </span>
                <span>{appData.owner.fullName}</span>
              </div>
              <div className="flex flex-col gap-y-2 w-[250px]">
                <span className="text-xl font-semibold font-source-serif-pro text-end">
                  Jo&apos;natuvchi nomeri :{" "}
                </span>
                <span className="text-end">{appData.owner.phoneNumber}</span>
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col gap-y-2 w-[250px]">
                <span className="text-xl font-semibold font-source-serif-pro">
                  Muharrir :{" "}
                </span>
                <span>
                  {appData.reviewer?.fullName ? (
                    appData.reviewer.fullName
                  ) : (
                    <span className="text-typered">Biriktitilmagan</span>
                  )}
                </span>
              </div>
              <div className="flex flex-col gap-y-2 w-[250px]">
                <span className="text-xl font-semibold font-source-serif-pro text-end">
                  Muharrir nomeri :{" "}
                </span>
                <span className="text-end">
                  <span>
                    {appData.reviewer?.phoneNumber ? (
                      appData.reviewer.phoneNumber
                    ) : (
                      <span className="text-typered">Biriktitilmagan</span>
                    )}
                  </span>
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="text-xl font-semibold font-source-serif-pro">
                Maqola aftorlari :{" "}
              </span>
              <span>{appData.authors}</span>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col px-[12px] py-1.5 gap-y-1 bg-herowhite rounded-xl border-[1px] border-solid border-[#DEDBFF] items-center">
                <span className="font-semibold font-source-serif-pro text-lg">
                  Maqola yuborilgan sana
                </span>
                <div className="flex flex-row justify-between items-center w-full gap-x-3">
                  <Button className="rounded-lg p-3 bg-white text-black border-[1px] border-solid hover:bg-slate-50 border-violet-200 w-full">
                    <span>
                      {appData.createdAt &&
                        format(appData.createdAt, "dd-MM-yyyy")}
                    </span>
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col px-[12px] py-1.5 gap-y-1 bg-herowhite rounded-xl border-[1px] border-solid border-[#DEDBFF] items-center">
                <span className="font-semibold font-source-serif-pro text-lg">
                  Faylni yuklab olish
                </span>
                <div className="flex flex-row justify-between items-center w-full gap-x-3">
                  <Button className="rounded-lg p-3 bg-white text-black border-[1px] border-solid hover:bg-slate-50 border-violet-200 w-full" onClick={() => router.push(appData.thesisFile?.downloadLink || "")}>
                    <span>Yuklab olish</span>
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="description" className="text-lg font-semibold">
                Tavsif
              </Label>
              <Textarea
                className="resize-none border-[1px] border-solid border-violet-200"
                value={appData.description}
                readOnly
              />
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col px-[12px] py-1.5 gap-y-1 bg-transparent items-center">
                <span className="font-semibold font-source-serif-pro text-lg">
                  Status
                </span>
                <div className="flex flex-row justify-between items-center w-full gap-x-3">
                  <Button className="rounded-2xl px-3 py-1.5 bg-typegreen text-white hover:bg-typegreen/85">
                    <span>Accepted</span>
                  </Button>
                </div>
              </div>
              <div className="flex flex-col px-[12px] py-1.5 gap-y-1 bg-transparent items-center">
                <span className="font-semibold font-source-serif-pro text-lg">
                  To&apos;lov
                </span>
                <div className="flex flex-row justify-between items-center w-full gap-x-3">
                  <Button className="rounded-2xl px-6 py-1.5 bg-typegreen text-white hover:bg-typegreen/85">
                    <span>Paid</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ArticleInfo;
