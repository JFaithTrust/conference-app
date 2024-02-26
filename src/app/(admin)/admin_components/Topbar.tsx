import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserInfo } from "@/fetch_api/fetchUsers";
import { UserType } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";

const Topbar = () => {
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("access_token");
      const role = window.localStorage.getItem("role");
      if (token && role) {
        getUserInfo().then((res) => setUser(res));
      }
    }
  }, []);
  return (
    <div className="flex flex-row justify-between items-center mt-[12px] mx-[23px] px-[18px] py-[9px] bg-mainwhite shadow-[0px_0px_4px_1px_#DCDBFA] rounded-xl mb-[48px]">
      <h2 className="font-medium">Name of Conference</h2>
      <div className="flex flex-row gap-4 items-center">
        <div className="flex flex-row items-center justify-center gap-[12px]">
          <Image
            className="relative overflow-hidden shrink-0 object-cover"
            alt=""
            src="/icons/flag.svg"
            width={20}
            height={16}
          />
          <span className="font-medium">Uzbek</span>
        </div>
        <div className="flex flex-row items-center justify-center py-[5px] px-[10px] rounded-md">
          <div className="flex flex-col text-xs font-medium w-24">
            <span>{user?.fullName}</span>
          </div>
          <FaRegCircleUser className="w-7 h-7 text-blue-500 stroke-[0.5]" />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
