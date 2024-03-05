"use client";

import {
  changeReviewerToUser,
  changeUserStatus,
  getUserById,
} from "@/fetch_api/fetchUsers";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Loading from "@/app/(home)/home_components/loading/Loading";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

const ReviewerInfo = ({ params }: { params: { id: number } }) => {
  const [userData, setUserData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getUserData = async () => {
      const data = await getUserById(params.id);
      setUserData(data);
      setLoading(false);
    };
    getUserData();
  }, [params.id]);

  // change reviewer to user
  const handleChangeReviwerToUser = async (id: number) => {
    const data = await changeReviewerToUser(id);
    if (data.success) {
      toast({
        title: "Muharrir muvaffaqiyatli bo'shatildi",
        variant: "default",
      });
    } else {
      toast({
        title: data?.message,
        variant: "destructive",
        action: <ToastAction altText="Try again">Qayta urinish</ToastAction>,
      });
    }
    router.back();
  };

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
            {loading ? (
              <Loading />
            ) : (
              <>
                <h2 className="font-semibold font-source-serif-pro text-3xl">
                  Muharrir ma&apos;lumotlari
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
                    <Button
                      className={`py-3 px-12 ${
                        userData.userStatus === "INACTIVE"
                          ? "bg-typered hover:bg-typered/85"
                          : "bg-typegreen hover:bg-typegreen/85"
                      }`}
                    >
                      {userData.userStatus}
                    </Button>
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <span className="font-normal text-sm">
                      Muharrirni bo&apos;shatish
                    </span>
                    <Button
                      className={`py-3 px-12 bg-typered hover:bg-typered/85`}
                      onClick={() => handleChangeReviwerToUser(userData.id)}
                    >
                      Bo&apos;shatish
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewerInfo;
