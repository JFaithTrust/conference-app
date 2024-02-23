"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import CountdownTimer from "./CountdownTimer";
import { useEffect, useState } from "react";
import { ConferenceType } from "@/types";
import { getAllConferences } from "@/fetch_api/fetchConference";
import { formatDate } from "@/functions/formats";
import CarouselSkeleton from "./skeleton/CarouselSkeleton";

const Hero = () => {
  const [heroData, setHeroData] = useState<ConferenceType[]>([]);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getConferences = async () => {
      const res = await getAllConferences();
      setHeroData(res.slice(res.length - 3, res.length));
      setLoading(false)
    };
    getConferences();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen w-full"><CarouselSkeleton /></div>; // Render loading state
  }

  const additionData = [
    {
      urlImage: "/images/corousel1.svg",
      title: "Conference",
      color:
        "text-transparent bg-clip-text bg-gradient-to-r from-[#b32929] via-[#fa9746] to-[#a4b4ff] via-[#697fe2] to-[#24569f]",
      shadowColor: "shadow-[0px_0.5px_4px_#b32929]",
    },
    {
      urlImage: "/images/corousel2.svg",
      title: "Conference",
      color:
        "text-transparent bg-clip-text bg-gradient-to-r from-[#24569f] via-[#a4b4ff] to-[#eec4ea] via-[#d268cc] to-[#9e4d9a]",
      shadowColor: "shadow-[0px_0.5px_4px_#d268cc]",
    },
    {
      urlImage: "/images/corousel3.svg",
      title: "Conference",
      color:
        "text-transparent bg-clip-text bg-gradient-to-r from-[#92e3a9] via-[#dff7e7] via-[#d2dfff] to-[#697fe2]",
      shadowColor: "shadow-[0px_0.5px_4px_#92e3a9]",
    },
  ];

  // two object list merge
  const slides = heroData.map((item, index) => {
    return Object.assign({}, item, additionData[index]);
  });


  return (
    <div className="bg-herowhite">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="self-stretch h-[790px] w-full overflow-hidden shrink-0 flex flex-row items-center justify-center py-[129px] px-0 box-border text-4xl font-roboto">
              <div className="flex flex-col items-start justify-start gap-[50px]">
                <div className={`${slide.color} text-8xl font-righteous`}>
                  {slide.title}
                </div>
                <div className="relative leading-[120%] font-righteous text-gray-500 flex items-center w-[696px] h-[136px] shrink-0">
                  {slide.name}
                </div>
                <div className="overflow-hidden flex flex-col items-center justify-center py-3 px-1">
                  <div className="relative leading-[100%] font-medium">
                    {formatDate(slide.deadlineForThesis, false)}
                  </div>
                </div>
                <CountdownTimer
                  targetDate={slide.deadlineForThesis}
                  shadowColor={slide.shadowColor}
                />
              </div>
              <div className="flex flex-col items-start justify-start p-2.5 ml-[-50px]">
                <img
                  className="relative w-[650px] h-[433.3px] object-cover"
                  alt=""
                  src={slide.urlImage}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;