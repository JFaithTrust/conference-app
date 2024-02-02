import React from "react";
import { FaRegCircleUser } from "react-icons/fa6";


const Topbar = () => {
  return (
    <div className="flex flex-row justify-between items-center mt-[12px] mx-[23px] px-[18px] py-[9px] bg-mainwhite shadow-[0px_0px_4px_1px_#DCDBFA] rounded-xl mb-[48px]">
      <h2 className="font-medium">Name of Conference</h2>
      <div className="flex flex-row gap-4 items-center">
        <div className="flex flex-row items-center justify-center gap-[12px]">
          <img
            className="relative w-5 h-4 overflow-hidden shrink-0 object-cover"
            alt=""
            src="/icons/flag.svg"
          />
          <span className="font-medium">Uzbek</span>
        </div>
        <div className="flex flex-row items-center gap-3">
          <div className="flex flex-col text-xs font-medium">
            <span>Solijoniy</span>
            <span>Jahongir</span>
          </div>
          <FaRegCircleUser className="w-7 h-7 text-blue-500 stroke-[0.5]" />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
