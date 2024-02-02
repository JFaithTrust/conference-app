"use client";

import { getUserById } from "@/fetch_api/fetchUsers";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const UserInfo = ({ params }: { params: { id: number } }) => {
  const [userData, setUserData] = useState<any>({});
  const router = useRouter();

  useEffect(() => {
    const getUserData = async () => {
      const data = await getUserById(params.id);
      setUserData(data);
    };
    getUserData();
  }, [params.id]);

  return (
    <>
      {userData && (
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
              Foydalanuvchi ma&apos;lumotlari
            </h2>
            <div className="flex flex-col gap-y-2">
              <span className="text-sm">FISH : </span>
              <span>{userData.fullName}</span>
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="text-sm">Telefon Nomeri :</span>
              <span>{userData.phoneNumber}</span>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col gap-y-2">
                <span className="font-normal text-sm">Status</span>
                <Button className="py-3 px-12 bg-typegreen hover:bg-typegreen/85">
                  {userData.userStatus}
                </Button>
              </div>
              <div className="flex flex-col gap-y-2">
                <span className="font-normal text-sm">Foydalanuvchini bloklash</span>
                <Button className="py-3 px-12" variant={"destructive"}>
                  Block
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserInfo;
