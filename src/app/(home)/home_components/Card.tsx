import { formatDate } from "@/functions/formats";
import { ConferenceType } from "@/types";
import React, { useEffect } from "react";
import CountDownConference from "./count-down-for-conference/CountDownConference";
import { FaLocationDot } from "react-icons/fa6";
import CustomButton from "@/components/ui/CustomButton";
import { useRouter } from "next/navigation";
import CardSkeleton from "./skeleton/CardSkeleton";

interface Props {
  item: ConferenceType;
  loading: boolean;
}

const Card = ({ item, loading }: Props) => {
  const router = useRouter();

  if (loading) {
    return (
      <div className="rounded-3xl [background:linear-gradient(151.61deg,_rgba(255,_255,_255,_0.6),_rgba(255,_255,_255,_0))] shadow-[-5px_-5px_250px_rgba(255,_255,_255,_0.05)_inset] [backdrop-filter:blur(66.2px)] box-border w-[325px] overflow-hidden shrink-0 flex flex-col items-start justify-center p-[18px] gap-[12px] border-[3px] border-solid border-mainindigo/70">
        <CardSkeleton />
      </div>
    );
  }

  return (
    <div className="rounded-3xl [background:linear-gradient(151.61deg,_rgba(255,_255,_255,_0.6),_rgba(255,_255,_255,_0))] shadow-[-5px_-5px_250px_rgba(255,_255,_255,_0.05)_inset] [backdrop-filter:blur(66.2px)] box-border w-[325px] overflow-hidden shrink-0 flex flex-col items-start justify-center p-[18px] gap-[12px] border-[3px] border-solid border-mainindigo/70">
      <div className="self-stretch flex flex-row items-center justify-between">
        <div className="rounded-lg overflow-hidden flex flex-col items-center justify-center py-2.5 px-1.5">
          <div className="relative leading-[100%]">
            {formatDate(item.deadlineForThesis, false)}
          </div>
        </div>
        <CountDownConference targetDate={item.deadlineForThesis} />
      </div>
      <div className="self-stretch flex flex-col items-start justify-center p-[5px] gap-[12px] text-center">
        <b className="self-stretch relative leading-[120%]">{item.name}</b>
        <div className="self-stretch relative text-sm leading-[120%] text-justify">
          {item.description}
        </div>
      </div>
      <div className="rounded-md flex flex-row items-center justify-start gap-[10px] text-justify text-sm text-mainindigo/95">
        <FaLocationDot className="w-5 h-[25px] object-cover text-typered" />
        <div className="leading-[120%]">
          <span>Manzil: </span>
          {item.address}
        </div>
      </div>
      <CustomButton
        label="To’liq ko’rish"
        onClick={() => router.push(`/conferences/${item.id}`)}
        success
        type={"button"}
        classNames="self-stretch rounded-xl shadow-[0px_0px_4px_2px_#dcdbfa] overflow-hidden flex flex-row items-center justify-center py-[9px] px-1.5 gap-[12px] text-mainwhite"
      />
    </div>
  );
};

export default Card;
