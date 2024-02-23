"use client";

import { TbArrowNarrowLeft } from "react-icons/tb";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/ui/CustomButton";
import { ApplicationType, ConferenceType, DirectionType } from "@/types";
import Loading from "@/app/(home)/home_components/loading/Loading";
import { getApplicationById } from "@/fetch_api/fetchApplications";
import { Button } from "@/components/ui/button";

const ConferenceDetail = ({ params }: { params: { id: number } }) => {
  const [application, setApplication] = useState<ApplicationType>()
  const [direction, setDirection] = useState<DirectionType[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    const getAllAplications = async () => {
      const application = await getApplicationById(params.id);
      setApplication(application);
      setLoading(false);
    };
    getAllAplications();
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
      {application && (
        <div className="flex flex-col p-[30px] gap-[48px] rounded-xl bg-mainwhite shadow-[0_0_4px_2px_#DCDBFA]">
          <div className="flex justify-end">
            <Button variant={'activeLink'}>
              {application.status}
            </Button>
          </div>
          <h1 className="text-justify text-4xl font-semibold leading-[100%] font-source-serif-pro">
            {application.name}
          </h1>
          <div className="flex flex-col p-3 gap-y-6 border-[1px] border-solid border-violet-200 rounded-md">
            <p>Konferensiya yo&apos;nalishlari</p>
            <div>
              <ul className="text-xl font-semibold list-disc ml-5">
                {direction.map((item) => (
                  <li key={item.id}>{item.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col p-3 gap-y-6 border-[1px] border-solid border-violet-200 rounded-md">
            <p>Konferensiya haqida ma&apos;lumot</p>
            <div className="flex flex-col gap-y-3">
              <p className="text-lg text-justify">{application.description}</p>
            </div>
          </div>
          <p className="text-xl font-semibold">Qabul qilingan maqolalar</p>
          <div className="flex flex-row border-[1px] border-solid border-violet-200 rounded-md justify-between p-[12px] items-center">
            <h2></h2>
            <h2>Name of Conference</h2>
            <h3>12.04.2023</h3>
            <CustomButton
              label="Yuklab olish"
              mainable
              classNames="rounded-3xl px-[18px] py-[6px]"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ConferenceDetail;
