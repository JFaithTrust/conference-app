"use client";

import {Swiper, SwiperSlide} from "swiper/react";

import "swiper/css";
import {FC} from "react";

import {Autoplay} from "swiper/modules";

interface Item {
    image: string;
    classNames: string;
}

interface IProps {
    items: Item[];
}

const Partners: FC<IProps> = ({items}) => {
    return (
        <>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                className="mySwiper"
            >
                {items.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="flex items-center justify-center relative w-[280px] h-[79px]">
                            <img src={item.image} alt="" className={item.classNames}/>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default Partners;
